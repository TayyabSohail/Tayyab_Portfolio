import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiPostgresql,
  SiStripe,
  SiPosthog,
  SiMongodb,
  SiExpress,
  SiNodedotjs,
  SiShadcnui,
  SiZod,
  SiResend,
  SiTurborepo,
  SiAmazon,
  SiGooglemaps,
  SiDirectus,
  SiSocketdotio,
  SiOpenai,
  SiFirebase,
  SiGithubactions,
  SiDocker,
  SiTwilio,
} from "react-icons/si";
import {
  FaDhl,
  FaServer,
  FaRobot,
  FaDatabase,
  FaFilePdf,
  FaMicrophone,
  FaEye,
  FaBolt,
} from "react-icons/fa";

interface TechMeta {
  icon: IconType;
  /** Brand colour, used at low opacity behind the icon. */
  color: string;
}

/**
 * Maps the `tech` strings used in data/projects.ts to a brand icon. Anything
 * not listed falls back to a generic server glyph, so adding a new tech string
 * never breaks a card.
 */
const TECH: Record<string, TechMeta> = {
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  React: { icon: SiReact, color: "#61DAFB" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  TailwindCSS: { icon: SiTailwindcss, color: "#38BDF8" },
  ShadCN: { icon: SiShadcnui, color: "#FFFFFF" },
  TanStack: { icon: SiReact, color: "#FF4154" },
  Supabase: { icon: SiSupabase, color: "#3ECF8E" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  Express: { icon: SiExpress, color: "#FFFFFF" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  Zod: { icon: SiZod, color: "#3E67B1" },
  Stripe: { icon: SiStripe, color: "#635BFF" },
  "Stripe Connect": { icon: SiStripe, color: "#635BFF" },
  PostHog: { icon: SiPosthog, color: "#F54E00" },
  Resend: { icon: SiResend, color: "#FFFFFF" },
  Twilio: { icon: SiTwilio, color: "#F22F46" },
  "pdf-lib": { icon: FaFilePdf, color: "#F40F02" },
  Turbopack: { icon: SiTurborepo, color: "#EF4444" },
  "Trigger.dev": { icon: FaServer, color: "#A78BFA" },
  OpenRouter: { icon: SiOpenai, color: "#10A37F" },
  DataForSEO: { icon: FaDatabase, color: "#60A5FA" },
  "Google Maps API": { icon: SiGooglemaps, color: "#EA4335" },
  "AWS EC2": { icon: SiAmazon, color: "#FF9900" },
  "AWS Lambda": { icon: SiAmazon, color: "#FF9900" },
  "DHL API": { icon: FaDhl, color: "#FFCC00" },
  Directus: { icon: SiDirectus, color: "#6644FF" },
  WebSockets: { icon: SiSocketdotio, color: "#FFFFFF" },
  Pinecone: { icon: FaDatabase, color: "#60A5FA" },
  RAG: { icon: FaRobot, color: "#10A37F" },
  LLM: { icon: FaRobot, color: "#10A37F" },
  "Generative AI": { icon: FaRobot, color: "#10A37F" },
  "Computer Vision": { icon: FaRobot, color: "#10A37F" },
  // Capability labels used on the homepage, which are broader than a single
  // product name.
  AWS: { icon: SiAmazon, color: "#FF9900" },
  Firebase: { icon: SiFirebase, color: "#FFCA28" },
  "AI / RAG": { icon: FaRobot, color: "#10A37F" },
  "Vector DBs": { icon: FaDatabase, color: "#60A5FA" },
  "TTS / STT": { icon: FaMicrophone, color: "#A78BFA" },
  Vision: { icon: FaEye, color: "#34D399" },
  "CI/CD": { icon: SiGithubactions, color: "#2088FF" },
  pg_cron: { icon: SiPostgresql, color: "#4169E1" },
  Monitoring: { icon: SiPosthog, color: "#F54E00" },
  LLMs: { icon: FaRobot, color: "#10A37F" },
  "Vector Databases": { icon: FaDatabase, color: "#60A5FA" },
  "TTS/STT": { icon: FaMicrophone, color: "#A78BFA" },
  Automation: { icon: FaBolt, color: "#FBBF24" },
  "Vector Search": { icon: FaDatabase, color: "#60A5FA" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  "next-safe-action": { icon: SiNextdotjs, color: "#FFFFFF" },
};

const FALLBACK: TechMeta = { icon: FaServer, color: "#A3A3A3" };

export function getTechMeta(label: string): TechMeta {
  return TECH[label] ?? FALLBACK;
}
