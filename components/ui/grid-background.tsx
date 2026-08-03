import type { CSSProperties } from "react";

const traces = [
  { d: "M-40 118H205V76H390V188H625", delay: "-1s", duration: "11s" },
  { d: "M-40 274H148V222H338V342H625", delay: "-7s", duration: "15s" },
  { d: "M-40 520H240V468H430V414H625", delay: "-4s", duration: "13s" },
  { d: "M-40 748H180V676H405V550H625", delay: "-10s", duration: "17s" },
  { d: "M1640 142H1390V94H1210V210H975", delay: "-5s", duration: "14s" },
  { d: "M1640 322H1460V260H1260V354H975", delay: "-11s", duration: "16s" },
  { d: "M1640 558H1360V492H1180V438H975", delay: "-3s", duration: "12s" },
  { d: "M1640 762H1430V694H1215V566H975", delay: "-9s", duration: "18s" },
  { d: "M720 -40V115H674V315", delay: "-2s", duration: "13s" },
  { d: "M880 -40V130H926V315", delay: "-8s", duration: "16s" },
  { d: "M720 940V745H674V495", delay: "-6s", duration: "15s" },
  { d: "M880 940V730H926V495", delay: "-12s", duration: "17s" },
];

const dataStreams = [
  { x: "6%", height: "18vh", delay: "-3s", duration: "13s", opacity: 0.52 },
  { x: "14%", height: "10vh", delay: "-9s", duration: "18s", opacity: 0.34 },
  { x: "24%", height: "15vh", delay: "-15s", duration: "21s", opacity: 0.28 },
  { x: "36%", height: "8vh", delay: "-6s", duration: "17s", opacity: 0.2 },
  { x: "64%", height: "9vh", delay: "-12s", duration: "20s", opacity: 0.2 },
  { x: "76%", height: "16vh", delay: "-4s", duration: "16s", opacity: 0.3 },
  { x: "86%", height: "11vh", delay: "-17s", duration: "22s", opacity: 0.36 },
  { x: "94%", height: "20vh", delay: "-8s", duration: "15s", opacity: 0.48 },
];

const agentLinks = [
  "M500 374H594L650 405",
  "M500 490H594L650 450",
  "M1100 374H1006L950 405",
  "M1100 490H1006L950 450",
  "M500 374V490",
  "M1100 374V490",
];

const agentNodes = [
  { x: 500, y: 374, label: "VECTOR" },
  { x: 500, y: 490, label: "RERANK" },
  { x: 1100, y: 374, label: "TOOLS" },
  { x: 1100, y: 490, label: "MEMORY" },
];

const codeModules = [
  {
    label: "agent.router.ts",
    status: "RUN",
    lines: [
      "const route = async (ctx) => {",
      "  return agent.invoke(ctx);",
      "};",
    ],
    className: "left-[3%] top-[13%] hidden md:block",
    delay: "-3s",
    duration: "48s",
  },
  {
    label: "pipeline.py",
    status: "SYNC",
    lines: [
      "async def deploy(build):",
      "  await verify(build)",
      "  return ship(build)",
    ],
    className: "right-[3%] top-[19%] hidden lg:block",
    delay: "-14s",
    duration: "56s",
  },
  {
    label: "ai.pipeline.log",
    status: "RUN",
    lines: [
      "[OK]  index vectors / context",
      "[RUN] model reasoning / plan",
      "[LIVE] tool execution / response",
    ],
    className:
      "ai-mobile-console left-1/2 top-[42%] w-[min(252px,calc(100vw-2rem))] -translate-x-1/2 lg:hidden",
    delay: "-9s",
    duration: "42s",
  },
];

const compilerLines = [
  "$ pnpm build --filter portfolio",
  "info  compiling route graph...",
  "info  bundling /case-studies/[slug]",
  "emit  server chunk 18.4 kB",
  "cache hit  component registry",
  "done  static generation complete",
  "✓ build passed in 1.24s",
];

/** A precise animated circuit schematic that sits behind every page. */
export function GridBackground() {
  const horizontalPins = Array.from({ length: 7 }, (_, index) => 342 + index * 22);
  const verticalPins = Array.from({ length: 11 }, (_, index) => 650 + index * 30);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-[#020605]"
    >
      {/* Slow ambient layers give the schematic a little depth between the
          precise circuit strokes without becoming a conventional gradient. */}
      <div className="signal-orb -left-40 top-[14%]" />
      <div className="signal-orb -right-44 bottom-[8%] [animation-delay:-12s]" />
      {/* Low-energy data packets fall on staggered rails behind the schematic. */}
      <div className="data-stream-layer">
        {dataStreams.map((stream) => (
          <span
            key={stream.x}
            className="data-stream"
            style={
              {
                "--stream-x": stream.x,
                "--stream-height": stream.height,
                "--stream-delay": stream.delay,
                "--stream-duration": stream.duration,
                "--stream-opacity": stream.opacity,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base paths and small moving current segments share exact geometry. */}
        {traces.map((trace, index) => (
          <g key={trace.d}>
            <path className="chip-trace" d={trace.d} />
            {index % 3 === 0 && (
              <path
                className="chip-current"
                d={trace.d}
                pathLength="100"
                style={{
                  animationDelay: trace.delay,
                  animationDuration: `${Number.parseInt(trace.duration) * 2}s`,
                }}
              />
            )}
            <rect
              className="chip-junction"
              x={index < 4 ? 204 + index * 12 : index < 8 ? 1378 - index * 8 : 670 + (index % 2) * 252}
              y={index < 8 ? 112 + (index % 4) * 174 : index < 10 ? 126 : 726}
              width="3"
              height="3"
            />
          </g>
        ))}

        {/* Central processor outline and its narrow pins. */}
        <g className="chip-core circuit-pulse">
          <path d="M650 315H950V495H650V315Z" />
          <path d="M664 329H936V481H664V329Z" />
          <path d="M690 358H910V452H690V358Z" strokeDasharray="2 7" />

          {horizontalPins.map((y) => (
            <g key={y}>
              <path d={`M625 ${y}H650`} />
              <path d={`M950 ${y}H975`} />
            </g>
          ))}
          {verticalPins.map((x) => (
            <g key={x}>
              <path d={`M${x} 290V315`} />
              <path d={`M${x} 495V520`} />
            </g>
          ))}

          <text x="682" y="383" className="chip-core-label">
            CORE // 08
          </text>
          <text x="682" y="421" className="chip-core-status">
            SYSTEM.ACTIVE
          </text>
          <path className="chip-core-meter" d="M682 438H842" pathLength="100" />
        </g>

        {/* Agent graph: retrieval, tools and memory route into the model core. */}
        <g>
          {agentLinks.map((path, index) => (
            <g key={path}>
              <path className="agent-link" d={path} />
              {index < 4 && <path className="agent-link-active" d={path} pathLength="100" style={{ animationDelay: `${-index * 1.6}s` }} />}
            </g>
          ))}
          {agentNodes.map((node, index) => (
            <g key={node.label} style={{ animationDelay: `${-index * 0.8}s` }}>
              <circle className="agent-node" cx={node.x} cy={node.y} r="4" />
              <text className="agent-label" x={node.x + (node.x < 800 ? -48 : 12)} y={node.y - 11}>{node.label}</text>
            </g>
          ))}
          <text className="agent-label" x="720" y="302">AGENT.ORCHESTRATOR</text>
        </g>

        {/* Sparse technical calibration marks, not a repeated grid. */}
        <g className="chip-calibration">
          <path d="M48 48H128M48 48V128" />
          <path d="M1552 48H1472M1552 48V128" />
          <path d="M48 852H128M48 852V772" />
          <path d="M1552 852H1472M1552 852V772" />
          <path d="M790 34H810M800 24V44" />
          <path d="M790 866H810M800 856V876" />
        </g>
      </svg>

      {/* Actual code panels move independently above the circuit layer. */}
      <div className="absolute inset-0 font-mono">
        {codeModules.map((module) => (
          <div
            key={module.label}
            className={`code-module ${module.className}`}
            style={{
              animationDelay: module.delay,
              animationDuration: module.duration,
            }}
          >
            <div className="code-module-head">
              <span>[ {module.label} ]</span>
              <span>{module.status}</span>
            </div>
            <pre>
              {module.lines.map((line, index) => (
                <span key={line}>
                  <span className="code-line-number">0{index + 1}</span>
                  {line}
                </span>
              ))}
            </pre>
          </div>
        ))}

        <div className="compiler-module bottom-[12%] left-[6%] hidden md:block xl:left-[7%]">
          <div className="compiler-module-header"><span>BUILD.PIPELINE</span><span>ACTIVE</span></div>
          <div className="compiler-feed">
            <div className="compiler-feed-track">
              {[...compilerLines, ...compilerLines].map((line, index) => (
                <span key={`${line}-${index}`} className={`compiler-line ${line.startsWith("✓") ? "compiler-line--success" : ""}`}>
                  {line}{index === compilerLines.length - 1 && <span className="compiler-cursor" />}
                </span>
              ))}
            </div>
          </div>
        </div>

        <span className="telemetry-label left-[22%] top-[8%]">0x7A // ONLINE</span>
        <span className="telemetry-label right-[24%] top-[11%]">LATENCY 024ms</span>
        <span className="telemetry-label left-[28%] bottom-[8%]">BUILD v2.7.1</span>
        <span className="telemetry-label right-[27%] bottom-[12%]">PACKETS 001101</span>
      </div>

      {/* Quiet center mask preserves the hero's contrast without a soft glow. */}
      <div className="chip-center-mask absolute inset-0 bg-[radial-gradient(ellipse_42%_55%_at_50%_44%,rgba(2,6,5,0.9),transparent_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,5,0.05),rgba(2,6,5,0.25)_70%,#020605_100%)]" />
      <div className="chip-vignette absolute inset-0" />
    </div>
  );
}
