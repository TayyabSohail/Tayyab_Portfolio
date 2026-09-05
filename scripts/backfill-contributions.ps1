param(
    [int]$TargetCommitCount = 3500,
    [datetime]$EndDate = (Get-Date).Date.AddDays(-1)
)

$ErrorActionPreference = 'Stop'
$gitEmail = (git config user.email).Trim()
$gitName = (git config user.name).Trim()

if ([string]::IsNullOrWhiteSpace($gitEmail) -or [string]::IsNullOrWhiteSpace($gitName)) {
    throw 'Configure git user.name and user.email before running this script.'
}

# Use the preceding 365 full days. The activity pattern intentionally leaves
# genuine gaps: most weekends have none, selected weekdays range from light
# work to occasional bursts, and there are quiet weekdays as well.
$startDate = $EndDate.AddDays(-364)
$alreadyCreated = (git log HEAD --format=%s | Where-Object { $_ -like 'chore: activity *' }).Count
$CommitCount = [math]::Max(0, $TargetCommitCount - $alreadyCreated)

if ($CommitCount -eq 0) {
    Write-Host "The target of $TargetCommitCount activity commits has already been reached."
    exit 0
}

$counts = @{}
git log HEAD --format=%ad --date=short | ForEach-Object {
    $key = $_.Trim()
    if ($key -and $key -ge $startDate.ToString('yyyy-MM-dd') -and $key -le $EndDate.ToString('yyyy-MM-dd')) {
        if ($counts.ContainsKey($key)) { $counts[$key]++ } else { $counts[$key] = 1 }
    }
}

$days = for ($day = $startDate; $day -le $EndDate; $day = $day.AddDays(1)) {
    $key = $day.ToString('yyyy-MM-dd')
    [pscustomobject]@{
        Date = $day
        Key = $key
        Existing = if ($counts.ContainsKey($key)) { $counts[$key] } else { 0 }
        Added = 0
        RawWeight = 0
        Fraction = 0
        TieBreaker = 0
    }
}

# A fixed seed makes the varied distribution repeatable.
$random = [System.Random]::new(20260831)
$activeDays = foreach ($day in $days) {
    $isWeekend = $day.Date.DayOfWeek -in @([DayOfWeek]::Saturday, [DayOfWeek]::Sunday)
    # Generated activity is limited to weekdays; existing project history is
    # left untouched.
    $activityChance = if ($isWeekend) { 0.0 } else { 0.78 }

    if ($random.NextDouble() -lt $activityChance) {
        $raw = $random.Next(2, 9)
        if ($random.NextDouble() -lt 0.55) { $raw += $random.Next(3, 13) }
        if (-not $isWeekend -and $random.NextDouble() -lt 0.25) { $raw += $random.Next(7, 22) }
        if (-not $isWeekend -and $random.NextDouble() -lt 0.06) { $raw += $random.Next(15, 33) }
        if ($isWeekend) { $raw = [math]::Max(1, [math]::Floor($raw * 0.45)) }

        $day.RawWeight = $raw
        $day.TieBreaker = $random.Next()
        $day
    }
}

$rawTotal = ($activeDays | Measure-Object RawWeight -Sum).Sum
$assigned = 0
foreach ($day in $activeDays) {
    $scaled = ($day.RawWeight * $CommitCount) / $rawTotal
    $day.Added = [math]::Floor($scaled)
    $day.Fraction = $scaled - $day.Added
    $assigned += $day.Added
}

$remaining = $CommitCount - $assigned
foreach ($day in $activeDays | Sort-Object @{ Expression = { $_.Fraction }; Descending = $true }, TieBreaker | Select-Object -First $remaining) {
    $day.Added++
}

$offset = [TimeSpan]::FromHours(5)
$scheduled = foreach ($day in $days | Where-Object Added -gt 0 | Sort-Object Date) {
    for ($number = 1; $number -le $day.Added; $number++) {
        # Spread each day's commits between 09:00 and 21:00 local time.
        $minuteOfDay = 540 + [math]::Floor((720 * $number) / ($day.Added + 1)) + $random.Next(-14, 15)
        $timestamp = [DateTimeOffset]::new($day.Date.Year, $day.Date.Month, $day.Date.Day, 0, 0, 0, $offset).AddMinutes($minuteOfDay)
        [pscustomobject]@{ Date = $day.Date; Number = $number; Timestamp = $timestamp.ToString('yyyy-MM-ddTHH:mm:sszzz') }
    }
}

Write-Host "Creating $($scheduled.Count) backdated commits from $($startDate.ToString('yyyy-MM-dd')) through $($EndDate.ToString('yyyy-MM-dd'))."
$baseCommit = (git rev-parse HEAD).Trim()
$stream = [System.Text.StringBuilder]::new()
$utf8 = [System.Text.Encoding]::UTF8
$mark = 1

foreach ($commit in $scheduled) {
    $message = "chore: activity $($commit.Date.ToString('yyyy-MM-dd')) ($($commit.Number))"
    $date = [DateTimeOffset]::Parse($commit.Timestamp)
    $fastImportDate = "$($date.ToUnixTimeSeconds()) +0500"
    [void]$stream.Append("commit refs/heads/main`n")
    [void]$stream.Append("mark :$mark`n")
    [void]$stream.Append("author $gitName <$gitEmail> $fastImportDate`n")
    [void]$stream.Append("committer $gitName <$gitEmail> $fastImportDate`n")
    [void]$stream.Append("data $($utf8.GetByteCount($message))`n$message`n")
    [void]$stream.Append("from $(if ($mark -eq 1) { $baseCommit } else { ":$($mark - 1)" })`n")
    $mark++
}

$processInfo = [System.Diagnostics.ProcessStartInfo]::new()
$processInfo.FileName = 'git'
$processInfo.Arguments = 'fast-import --quiet'
$processInfo.UseShellExecute = $false
$processInfo.RedirectStandardInput = $true
$processInfo.RedirectStandardError = $true
$process = [System.Diagnostics.Process]::new()
$process.StartInfo = $processInfo
[void]$process.Start()
$process.StandardInput.Write($stream.ToString())
$process.StandardInput.Close()
$errorOutput = $process.StandardError.ReadToEnd()
$process.WaitForExit()
if ($process.ExitCode -ne 0) { throw "Git fast-import failed: $errorOutput" }

Write-Host 'Done. Push the current branch to publish these contributions.'
