import { getProjectBySlug, type ProjectPreview } from "@/data/projects";
import { HeadlineCarousel } from "@/components/ui/headline-carousel";

/** One headline result, shown with the product it came from. */
export interface HeadlineOutcome {
  value: string;
  label: string;
  description: string;
  project: ProjectPreview;
}

/**
 * The outcomes in carousel order. Each names a case study by slug; the title
 * and device screens come from the project data, so a renamed or recaptured
 * product updates here on its own.
 */
const CLIENT_OUTCOMES = [
  {
    value: "3×",
    label: "lower cost per article",
    slug: "rankloom",
    description:
      "The same content budget now produces three times more output, helping SEO teams expand coverage without increasing spend.",
  },
  {
    value: "1,000+",
    label: "concurrent users",
    slug: "bidnest",
    description:
      "Peak campus demand can be handled without lost bids or conflicting states, protecting trust when marketplace activity is highest.",
  },
  {
    value: "70%",
    label: "fewer support tickets",
    slug: "curio-market",
    description:
      "Seven out of every ten support issues were removed, lowering service workload while giving customers a smoother checkout and delivery experience.",
  },
  {
    value: "30 days",
    label: "from brief to shipped MVP",
    slug: "bitsmiths-studio",
    description:
      "The business reached market in one month, shortening the wait for customer feedback, qualified leads, and revenue opportunities.",
  },
  {
    value: "40%",
    label: "faster performance",
    slug: "new-web-order",
    description:
      "Visitors reach the content and call to action sooner, reducing avoidable drop-off and giving each campaign a better chance to convert.",
  },
  {
    value: "90%+",
    label: "assessment accuracy",
    slug: "ai-physiotherapy",
    description:
      "Movement and form assessment is reliable enough for clinicians to trust between supervised sessions, so patients get dependable correction while training on their own.",
  },
  {
    value: "60%",
    label: "faster deployment",
    slug: "snobbots",
    description:
      "New customer environments go live in less than half the previous time, allowing resellers to onboard more clients with the same team.",
  },
  {
    value: "30+",
    label: "agencies on one platform",
    slug: "real-estate-management-system",
    description:
      "More than 30 agencies share one secure platform, reducing separate infrastructure and maintenance work without mixing client data.",
  },
  {
    value: "50%",
    label: "shorter audit turnaround",
    slug: "qa-compliance-agent",
    description:
      "Review teams recover roughly half a week per audit, increasing delivery capacity without needing to double the review team.",
  },
  {
    value: "30+",
    label: "interviews completed",
    slug: "ai-interview-assistant",
    description:
      "Recruiters can run consistent interviews with automatic transcripts and follow-ups, reducing coordination work across every candidate.",
  },
];

/**
 * Server half of the section: looks each outcome's project up once and hands
 * the client carousel only the fields the device mockup needs.
 */
export function HeadlineSection() {
  const outcomes: HeadlineOutcome[] = CLIENT_OUTCOMES.flatMap(
    ({ slug, ...outcome }) => {
      const project = getProjectBySlug(slug);
      if (!project) return [];
      const { title, platform, screens, accent } = project;
      return [{ ...outcome, project: { slug, title, platform, screens, accent } }];
    },
  );

  return <HeadlineCarousel outcomes={outcomes} />;
}
