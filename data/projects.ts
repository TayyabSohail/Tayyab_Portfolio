/**
 * Single source of truth for every project on the site.
 *
 * To add a case study: append a `Project` object to the `projects` array below
 * and drop its cover image into `/public/images/`. The `/projects` grid, each
 * `/projects/[slug]` case study page, the sitemap and the homepage featured grid
 * all read from here — nothing else needs touching.
 */

export type ProjectCategory =
  | "SaaS"
  | "Marketplace"
  | "AI"
  | "Website"
  | "Internal Tool";

export interface DesignNote {
  /** Short heading, e.g. "Colour" or "Typography". */
  title: string;
  /** One or two sentences on the decision and why it was made. */
  body: string;
}

/**
 * One row of the "Tech Stack" grid: a category, and the tools used for it.
 * Icons are resolved from the tool names via lib/tech-icons.
 */
export interface TechGroup {
  /** e.g. "Backend", "Database", "Deployment & Build Tools". */
  category: string;
  /** Tool names, resolved to brand icons where known. */
  tools: string[];
}

export interface Project {
  slug: string;
  title: string;
  /** Very short label shown under the title on cards, e.g. "AI-driven SEO platform". */
  tagline: string;
  /** One line, shown under the title in the hero and used for SEO descriptions. */
  summary: string;
  /** A paragraph of context, shown in the Overview section. */
  description: string;
  coverImage: string;
  /** Intrinsic size of `coverImage`. */
  coverWidth: number;
  coverHeight: number;
  /**
   * How the cover sits in its 4:3 frame:
   *
   * - `"cover"` — crops to fill. Only safe when the image is already ~4:3,
   *   otherwise edges get cut off.
   * - `"contain"` (default) — fits the whole image, nothing cropped. Use for
   *   any screenshot whose ratio differs from the frame.
   * - `"mark"` — a small logo or wordmark, centred with heavy padding on a
   *   patterned plate.
   */
  coverFit?: "cover" | "contain" | "mark";
  /** Flat list, used for filtering and quick scanning. */
  tech: string[];
  /** Grouped stack, rendered as the "Tech Stack" grid on the case study. */
  techStack: TechGroup[];
  category: ProjectCategory;
  /** Kept for reference; deliberately not surfaced in the UI. */
  role?: string;
  /** Kept for reference; deliberately not surfaced in the UI. */
  timeline?: string;
  liveUrl?: string;
  githubUrl?: string;
  /** Featured projects surface on the homepage grid. */
  featured?: boolean;
  /** The problem the project set out to solve. */
  problem: string;
  /** How it was approached. */
  approach: string;
  /** What shipping it achieved — one bullet per outcome. */
  outcomes: string[];
  /** Kept for reference; the Design decisions section was removed. */
  design?: DesignNote[];
  /** Architecture / how it is built. */
  architecture: string;
  keyFeatures: string[];
  challenges: { challenge: string; solution: string }[];
  /** Shown instead of a live link when the product cannot be shared publicly. */
  liveUnavailableReason?: string;
}

export const projects: Project[] = [
  {
    slug: "seomaven",
    title: "SEOMaven",
    tagline: "AI-driven platform for smarter SEO growth",
    summary: "AI-powered SEO and content platform.",
    description:
      "One platform for keyword research, AI content generation and rank tracking, replacing the tool-hopping that ate SEO teams' days.",
    coverImage: "/images/maven.png",
    coverWidth: 4096,
    coverHeight: 3072,
    coverFit: "cover",
    tech: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "ShadCN",
      "Supabase",
      "PostgreSQL",
      "Trigger.dev",
      "OpenRouter",
      "DataForSEO",
      "Google Maps API",
      "Stripe",
      "PostHog",
      "AWS EC2",
      "AWS Lambda",
    ],
    techStack: [
      { category: "Frontend", tools: ["Next.js", "TypeScript"] },
      { category: "Styling", tools: ["TailwindCSS", "ShadCN"] },
      {
        category: "Backend",
        tools: ["Supabase", "PostgreSQL", "Trigger.dev"],
      },
      {
        category: "APIs & AI",
        tools: ["OpenRouter", "DataForSEO", "Google Maps API"],
      },
      { category: "Payments", tools: ["Stripe"] },
      { category: "Deployment", tools: ["AWS EC2", "AWS Lambda"] },
      { category: "Analytics", tools: ["PostHog"] },
    ],
    category: "SaaS",
    role: "Full Stack Developer",
    timeline: "2024 — 2025",
    liveUrl: "https://seomaven.ai",
    featured: true,
    problem:
      "SEO teams switched between five different tools just to get from keyword discovery to tracking, wasting hours and risking inconsistent data. Most tools also lean on stale keyword and ranking data, so teams react slowly to search trends.",
    approach:
      "One platform: an AI content engine on OpenRouter wired to live DataForSEO and Google Maps data, with Trigger.dev running bulk jobs and caching in the background.",
    outcomes: [
      "3× lower cost per article through automated AI workflows.",
      "30 articles in 10 minutes, work that previously took hours.",
      "$0.09 per keyword tracked, down from $0.18.",
    ],
    design: [
      {
        title: "Research & Planning",
        body: "Analysed existing SEO workflows and competitor tools to find the pain points, then designed one system covering research, creation and tracking.",
      },
      {
        title: "Scalable Architecture",
        body: "Next.js 15, Supabase and Trigger.dev, built to handle large-scale keyword processing, bulk generation and scheduled rank tracking without bottlenecks.",
      },
      {
        title: "Optimised UX",
        body: "A responsive UI on ShadCN and Tailwind, with a rich text editor, customisable templates and SEO tools to suit different kinds of user.",
      },
    ],
    architecture:
      "Next.js App Router with server components for data-heavy views, Supabase and PostgreSQL for storage, and Trigger.dev for durable background jobs. Generation is proxied through OpenRouter so models swap without touching product code.",
    keyFeatures: [
      "AI content generation with multi-locale support",
      "Real-time keyword and rank tracking",
      "Location-based insights via Google Maps API",
      "Bulk processing pipelines with caching",
      "Stripe-backed subscription billing",
    ],
    challenges: [
      {
        challenge:
          "Keyword API costs scaled linearly with users and quickly became the largest line item.",
        solution:
          "Introduced request batching and a caching layer keyed by keyword and locale, cutting tracking spend in half without reducing data freshness.",
      },
      {
        challenge:
          "Bulk content jobs exceeded serverless execution limits and failed midway.",
        solution:
          "Moved generation onto Trigger.dev as durable, resumable jobs that checkpoint progress and retry individual items rather than the whole batch.",
      },
    ],
  },

  {
    slug: "unibid",
    title: "UniBid",
    tagline: "Off-campus home rentals, on your terms",
    summary: "Bidding-based off-campus rentals marketplace.",
    description:
      "Students bid on off-campus housing in real time, with role-scoped dashboards for students, parents and landlords.",
    coverImage: "/images/unibid.png",
    coverWidth: 4096,
    coverHeight: 3072,
    coverFit: "cover",
    tech: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "ShadCN",
      "Supabase",
      "PostgreSQL",
      "WebSockets",
      "Stripe",
      "Resend",
      "Twilio",
      "PostHog",
    ],
    techStack: [
      { category: "Frontend", tools: ["Next.js", "TypeScript"] },
      { category: "Styling", tools: ["TailwindCSS", "ShadCN"] },
      { category: "Backend", tools: ["Supabase", "PostgreSQL"] },
      { category: "Real-time", tools: ["WebSockets"] },
      { category: "Payments", tools: ["Stripe"] },
      { category: "Notifications", tools: ["Resend", "Twilio"] },
      { category: "Analytics", tools: ["PostHog"] },
    ],
    category: "Marketplace",
    role: "Full Stack Developer",
    timeline: "2024",
    liveUrl: "https://unibid.ai",
    featured: true,
    problem:
      "Student housing is dominated by fixed-price listings with no room to negotiate, scattered across unreliable platforms. Parents fund most of these rentals but have no way into the process at all.",
    approach:
      "Designed a live bidding system over WebSockets with sub-200ms updates, backed by data models tuned for listings, bids and notifications, and separate dashboards scoped to each role.",
    outcomes: [
      "1,000+ concurrent users with conflict-free bid synchronisation.",
      "200ms bid updates, keeping every bidder on the same state.",
      "3 role-scoped dashboards for students, parents and landlords.",
    ],
    design: [
      {
        title: "Scalable Backend",
        body: "A backend built to carry real-time bidding, multi-user messaging and service booking at once, without performance bottlenecks under campus traffic.",
      },
      {
        title: "Multi-Channel Notifications",
        body: "In-app, email and SMS, so a student never misses a bid update or landlord message because they happened to be off the site.",
      },
      {
        title: "Parent Access",
        body: "Parents usually fund the rental but are locked out of these platforms. Guardians get their own login to bid, message landlords and manage payments.",
      },
    ],
    architecture:
      "Next.js over Supabase and PostgreSQL. Bids flow through a WebSocket channel and are validated server-side before commit, so a client can never post a winning bid it didn't earn. Role access is enforced by row-level security.",
    keyFeatures: [
      "Bidding marketplace for verified off-campus rentals",
      "Parent access to bid and message on a student's behalf",
      "Service booking for moving, cleaning and repairs",
      "Built-in messaging between students, landlords and providers",
      "In-app, email and SMS notifications",
      "Listings filtered by proximity to partner schools",
    ],
    challenges: [
      {
        challenge:
          "Simultaneous bids on the same listing raced each other and could both be accepted.",
        solution:
          "Moved bid acceptance into a serialised server-side transaction so ordering is decided authoritatively, with clients reconciling to the committed result.",
      },
      {
        challenge:
          "Broadcasting every bid to every connected client saturated the socket layer at peak.",
        solution:
          "Scoped subscriptions per listing so clients only receive updates for what they are watching.",
      },
    ],
  },

  {
    slug: "anina",
    title: "Anina",
    tagline: "An ecommerce personalized marketplace",
    summary: "Personalised multi-seller ecommerce marketplace.",
    description:
      "A multi-seller marketplace with personalised recommendations, Stripe Connect payouts and automated DHL tracking.",
    coverImage: "/images/anina.png",
    coverWidth: 4096,
    coverHeight: 3072,
    coverFit: "cover",
    tech: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Supabase",
      "Stripe Connect",
      "DHL API",
      "PostHog",
    ],
    techStack: [
      { category: "Frontend", tools: ["Next.js", "TypeScript"] },
      { category: "Styling", tools: ["TailwindCSS"] },
      { category: "Backend", tools: ["Supabase"] },
      { category: "Payments", tools: ["Stripe Connect"] },
      { category: "Logistics", tools: ["DHL API"] },
      { category: "Analytics", tools: ["PostHog"] },
    ],
    category: "Marketplace",
    role: "Full Stack Developer",
    timeline: "2024 — 2025",
    liveUrl: "https://anina.app/",
    featured: true,
    problem:
      "Most ecommerce shows a generic feed, burying shoppers in options that don't match their style. Sellers get basic tools with no view of orders or payouts, and manual payment handling plus opaque delivery erodes trust at checkout.",
    approach:
      "Built a server-rendered recommendation engine over a multi-tenant Supabase architecture with strict data isolation, then automated the money and logistics paths end to end with Stripe Connect and the DHL API.",
    outcomes: [
      "40% increase in engagement from personalised recommendations.",
      "70% fewer support tickets after automating checkout and shipping flows.",
    ],
    design: [
      {
        title: "Personalised Experience",
        body: "A personality-based recommendation system that tailors the shopping journey per user, instead of the generic feed that overwhelms shoppers elsewhere.",
      },
      {
        title: "Seller Control",
        body: "Small sellers usually get basic tools and no visibility. This gives them one dashboard for products, orders, payouts and performance in real time.",
      },
      {
        title: "Trusted Checkout",
        body: "Stripe for payments and automated payouts, DHL for tracking. Manual handling and unverified gateways are what cost these platforms conversions.",
      },
    ],
    architecture:
      "Next.js App Router, server-rendering the recommendation surfaces. Supabase provides multi-tenant storage with row-level security per seller. Stripe Connect handles split payments and payouts; DHL webhooks drive tracking.",
    keyFeatures: [
      "Personality test driving product recommendations",
      "Multi-seller marketplace in one shopping experience",
      "Seller dashboard for products, orders and payouts",
      "Stripe payments with automated seller payouts",
      "DHL integration for automated delivery tracking",
    ],
    challenges: [
      {
        challenge:
          "Multi-tenancy risked one seller's queries reaching another seller's data.",
        solution:
          "Enforced isolation with row-level security policies at the database rather than in application code, so a missed check in the app cannot leak data.",
      },
      {
        challenge:
          "Manual payout and shipping enquiries dominated the support queue.",
        solution:
          "Automated both paths, using Stripe Connect for scheduled payouts and DHL webhooks for tracking, then surfaced status directly in the order view.",
      },
    ],
  },

  {
    slug: "vestafi",
    title: "Vestafi",
    tagline: "Fractional property ownership for East Africa",
    summary:
      "A members' club where Ugandans co-own income-producing apartments from 1,000,000 UGX.",
    description:
      "Property is sold in one indivisible lump, and that lump costs more than most people will ever have in the bank at once. Vestafi breaks the lump. Vetted members pool capital to co-own real, income-producing apartments in Uganda, earn their proportional share of monthly rent, and sell their stake to other members when they want out.",
    coverImage: "/images/vestafi.webp",
    coverWidth: 1920,
    coverHeight: 800,
    // 2.40:1 — far wider than the 4:3 frame, so fit rather than crop.
    coverFit: "contain",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "TanStack",
      "TailwindCSS",
      "ShadCN",
      "Supabase",
      "PostgreSQL",
      "Zod",
      "Resend",
      "pdf-lib",
      "PostHog",
      "Turbopack",
    ],
    techStack: [
      {
        category: "Frontend",
        tools: ["Next.js", "React", "TypeScript", "TanStack"],
      },
      { category: "Styling", tools: ["TailwindCSS", "ShadCN"] },
      { category: "Backend", tools: ["Supabase", "PostgreSQL", "Zod"] },
      { category: "Messaging & Documents", tools: ["Resend", "pdf-lib"] },
      { category: "Analytics", tools: ["PostHog"] },
      { category: "Build Tools", tools: ["Turbopack"] },
    ],
    category: "Marketplace",
    role: "Full Stack Developer",
    timeline: "May 2025 — Jul 2026",
    liveUrl: "https://www.vestafi.co/",
    featured: true,
    problem:
      "Most people in East Africa will never own an apartment, not for lack of savings, but because property sells in one indivisible lump. Capital is locked up for years, rental income means becoming a landlord, and there is no transparency on what a building actually earns.",
    approach:
      "A two-sided members' club: a vetted application and onboarding funnel, a wallet every shilling passes through, three ways to own, and an internal resale market for exits. Every financial decision routes through a real admin.",
    outcomes: [
      "42 screens across member, admin and public surfaces.",
      "84 business operations over 25 tables, built by 7 contributors.",
      "3 ownership products: Fractional, Live and Prime.",
    ],
    design: [
      {
        title: "Trust first",
        body: "Nobody's money moves without a human seeing it. Every deposit, withdrawal, membership payment and investment crosses an admin's desk with a document attached.",
      },
      {
        title: "Dials, not welds",
        body: "Fees, minimums, reward amounts and feature switches are admin settings, so the team changes the platform's economics with no software release.",
      },
      {
        title: "Never round in our favour",
        body: "Rent shares and resale fees always round down to the shilling, and ownership percentage is recalculated from actual amounts every time it is shown.",
      },
    ],
    architecture:
      "Next.js and React with TanStack and typed server actions, over Supabase and PostgreSQL with Zod at the boundaries. Roughly 72,600 lines across 416 files and 211 reusable components. Wallet balances are enforced to always equal deposits minus investments minus withdrawals, and UGX is handled as whole shillings throughout, never floats.",
    keyFeatures: [
      "Apartment marketplace with search, filters and sorting",
      "Vault wallet for deposits, deployments and withdrawals",
      "Monthly rent distribution, split by exact stake",
      "Exit-window resale market with a 1.5% platform fee",
      "Admin approval desk for every money movement",
      "Broadcast composer with 6 audience segments",
      "Referrals, 4 member ranks and 35 automated emails",
    ],
    challenges: [
      {
        challenge:
          "Ownership had to stay exact across primary purchases, monthly rent splits and secondary trades, with no member ever short-changed by rounding.",
        solution:
          "Percentages are derived from actual amounts on every read rather than stored, and every split rounds down to the whole shilling so the platform never rounds in its own favour.",
      },
      {
        challenge:
          "A wallet holding real money can never drift, and no member could be allowed to see or reach an admin screen.",
        solution:
          "The ledger invariant, where balance equals deposits minus investments minus withdrawals, is enforced rather than assumed. The member and admin worlds are strictly separated in the product.",
      },
      {
        challenge:
          "Membership fees, minimums and resale fees needed to change with the business, not with the release cycle.",
        solution:
          "Every rule became an operational setting behind an admin panel, so the team adjusts the platform's economics instantly.",
      },
    ],
  },

  {
    slug: "bitsmiths-studio",
    title: "Bitsmiths Studio",
    tagline: "Agency marketing site and CMS",
    summary: "Marketing site for a studio that ships MVPs in 30 days.",
    description:
      "The studio's marketing site, built on a CMS so case studies, articles and testimonials publish without a deploy.",
    coverImage: "/images/bitsmiths_Web.png",
    coverWidth: 970,
    coverHeight: 894,
    // Nearly square — cropping to 4:3 cut off the top and bottom.
    coverFit: "contain",
    tech: ["Next.js", "TypeScript", "React", "TailwindCSS", "Directus"],
    techStack: [
      { category: "Frontend", tools: ["Next.js", "React", "TypeScript"] },
      { category: "Styling", tools: ["TailwindCSS"] },
      { category: "CMS", tools: ["Directus"] },
    ],
    category: "Website",
    role: "Full Stack Developer",
    timeline: "2025",
    liveUrl: "https://bitsmiths.studio/",
    featured: true,
    problem:
      "The studio pitches production-ready MVPs in 30 days to founders comparing it against agencies charging many times more. That claim needs visible proof, and the team needed to publish it without a developer in the loop.",
    approach:
      "Next.js over a Directus CMS, so every content surface is editable. The page is ordered as an argument: promise, proof, objections, one call to action.",
    outcomes: [
      "30 days from brief to shipped MVP, the promise the site sells.",
      "4 content types publishable with no code change.",
      "1 call to action, after promise, proof and objections.",
    ],
    design: [
      {
        title: "Content is data",
        body: "Case studies, posts, testimonials and FAQs are CMS collections rendered through shared templates, so publishing never waits on a developer.",
      },
      {
        title: "Ordered as an argument",
        body: "Promise, then proof, then objection handling, then one call to action rather than several competing ones.",
      },
      {
        title: "Fast by default",
        body: "Media is served as WebP through request-time transforms, so a marketing site full of screenshots still loads quickly.",
      },
    ],
    architecture:
      "Next.js App Router over a Directus headless CMS. Case studies, posts, testimonials and FAQs are CMS collections rendered through shared templates, with media served as WebP via request-time transforms.",
    keyFeatures: [
      "CMS-driven case studies with a shared detail template",
      "Engineering blog",
      "Client testimonials carousel",
      "Pricing and process FAQ",
      "Per-page SEO and OpenGraph metadata",
    ],
    challenges: [
      {
        challenge:
          "Marketing copy, case studies and articles needed to change frequently without a developer in the loop.",
        solution:
          "Modelled every content surface in Directus and rendered it through shared templates, so publishing is a CMS action rather than a deploy.",
      },
      {
        challenge:
          "Case-study imagery is heavy and would otherwise dominate page weight on a marketing site where first impression speed matters.",
        solution:
          "Served all media through Directus with WebP transforms applied per request, so pages ship modern formats without a manual export step.",
      },
    ],
  },

  {
    slug: "new-web-order",
    title: "New Web Order",
    tagline: "Company website built for speed and SEO",
    summary: "Company website built for performance and SEO.",
    description:
      "A company site rebuilt on Next.js for speed and search. 40% faster, and finally ranking.",
    coverImage: "/images/nwo.png",
    coverWidth: 255,
    coverHeight: 232,
    // A small logo mark, not a screenshot.
    coverFit: "mark",
    tech: ["Next.js", "TypeScript", "TailwindCSS"],
    techStack: [
      { category: "Frontend", tools: ["Next.js", "TypeScript"] },
      { category: "Styling", tools: ["TailwindCSS"] },
    ],
    category: "Website",
    role: "Frontend Developer",
    timeline: "2024",
    liveUrl: "https://www.newweborder.us/",
    problem:
      "The existing site loaded slowly and ranked poorly, costing the company inbound leads before visitors ever saw the offering.",
    approach:
      "Rebuilt the site on Next.js with TypeScript for type safety and Tailwind for styling, then worked through the performance budget: code splitting, image optimisation and tuned rendering strategies per route.",
    outcomes: [
      "40% faster through targeted performance work.",
      "3-step type scale holding hierarchy from mobile to desktop.",
    ],
    design: [
      {
        title: "Static where possible",
        body: "Routes are pre-rendered wherever content allows, so most pages ship as HTML with no server work on the request path.",
      },
      {
        title: "Ship less JavaScript",
        body: "Code split per route, so a visitor landing on one page never downloads the bundle for the rest of the site.",
      },
      {
        title: "No layout shift",
        body: "Every image goes through next/image with explicit dimensions, so space is reserved before the file arrives.",
      },
    ],
    architecture:
      "Static-first Next.js App Router build. Routes are pre-rendered where content allows, images are served through next/image with explicit dimensions, and JavaScript is code-split per route to keep the initial payload small.",
    keyFeatures: [
      "Static-first rendering for fast first paint",
      "Route-level code splitting",
      "Optimised, layout-shift-free imagery",
      "SEO metadata across all routes",
      "Fully responsive layout",
    ],
    challenges: [
      {
        challenge:
          "Large marketing imagery dominated the page weight and delayed first paint.",
        solution:
          "Moved all imagery to next/image with explicit dimensions and modern formats, prioritising only the above-the-fold hero.",
      },
    ],
  },

  {
    slug: "bitsmiths-hrm",
    title: "Bitsmiths HRM",
    tagline: "Internal HR and payroll system",
    summary:
      "Onboarding, leave, medical claims, overtime and payroll for Bitsmiths Studio.",
    description:
      "Bitsmiths' internal HR platform. Employees are invited, onboarded and activated; they file leave, medical claims and overtime; admins approve each one, and approved items sweep into a monthly payroll run that calculates payslips, locks them, and exports to Payoneer.",
    coverImage: "/images/HRM.png",
    coverWidth: 861,
    coverHeight: 935,
    // Portrait, taller than any card frame, so fit rather than crop.
    coverFit: "contain",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "TailwindCSS",
      "Supabase",
      "PostgreSQL",
      "Zod",
      "TanStack",
      "Resend",
      "pg_cron",
    ],
    techStack: [
      { category: "Frontend", tools: ["Next.js", "React", "TypeScript"] },
      { category: "Styling", tools: ["TailwindCSS"] },
      {
        category: "Backend",
        tools: ["Supabase", "PostgreSQL", "Zod"],
      },
      { category: "Data Fetching", tools: ["TanStack"] },
      { category: "Email", tools: ["Resend"] },
      { category: "Scheduling", tools: ["pg_cron"] },
    ],
    category: "Internal Tool",
    role: "Full Stack Developer",
    timeline: "2026",
    liveUrl: "https://hrm.bitsmiths.studio/",
    problem:
      "People operations were scattered across email, chat and paper: onboarding by email, leave and overtime in messages, medical claims on paper, and payroll assembled by hand each month from all of it. Nothing reconciled, and nothing was auditable.",
    approach:
      "One system where every request is a row with a status. Employees submit; admins approve; approved leave, medical and overtime then sweep into a monthly payroll run that computes payslips and locks them.",
    outcomes: [
      "5 workflows in one tool: onboarding, leave, medical, overtime, payroll.",
      "4 enforcement layers guarding admin and employee access.",
      "12 automated emails replacing manual status chasing.",
    ],
    design: [
      {
        title: "Two roles, strictly split",
        body: "Admin and employee, enforced at four layers: route middleware, server actions, row-level security, and column guards. Admin access fails closed rather than open.",
      },
      {
        title: "Nothing self-approves",
        body: "Insert policies pin new leave, medical and overtime records to 'pending', so a member can never write their own approval.",
      },
      {
        title: "Derive, don't store",
        body: "Leave and medical balances are computed on every read from approved records and current settings, so a policy change applies everywhere at once.",
      },
    ],
    architecture:
      "Next.js 15 App Router with next-safe-action server actions over Supabase, using Postgres, Auth, Storage and pg_cron. Business logic lives in the database: leave and medical balances, payroll calculation and locking are Postgres functions, guarded by row-level security. Roles mirror into the JWT via trigger so middleware can route on them. Resend sends 12 React Email templates, and a monthly cron job opens each payroll period.",
    keyFeatures: [
      "Employee dashboard with live balances and latest payslip",
      "Leave, medical and overtime requests with approval trails",
      "Admin approvals queue across every request type",
      "Monthly payroll runs, locked once finalised",
      "Payslips, released to employees only after lock",
      "Payoneer export and a policies document store",
    ],
    challenges: [
      {
        challenge:
          "Employees could not see their own locked payslips. The visibility policy subqueried an admin-only table, and that subquery runs with the caller's privileges, so it silently returned nothing.",
        solution:
          "Moved the check into a SECURITY DEFINER helper that answers only 'is this run locked?', so the policy resolves without exposing the company-wide payroll totals on that table.",
      },
      {
        challenge:
          "Approved medical and overtime could be double-counted, paid once in the run that swept them and again in the next.",
        solution:
          "Locking a run stamps each approved item with that run's id in the same transaction, so every item feeds exactly one payroll and late approvals roll forward instead of duplicating.",
      },
      {
        challenge:
          "Admin overrides on a payslip, such as days worked, overtime multiplier and custom adjustments, were wiped whenever payroll was recalculated.",
        solution:
          "Made calculation idempotent: it upserts derived figures while preserving admin-entered overrides, so a recalc can be run safely at any point before the period locks.",
      },
    ],
  },

  {
    slug: "ai-physiotherapy",
    title: "AI-Driven Physiotherapy",
    tagline: "Live posture correction powered by AI",
    summary: "AI platform for live posture correction.",
    description:
      "Computer vision corrects a patient's posture live, mid-exercise, with a RAG chatbot grounded in the clinic's own guidance.",
    coverImage: "/images/AI-powered physiotherapy assistance logo.png",
    coverWidth: 1024,
    coverHeight: 1024,
    // Square artwork with text — cropping to 4:3 cut the title off.
    coverFit: "contain",
    tech: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Computer Vision",
      "Generative AI",
      "RAG",
    ],
    techStack: [
      { category: "Frontend", tools: ["Next.js", "TypeScript"] },
      { category: "Styling", tools: ["TailwindCSS"] },
      {
        category: "AI & Vision",
        tools: ["Computer Vision", "Generative AI", "RAG"],
      },
    ],
    category: "AI",
    role: "Full Stack Developer",
    timeline: "2024",
    liveUnavailableReason:
      "Not publicly available due to confidentiality around patient data.",
    problem:
      "Patients performing physiotherapy exercises at home had no way to know whether their form was correct, so mistakes went uncorrected between supervised sessions and slowed recovery.",
    approach:
      "Combined computer vision with generative AI to assess posture live and return corrective feedback during the exercise, alongside a RAG chatbot grounded in the clinic's own exercise guidance for follow-up questions.",
    outcomes: [
      "95% accuracy in real-time posture assessment.",
      "1 correction at a time, so guidance stays actionable mid-exercise.",
    ],
    design: [
      {
        title: "One correction at a time",
        body: "A list of simultaneous faults is unusable while holding a position, so feedback surfaces the single most important fix.",
      },
      {
        title: "Latency is the feature",
        body: "Pose is evaluated on-device and the model only phrases the correction, keeping feedback inside the window where it is still actionable.",
      },
      {
        title: "Grounded, not improvised",
        body: "The chatbot answers from the clinic's own approved exercise corpus, because a general model gives plausible but clinically unsafe advice.",
      },
    ],
    architecture:
      "Next.js drives the live camera session. Pose is evaluated against target positions on-device, then passed to a generative model for corrective phrasing. The chatbot retrieves from an indexed clinical corpus before answering.",
    keyFeatures: [
      "Real-time posture assessment from camera input",
      "Corrective feedback during the exercise",
      "RAG-powered patient support chatbot",
      "Exercise guidance and recovery tracking",
      "Low-latency interactive sessions",
    ],
    challenges: [
      {
        challenge:
          "Round-tripping every frame for evaluation introduced latency that made feedback useless mid-movement.",
        solution:
          "Evaluated pose on-device and reserved model calls for phrasing the correction, keeping the feedback loop inside the window where it is still actionable.",
      },
      {
        challenge:
          "A general-purpose model gave plausible but clinically unsafe advice.",
        solution:
          "Grounded the chatbot in the clinic's own approved exercise corpus via RAG, so answers stay within vetted guidance.",
      },
    ],
  },

  {
    slug: "snobbots",
    title: "SnobBots",
    tagline: "Multi-tenant AI support agents for shops",
    summary: "Multi-tenant AI chatbot platform.",
    description:
      "Resellers provision AI support agents for their shops in bulk, with each tenant isolated and each answer grounded in that shop's own content.",
    coverImage: "/images/Futuristic SNOBBOTS AI network design.png",
    coverWidth: 1024,
    coverHeight: 1024,
    // Square artwork — fitted so nothing is cropped.
    coverFit: "contain",
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Pinecone",
      "RAG",
      "LLM",
    ],
    techStack: [
      { category: "Frontend", tools: ["React"] },
      { category: "Backend", tools: ["Node.js", "Express"] },
      { category: "Database", tools: ["MongoDB", "Pinecone"] },
      { category: "AI", tools: ["RAG", "LLM"] },
    ],
    category: "AI",
    role: "Full Stack Developer",
    timeline: "2023 — 2024",
    liveUnavailableReason:
      "Not publicly available. The product is sold through resellers rather than direct signup.",
    problem:
      "Resellers wanted to offer AI support agents to their own customers, but every deployment was bespoke, so onboarding a new shop took days of manual setup.",
    approach:
      "Built a multi-tenant MERN architecture where each shop runs an independent, context-aware agent, and layered automated provisioning on top so resellers could stand up bots in bulk rather than one at a time.",
    outcomes: [
      "60% faster deployment through automated orchestration.",
      "1 namespace per tenant, so no shop can read another's content.",
    ],
    design: [
      {
        title: "Tenants never leak",
        body: "Each shop's embeddings live in their own namespace, so retrieval can only ever reach the requesting shop's knowledge base.",
      },
      {
        title: "Bulk is the default",
        body: "Resellers provision many bots at once, so the dashboard is built around bulk actions rather than configuring one shop at a time.",
      },
      {
        title: "Light on the host page",
        body: "The widget inherits the host's font stack and ships a neutral themeable shell, so it adds no webfont download to the customer's site.",
      },
    ],
    architecture:
      "MERN: React, an Express and Node.js API, and MongoDB for tenant and conversation data. Pinecone holds per-tenant embeddings so retrieval is scoped to one shop's knowledge base, and provisioning runs without manual setup.",
    keyFeatures: [
      "Multi-tenant architecture with isolated agents",
      "RAG for context-aware, business-specific answers",
      "Automated bulk bot provisioning",
      "Reseller management dashboard",
      "Embeddable support widget",
    ],
    challenges: [
      {
        challenge:
          "Retrieval across a shared vector index surfaced one shop's content in another shop's answers.",
        solution:
          "Partitioned embeddings per tenant in Pinecone so retrieval can only ever reach the requesting shop's namespace.",
      },
      {
        challenge:
          "Manual per-shop setup made reseller onboarding the bottleneck on growth.",
        solution:
          "Automated provisioning end to end, turning a multi-day manual process into a bulk operation.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

/** All categories present in the data, for the filter chips. */
export function getCategories(): ProjectCategory[] {
  return [...new Set(projects.map((project) => project.category))];
}

/**
 * Previous and next project relative to `slug`, wrapping at the ends so
 * navigation is never a dead end.
 */
export function getAdjacentProjects(slug: string): {
  previous: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: projects[(index - 1 + projects.length) % projects.length] ?? null,
    next: projects[(index + 1) % projects.length] ?? null,
  };
}
