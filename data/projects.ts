/**
 * Single source of truth for every case study on the site.
 *
 * To add one: append a `Project` to `projects` and drop its screens into
 * `/public/work/screens/`. The homepage grid, each /case-studies/[slug] page
 * and the sitemap all read from here.
 */

/** What the product is. Shown as context; also drives the /work filter. */
export type ProjectCategory =
  | 'SaaS'
  | 'Marketplace'
  | 'AI'
  | 'Mobile'
  | 'Website';

export const CATEGORY_ORDER: ProjectCategory[] = [
  'SaaS',
  'Marketplace',
  'AI',
  'Mobile',
  'Website',
];

/** What kind of engineering the work was. */
export type ProjectCapability =
  | 'Full-Stack'
  | 'AI'
  | 'Cloud & Automation'
  | 'Web'
  | 'Mobile';

export const CAPABILITY_ORDER: ProjectCapability[] = [
  'Full-Stack',
  'AI',
  'Cloud & Automation',
  'Web',
  'Mobile',
];

/**
 * The program principle a build demonstrates most clearly. Each case study
 * leads with one; see `docs/brand/positioning-and-program.md`.
 */
export type EfficiencyLens =
  | 'right-tool'
  | 'lean-context'
  | 'no-repeat'
  | 'checked';

export const LENS_ORDER: EfficiencyLens[] = [
  'right-tool',
  'lean-context',
  'no-repeat',
  'checked',
];

/** Label and principle for each lens, shown on the case study. */
export const LENSES: Record<
  EfficiencyLens,
  { label: string; principle: string }
> = {
  'right-tool': {
    label: 'Right tool for the task',
    principle:
      'Rules and ordinary software before AI. A model only where it earns its place.',
  },
  'lean-context': {
    label: 'Only the needed context',
    principle:
      'Each request, user or agent gets the data it needs and nothing more.',
  },
  'no-repeat': {
    label: 'Nothing done twice',
    principle:
      'Caching, batching and reuse instead of regenerating the same work.',
  },
  checked: {
    label: 'Checked before trusted',
    principle:
      'Output is grounded, traceable or approved by a person where the risk requires it.',
  },
};

/** How the build avoids unnecessary computation, rework or manual effort. */
export interface ProjectEfficiency {
  lens: EfficiencyLens;
  /** One claim, taken from facts already in the case study. */
  title: string;
  /** The mechanism behind the claim. */
  body: string;
  /** Three short techniques, shown as a list. */
  techniques: string[];
}

/** Whether the product is shown on a laptop with a phone, or on phones only. */
export type ProjectPlatform = 'web' | 'app';

/**
 * Real captures of the product at device resolution, stored in
 * `/public/work/screens/`. Desktop is a 16:10 capture (2160x1350), mobile a
 * 390x844 phone capture at 2x. Regenerate with `scripts/capture-screens.mjs`.
 */
export interface ProjectScreens {
  desktop: string;
  /** Phone capture. Omitted when only a desktop capture exists. */
  mobile?: string;
  /** Second phone screen, shown behind the first on app projects. */
  mobileAlt?: string;
}

/**
 * One more screen of the product for the case-study gallery, captured the
 * same way as `ProjectScreens`. App projects only have the phone capture.
 */
export interface ProjectGalleryScreen {
  /** Short name of the screen, e.g. "Vault". */
  title: string;
  /** One sentence on what the screen does. */
  caption: string;
  desktop?: string;
  mobile: string;
}

/** One headline figure in the results section of a case study. */
export interface ProjectResult {
  /** The figure, e.g. "70%", "200 ms", "1,000+". */
  value: string;
  /** What the figure measures, a few words that read on from the value. */
  label: string;
  /** One sentence on what changed for the client behind that figure. */
  detail: string;
}

export interface TechGroup {
  category: string;
  tools: string[];
}

export interface Project {
  slug: string;
  title: string;
  /** Client or product owner, shown on cards. */
  client: string;
  /** Under the title on cards: what the product is, and how it is optimized. */
  tagline: string;
  /** For the case-study hero and SEO: what it is, then the optimization. */
  summary: string;
  /** Paragraph of context for the case-study lede. */
  description: string;
  /** Social share image; usually the desktop screen. */
  coverImage: string;
  coverWidth: number;
  coverHeight: number;
  platform: ProjectPlatform;
  screens: ProjectScreens;
  /** Further screens shown on the case-study page, in this order. */
  gallery: ProjectGalleryScreen[];
  /** Dominant colour used for glows and the plate tint behind the devices. */
  accent: string;
  /** Flat list, used for chips and quick scanning. */
  tech: string[];
  /** Grouped stack, rendered on the case study. */
  techStack: TechGroup[];
  category: ProjectCategory;
  capabilities: ProjectCapability[];
  industry: string;
  year: string;
  /**
   * Product name changed and live link withheld at the client's request.
   * Screens are recreations of the product, not captures of it.
   */
  anonymised?: boolean;
  /** Public URL of the product, when one can be shown. */
  liveUrl?: string;
  githubUrl?: string;
  /** Position in the homepage showcase and the /work grid, lowest first. */
  featured?: number;
  /** The efficiency lens the case study leads with. */
  efficiency?: ProjectEfficiency;
  /**
   * Smaller builds, apps and side projects. Kept out of the main showcase on
   * the homepage and /work; each still gets a full case-study page.
   */
  notable?: boolean;
  /** Headline metric for cards and the homepage showcase. */
  headline: { value: string; label: string };
  problem: string;
  approach: string;
  /** One paragraph on what changed for the client after launch. Opens the results section. */
  resultsSummary?: string;
  /**
   * Where the project genuinely helped people understand or use technology
   * more thoughtfully. Set only when a client has said so; never implied.
   */
  learning?: string;
  /** Headline figures for the results section, three per project. */
  results: ProjectResult[];
  architecture: string;
  keyFeatures: string[];
  challenges: { challenge: string; solution: string }[];
}

/**
 * The fields the device mockups need. Lets client components show a product
 * on devices without carrying the whole case study across the boundary.
 */
export type ProjectPreview = Pick<
  Project,
  'slug' | 'title' | 'platform' | 'screens' | 'accent'
>;

export const projects: Project[] = [
  {
    slug: 'brickfold',
    featured: 6,
    efficiency: {
      lens: 'checked',
      title:
        'Exact rules move the money, and a person approves every movement.',
      body:
        'Nothing here is estimated. Ownership percentages are derived from actual amounts on every read, every split rounds down to the whole shilling, and the wallet invariant is enforced rather than assumed. Each deposit, investment, rent credit and withdrawal passes an admin before it settles, and platform rules are settings, so changing them needs no release.',
      techniques: [
        'Deterministic ledger rules, no estimates',
        'Human approval on every money movement',
        'Rules changed as settings, not releases',
      ],
    },
    title: 'Brickfold',
    client: 'Confidential (property members club)',
    tagline:
      'Fractional property ownership for East Africa, on a ledger that never estimates',
    summary:
      'A members club where Ugandans co-own income-producing apartments from 1,000,000 UGX. Every shilling moves by exact rules, and a person approves each movement.',
    description:
      'Property is sold in one indivisible lump, and that lump costs more than most people will ever have in the bank at once. Brickfold breaks the lump. Vetted members pool capital to co-own real, income-producing apartments in Uganda, earn their proportional share of monthly rent, and sell their stake to other members when they want out.',
    coverImage: '/work/screens/brickfold-desktop.webp',
    coverWidth: 2160,
    coverHeight: 1350,
    platform: 'web',
    screens: {
      desktop: '/work/screens/brickfold-desktop.webp',
      mobile: '/work/screens/brickfold-mobile.webp',
    },
    gallery: [
      {
        title: 'Apartment marketplace',
        caption:
          'Units open for ownership with funding progress, yield and the minimum stake.',
        desktop: '/work/screens/brickfold-listings-desktop.webp',
        mobile: '/work/screens/brickfold-listings-mobile.webp',
      },
      {
        title: 'Vault',
        caption:
          'Every deposit, investment, rent credit and withdrawal in one exact ledger.',
        desktop: '/work/screens/brickfold-vault-desktop.webp',
        mobile: '/work/screens/brickfold-vault-mobile.webp',
      },
      {
        title: 'Approval desk',
        caption:
          'Admins approve every money movement and change platform rules without a release.',
        desktop: '/work/screens/brickfold-admin-desktop.webp',
        mobile: '/work/screens/brickfold-admin-mobile.webp',
      },
    ],
    accent: '#22c55e',
    tech: [
      'Next.js',
      'TypeScript',
      'React',
      'TanStack',
      'TailwindCSS',
      'ShadCN',
      'Supabase',
      'PostgreSQL',
      'Zod',
      'Resend',
      'pdf-lib',
      'PostHog',
    ],
    techStack: [
      {
        category: 'Frontend',
        tools: ['Next.js', 'React', 'TypeScript', 'TanStack'],
      },
      { category: 'Styling', tools: ['TailwindCSS', 'ShadCN'] },
      { category: 'Backend', tools: ['Supabase', 'PostgreSQL', 'Zod'] },
      { category: 'Messaging & Documents', tools: ['Resend', 'pdf-lib'] },
      { category: 'Analytics', tools: ['PostHog'] },
    ],
    category: 'Marketplace',
    capabilities: ['Full-Stack', 'Cloud & Automation'],
    industry: 'Fintech / Real estate',
    year: '2025-2026',
    anonymised: true,
    headline: { value: '1M UGX', label: 'to start owning property' },
    problem:
      'Most people in East Africa will never own an apartment, not for lack of savings, but because property sells in one indivisible lump. Capital is locked up for years, rental income means becoming a landlord, and nobody outside the owner can see what a building actually earns. What needed to change was the unit of ownership: small enough for an ordinary saver, exact enough to be trusted with other people’s money.',
    approach:
      'We designed and built the members club end to end: a vetted application and onboarding funnel, a wallet every shilling passes through, three ways to own a share of an apartment, monthly rent distribution split by exact stake, and an internal resale market for exits. Every money movement routes through a real admin, and the platform’s fees and minimums are settings the team changes without a release.',
    resultsSummary:
      'Brickfold launched as a working members club, not a waitlist. A member can apply, fund a wallet, buy into an apartment from 1,000,000 UGX, collect their share of the rent and sell their stake to another member when they want out. For the team, every balance reconciles to the ledger and every decision has a name on it, which is what makes it possible to hold other people’s money with a clear conscience.',
    learning:
      'Before any of it was built, each ledger rule was explained in plain language and agreed with the founder: why percentages are derived rather than stored, why every split rounds down, why a person approves each movement. The team runs the platform knowing why it behaves the way it does, not just how.',
    results: [
      {
        value: '1M UGX',
        label: 'minimum stake to co-own an apartment',
        detail:
          'Property that only ever sold as one indivisible lump now opens at a price an ordinary saver can reach.',
      },
      {
        value: '3',
        label: 'ownership products on one ledger',
        detail:
          'Fractional, Live and Prime share the same wallet, rent distribution and secondary market, so a member learns one system, not three.',
      },
      {
        value: '100%',
        label: 'of money movements approved by a person',
        detail:
          'Every deposit, investment, rent credit and withdrawal passes the admin desk before it settles. Nothing moves because software decided it should.',
      },
    ],
    architecture:
      'Next.js and React with TanStack and typed server actions, over Supabase and PostgreSQL with Zod at the boundaries. Roughly 72,600 lines across 416 files and 211 reusable components. Wallet balances are enforced to always equal deposits minus investments minus withdrawals, and UGX is handled as whole shillings throughout, never floats.',
    keyFeatures: [
      'Apartment marketplace with search, filters and sorting',
      'Vault wallet for deposits, deployments and withdrawals',
      'Monthly rent distribution, split by exact stake',
      'Exit-window resale market with a 1.5% platform fee',
      'Admin approval desk for every money movement',
      'Broadcast composer with 6 audience segments',
      'Referrals, 4 member ranks and 35 automated emails',
    ],
    challenges: [
      {
        challenge:
          'Ownership had to stay exact across primary purchases, monthly rent splits and secondary trades, with no member ever short-changed by rounding.',
        solution:
          'Percentages are derived from actual amounts on every read rather than stored, and every split rounds down to the whole shilling so the platform never rounds in its own favour.',
      },
      {
        challenge:
          'A wallet holding real money can never drift, and no member could be allowed to see or reach an admin screen.',
        solution:
          'The ledger invariant, where balance equals deposits minus investments minus withdrawals, is enforced rather than assumed. The member and admin worlds are strictly separated in the product.',
      },
      {
        challenge:
          'Membership fees, minimums and resale fees needed to change with the business, not with the release cycle.',
        solution:
          'Every rule became an operational setting behind an admin panel, so the team adjusts the platform economics instantly.',
      },
    ],
  },

  {
    slug: 'rankloom',
    featured: 1,
    efficiency: {
      lens: 'no-repeat',
      title: 'Batching and caching cut keyword tracking spend in half.',
      body:
        'Requests are batched and cached by keyword and locale, so the same data is never bought twice. Bulk generation runs as resumable jobs that retry a single failed item instead of the whole batch, and generation is routed through OpenRouter, so a model can be swapped without touching product code.',
      techniques: [
        'Cache keyed by keyword and locale',
        'Retry one item, not the batch',
        'Models swapped behind one router',
      ],
    },
    title: 'Rankloom',
    client: 'Confidential (SEO platform)',
    tagline: 'AI SEO and content platform that never buys the same data twice',
    summary:
      'An AI-powered SEO and content platform. Batching and caching cut keyword tracking spend in half.',
    description:
      'One platform for keyword research, AI content generation and rank tracking, replacing the tool-hopping that ate up SEO teams’ days.',
    coverImage: '/work/screens/rankloom-desktop.webp',
    coverWidth: 2160,
    coverHeight: 1350,
    platform: 'web',
    screens: {
      desktop: '/work/screens/rankloom-desktop.webp',
      mobile: '/work/screens/rankloom-mobile.webp',
    },
    gallery: [
      {
        title: 'Keyword research',
        caption:
          'Live volume, difficulty and intent, with local insights from Google Maps.',
        desktop: '/work/screens/rankloom-keywords-desktop.webp',
        mobile: '/work/screens/rankloom-keywords-mobile.webp',
      },
      {
        title: 'Content assistant',
        caption:
          'Batch article generation as a resumable job, with an SEO score per draft.',
        desktop: '/work/screens/rankloom-editor-desktop.webp',
        mobile: '/work/screens/rankloom-editor-mobile.webp',
      },
      {
        title: 'Rank tracking',
        caption:
          'Daily positions, movers and the background jobs that refresh them.',
        desktop: '/work/screens/rankloom-tracking-desktop.webp',
        mobile: '/work/screens/rankloom-tracking-mobile.webp',
      },
    ],
    accent: '#8b5cf6',
    tech: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'ShadCN',
      'Supabase',
      'PostgreSQL',
      'Trigger.dev',
      'OpenRouter',
      'DataForSEO',
      'Google Maps API',
      'Stripe',
      'PostHog',
      'AWS EC2',
      'AWS Lambda',
    ],
    techStack: [
      { category: 'Frontend', tools: ['Next.js', 'TypeScript'] },
      { category: 'Styling', tools: ['TailwindCSS', 'ShadCN'] },
      { category: 'Backend', tools: ['Supabase', 'PostgreSQL', 'Trigger.dev'] },
      {
        category: 'APIs & AI',
        tools: ['OpenRouter', 'DataForSEO', 'Google Maps API'],
      },
      { category: 'Payments', tools: ['Stripe'] },
      { category: 'Deployment', tools: ['AWS EC2', 'AWS Lambda'] },
      { category: 'Analytics', tools: ['PostHog'] },
    ],
    category: 'SaaS',
    capabilities: ['AI', 'Cloud & Automation', 'Full-Stack'],
    industry: 'Marketing technology',
    year: '2024-2025',
    anonymised: true,
    headline: { value: '3x', label: 'lower cost per article' },
    problem:
      'SEO teams switched between five tools to get from keyword discovery to rank tracking, losing hours a day and ending up with numbers that did not agree. Most of those tools also ran on stale data, so teams reacted late to what search was actually doing. The work needed to collapse into one place, run on live data, and cost less than the tools it replaced.',
    approach:
      'We built one platform: keyword research and rank tracking on live DataForSEO and Google Maps data, an AI content engine routed through OpenRouter so models can be swapped without touching product code, and Trigger.dev running bulk generation as resumable background jobs. Requests are batched and cached by keyword and locale, so the same data is never bought twice.',
    resultsSummary:
      'Rankloom replaced five separate tools with one. Keyword research, drafting and rank tracking run as workflows the team reviews rather than operates, drafts arrive with an SEO score attached, and the largest cost line in the business, keyword data, fell by half without the data getting any older.',
    learning:
      'The product team now sees what a tracked keyword and a generated article actually cost. The conversations about which requests would be expensive later happened before anything was built, not after.',
    results: [
      {
        value: '3x',
        label: 'lower cost per article',
        detail:
          'Drafting, optimisation and publishing run as one workflow instead of a chain of tools and hand-offs, so an article costs a third of what it did.',
      },
      {
        value: '30',
        label: 'articles generated in 10 minutes',
        detail:
          'A batch that used to take the content team hours is now a resumable background job, with an SEO score on each draft so the editor knows where to start.',
      },
      {
        value: '50%',
        label: 'lower keyword tracking spend',
        detail:
          'From $0.18 to $0.09 per tracked keyword, with no loss of freshness. The same data is simply not bought twice.',
      },
    ],
    architecture:
      'Next.js App Router with server components for data-heavy views, Supabase and PostgreSQL for storage, and Trigger.dev for durable background jobs. Generation is proxied through OpenRouter so models swap without touching product code.',
    keyFeatures: [
      'AI content generation with multi-locale support',
      'Real-time keyword and rank tracking',
      'Location-based insights via Google Maps API',
      'Bulk processing pipelines with caching',
      'Stripe-backed subscription billing',
    ],
    challenges: [
      {
        challenge:
          'Keyword API costs scaled linearly with users and quickly became the largest line item.',
        solution:
          'Introduced request batching and a caching layer keyed by keyword and locale, cutting tracking spend in half without reducing data freshness.',
      },
      {
        challenge:
          'Bulk content jobs exceeded serverless execution limits and failed midway.',
        solution:
          'Moved generation onto Trigger.dev as durable, resumable jobs that checkpoint progress and retry individual items rather than the whole batch.',
      },
    ],
  },

  {
    slug: 'bidnest',
    featured: 7,
    efficiency: {
      lens: 'lean-context',
      title: 'Every screen receives only the bids it is watching.',
      body:
        'Real-time subscriptions are scoped per listing, so a client never processes updates for listings it is not looking at. Bid order is decided once, in a serialised server-side transaction, and clients reconcile to the committed result. The platform holds 1,000+ concurrent bidders with updates in 200 ms.',
      techniques: [
        'Subscriptions scoped per listing',
        'One authoritative decision on the server',
        'Access enforced by row-level security',
      ],
    },
    title: 'Bidnest',
    client: 'Confidential (student housing marketplace)',
    tagline:
      'Off-campus rental bidding marketplace that sends each screen only its own bids',
    summary:
      'A bidding-based marketplace for off-campus rentals. Live updates are scoped per listing, so 1,000+ people can bid at once.',
    description:
      'Students bid on off-campus housing in real time, with role-scoped dashboards for students, parents and landlords.',
    coverImage: '/work/screens/bidnest-desktop.webp',
    coverWidth: 2160,
    coverHeight: 1350,
    platform: 'web',
    screens: {
      desktop: '/work/screens/bidnest-desktop.webp',
      mobile: '/work/screens/bidnest-mobile.webp',
    },
    gallery: [
      {
        title: 'Listing and live bid',
        caption:
          'Bid history updates in under 200 ms, with a parent co-signer on the bid.',
        desktop: '/work/screens/bidnest-listing-desktop.webp',
        mobile: '/work/screens/bidnest-listing-mobile.webp',
      },
      {
        title: 'Student dashboard',
        caption:
          'Active bids, lease progress and services booked from partners.',
        desktop: '/work/screens/bidnest-dashboard-desktop.webp',
        mobile: '/work/screens/bidnest-dashboard-mobile.webp',
      },
      {
        title: 'Messaging',
        caption:
          'Students, landlords and providers in one thread, with bookings on the record.',
        desktop: '/work/screens/bidnest-messages-desktop.webp',
        mobile: '/work/screens/bidnest-messages-mobile.webp',
      },
    ],
    accent: '#38bdf8',
    tech: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'ShadCN',
      'Supabase',
      'PostgreSQL',
      'WebSockets',
      'Stripe',
      'Resend',
      'Twilio',
      'PostHog',
    ],
    techStack: [
      { category: 'Frontend', tools: ['Next.js', 'TypeScript'] },
      { category: 'Styling', tools: ['TailwindCSS', 'ShadCN'] },
      { category: 'Backend', tools: ['Supabase', 'PostgreSQL'] },
      { category: 'Real-time', tools: ['WebSockets'] },
      { category: 'Payments', tools: ['Stripe'] },
      { category: 'Notifications', tools: ['Resend', 'Twilio'] },
      { category: 'Analytics', tools: ['PostHog'] },
    ],
    category: 'Marketplace',
    capabilities: ['Full-Stack', 'Cloud & Automation'],
    industry: 'Property technology',
    year: '2024',
    anonymised: true,
    headline: { value: '1,000+', label: 'people bidding at once' },
    problem:
      'Student housing is dominated by fixed-price listings with no room to negotiate, scattered across platforms nobody trusts. Parents pay for most of these rentals and have no way into the process at all. The market needed a place where the price could be found openly, where every bidder saw the same number, and where a parent could act on a student’s behalf.',
    approach:
      'We designed and built a live bidding marketplace over WebSockets, with bid acceptance serialised on the server so there is one authoritative order, and real-time subscriptions scoped per listing so each screen receives only the bids it is watching. Students, parents and landlords each got a dashboard built for their role, with messaging, service booking and notifications on top.',
    resultsSummary:
      'Bidnest went live for a semester rush and held. A thousand students can bid on the same listing at once and all of them see the same price within a fifth of a second. Parents can bid and message on a student’s behalf for the first time, and landlords let the market find the price instead of guessing it.',
    results: [
      {
        value: '1,000+',
        label: 'concurrent bidders without a conflict',
        detail:
          'Bid acceptance is serialised on the server, so there is one authoritative order and no listing is ever awarded twice.',
      },
      {
        value: '200 ms',
        label: 'from a bid to every screen updating',
        detail:
          'Students, parents and landlords are looking at the same number at the same moment, which is what makes an open auction fair.',
      },
      {
        value: '3',
        label: 'dashboards, one per role',
        detail:
          'Students, parents and landlords each get the actions and information that matter to them, and nothing else.',
      },
    ],
    architecture:
      'Next.js over Supabase and PostgreSQL. Bids flow through a WebSocket channel and are validated server-side before commit, so a client can never post a winning bid it did not earn. Role access is enforced by row-level security.',
    keyFeatures: [
      'Bidding marketplace for verified off-campus rentals',
      'Parent access to bid and message on a student’s behalf',
      'Service booking for moving, cleaning and repairs',
      'Built-in messaging between students, landlords and providers',
      'In-app, email and SMS notifications',
      'Listings filtered by proximity to partner schools',
    ],
    challenges: [
      {
        challenge:
          'Simultaneous bids on the same listing raced each other and could both be accepted.',
        solution:
          'Moved bid acceptance into a serialised server-side transaction so ordering is decided authoritatively, with clients reconciling to the committed result.',
      },
      {
        challenge:
          'Broadcasting every bid to every connected client saturated the socket layer at peak.',
        solution:
          'Scoped subscriptions per listing so clients only receive updates for what they are watching.',
      },
    ],
  },

  {
    slug: 'curio-market',
    featured: 8,
    efficiency: {
      lens: 'no-repeat',
      title:
        'Payouts and tracking run themselves, so support stops repeating them.',
      body:
        'The two paths that created the most manual work, seller payouts and delivery tracking, are automated end to end with Stripe Connect and DHL webhooks, with status shown directly in the order view. Support requests fell by 70%. Tenant isolation is written once, at the database, instead of in every screen.',
      techniques: [
        'Payouts and tracking automated end to end',
        'Status shown where people already look',
        'Isolation enforced once, at the database',
      ],
    },
    title: 'Curio Market',
    client: 'Confidential (ecommerce marketplace)',
    tagline:
      'Personalised multi-seller marketplace with payouts and tracking on autopilot',
    summary:
      'A personalised multi-seller ecommerce marketplace. Automated payouts and delivery tracking cut support requests by 70%.',
    description:
      'A multi-seller marketplace with personalised recommendations, Stripe Connect payouts and automated DHL tracking.',
    coverImage: '/work/screens/curio-market-desktop.webp',
    coverWidth: 2160,
    coverHeight: 1350,
    platform: 'web',
    screens: {
      desktop: '/work/screens/curio-market-desktop.webp',
      mobile: '/work/screens/curio-market-mobile.webp',
    },
    gallery: [
      {
        title: 'Taste quiz',
        caption: 'Eight questions turn a shopper’s taste into a personal feed.',
        desktop: '/work/screens/curio-market-quiz-desktop.webp',
        mobile: '/work/screens/curio-market-quiz-mobile.webp',
      },
      {
        title: 'Personalised marketplace',
        caption:
          'Products from many sellers ranked by match and filtered by mood.',
        desktop: '/work/screens/curio-market-market-desktop.webp',
        mobile: '/work/screens/curio-market-market-mobile.webp',
      },
      {
        title: 'Seller dashboard',
        caption:
          'Orders with DHL tracking and scheduled Stripe Connect payouts.',
        desktop: '/work/screens/curio-market-seller-desktop.webp',
        mobile: '/work/screens/curio-market-seller-mobile.webp',
      },
    ],
    accent: '#a3a3a3',
    tech: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Supabase',
      'Stripe Connect',
      'DHL API',
      'PostHog',
    ],
    techStack: [
      { category: 'Frontend', tools: ['Next.js', 'TypeScript'] },
      { category: 'Styling', tools: ['TailwindCSS'] },
      { category: 'Backend', tools: ['Supabase'] },
      { category: 'Payments', tools: ['Stripe Connect'] },
      { category: 'Logistics', tools: ['DHL API'] },
      { category: 'Analytics', tools: ['PostHog'] },
    ],
    category: 'Marketplace',
    capabilities: ['Full-Stack', 'Cloud & Automation', 'AI'],
    industry: 'Ecommerce',
    year: '2024-2025',
    anonymised: true,
    headline: { value: '70%', label: 'fewer support requests' },
    problem:
      'Most ecommerce shows every shopper the same feed, burying them in options that do not match their taste. Sellers got basic tools with no clear view of orders or payouts, and manual payment handling plus opaque delivery meant the support inbox filled with the same two questions. The marketplace needed to feel personal to shoppers and run itself for sellers.',
    approach:
      'We sat with the support queue first, then built: a server-rendered recommendation engine driven by an eight-question taste quiz, a multi-tenant Supabase architecture with seller isolation enforced at the database, and the two paths that caused most of the work, seller payouts and delivery tracking, automated end to end with Stripe Connect and DHL webhooks, with status shown directly in the order view.',
    resultsSummary:
      'Curio Market went from a generic storefront to a marketplace that learns what each shopper likes and gets out of the way at checkout. Sellers are paid on schedule and can see it, parcels track themselves, and the support inbox went quiet. The client’s own team runs the platform today.',
    learning:
      'Handover was treated as part of the build. The operations team was walked through how payouts, tracking and tenant isolation work and why they were built that way, thoroughly enough that they now run the marketplace without us.',
    results: [
      {
        value: '40%',
        label: 'increase in shopper engagement',
        detail:
          'An eight-question taste quiz turns a generic feed into a personal one, so returning shoppers find things they actually want.',
      },
      {
        value: '70%',
        label: 'fewer support tickets',
        detail:
          'Automated payouts and tracking removed the two questions that filled the inbox, and the answers now sit in the order view where people already look.',
      },
      {
        value: '1',
        label: 'checkout across every seller',
        detail:
          'Shoppers pay once; Stripe Connect splits the payment and settles each seller on schedule, with nobody moving money by hand.',
      },
    ],
    architecture:
      'Next.js App Router, server-rendering the recommendation surfaces. Supabase provides multi-tenant storage with row-level security per seller. Stripe Connect handles split payments and payouts; DHL webhooks drive tracking.',
    keyFeatures: [
      'Personality test driving product recommendations',
      'Multi-seller marketplace in one shopping experience',
      'Seller dashboard for products, orders and payouts',
      'Stripe payments with automated seller payouts',
      'DHL integration for automated delivery tracking',
    ],
    challenges: [
      {
        challenge:
          'Multi-tenancy risked one seller’s queries reaching another seller’s data.',
        solution:
          'Enforced isolation with row-level security policies at the database rather than in application code, so a missed check in the app cannot leak data.',
      },
      {
        challenge:
          'Manual payout and shipping enquiries dominated the support queue.',
        solution:
          'Automated both paths, using Stripe Connect for scheduled payouts and DHL webhooks for tracking, then surfaced status directly in the order view.',
      },
    ],
  },

  {
    slug: 'bitsmiths-hrm',
    featured: 3,
    efficiency: {
      lens: 'right-tool',
      title:
        'Payroll is arithmetic, so it runs on rules, with no model in the loop.',
      body:
        'Leave and medical balances, payroll calculation and locking are Postgres functions. The calculation is idempotent, so it can be re-run safely at any point before a period locks, and every approved item feeds exactly one payroll. The result is zero manual payroll calculations.',
      techniques: [
        'Deterministic logic in the database',
        'Idempotent recalculation',
        'Each item counted exactly once',
      ],
    },
    title: 'Bitsmiths HRM',
    client: 'Bitsmiths Studio',
    tagline:
      'HR and payroll system that runs on rules, with zero manual calculations',
    summary:
      'Onboarding, leave, medical claims, overtime and payroll for Bitsmiths Studio, calculated by database rules instead of by hand.',
    description:
      'An internal HR platform where employees are invited, onboarded and activated; they file leave, medical claims and overtime; admins approve each one, and approved items sweep into a monthly payroll run that calculates payslips, locks them, and exports to Payoneer.',
    coverImage: '/work/screens/bitsmiths-hrm-desktop.webp',
    coverWidth: 2160,
    coverHeight: 1350,
    platform: 'web',
    screens: {
      desktop: '/work/screens/bitsmiths-hrm-desktop.webp',
      mobile: '/work/screens/bitsmiths-hrm-mobile.webp',
    },
    gallery: [
      {
        title: 'Leave requests',
        caption:
          'Requests routed to the lead and admin, with balances that update on approval.',
        desktop: '/work/screens/bitsmiths-hrm-leave-desktop.webp',
        mobile: '/work/screens/bitsmiths-hrm-leave-mobile.webp',
      },
      {
        title: 'Payroll cycle',
        caption:
          'The monthly register with overtime and deductions, approved in two steps.',
        desktop: '/work/screens/bitsmiths-hrm-payroll-desktop.webp',
        mobile: '/work/screens/bitsmiths-hrm-payroll-mobile.webp',
      },
      {
        title: 'Payslip',
        caption:
          'Earnings, deductions and the audit trail of who generated, reviewed and paid it.',
        desktop: '/work/screens/bitsmiths-hrm-payslip-desktop.webp',
        mobile: '/work/screens/bitsmiths-hrm-payslip-mobile.webp',
      },
    ],
    accent: '#10b981',
    tech: [
      'Next.js',
      'TypeScript',
      'React',
      'TailwindCSS',
      'Supabase',
      'PostgreSQL',
      'Zod',
      'TanStack',
      'Resend',
      'pg_cron',
    ],
    techStack: [
      { category: 'Frontend', tools: ['Next.js', 'React', 'TypeScript'] },
      { category: 'Styling', tools: ['TailwindCSS'] },
      { category: 'Backend', tools: ['Supabase', 'PostgreSQL', 'Zod'] },
      { category: 'Data Fetching', tools: ['TanStack'] },
      { category: 'Email', tools: ['Resend'] },
      { category: 'Scheduling', tools: ['pg_cron'] },
    ],
    category: 'SaaS',
    capabilities: ['Cloud & Automation', 'Full-Stack'],
    industry: 'HR technology',
    year: '2026',
    headline: { value: '0', label: 'manual payroll calculations' },
    problem:
      'People operations at Bitsmiths Studio were scattered across email, chat and paper: onboarding by email, leave and overtime in messages, medical claims on paper, and payroll assembled by hand each month from all of it. Nothing reconciled and nothing was auditable. The studio needed one place where every request had a status and payroll could not be wrong.',
    approach:
      'We built one system where every request is a row with a status. Employees are invited, onboarded and activated; they file leave, medical claims and overtime; admins approve each one; and approved items sweep into a monthly payroll run that computes payslips, locks them and exports to Payoneer. Balances, payroll calculation and locking live in Postgres functions, because payroll is arithmetic and should run on rules.',
    resultsSummary:
      'The studio now runs its people operations from one system instead of email, chat and paper. Every request is traceable, people are told where their request stands without asking, and payroll is a locked run that computes itself. When a subtlety surfaced, such as late approvals risking double payment, it was explained, fixed and documented in the same week.',
    learning:
      'Because the payroll rules live in the database and are written down, the people running payroll understand what each number is made of. The pitfalls found during the build, double counting and lost overrides, are documented so the next person does not rediscover them.',
    results: [
      {
        value: '0',
        label: 'manual payroll calculations',
        detail:
          'Approved leave, medical claims and overtime sweep into the monthly run automatically, then lock so nothing is paid twice.',
      },
      {
        value: '5',
        label: 'workflows in one system',
        detail:
          'Onboarding, leave, medical claims, overtime and payroll replaced five separate channels, so nobody has to remember where a request went.',
      },
      {
        value: '12',
        label: 'automated emails',
        detail:
          'Status changes notify people on their own, so nobody chases an approval over chat.',
      },
    ],
    architecture:
      'Next.js 15 App Router with next-safe-action server actions over Supabase, using Postgres, Auth, Storage and pg_cron. Business logic lives in the database: leave and medical balances, payroll calculation and locking are Postgres functions, guarded by row-level security. Roles mirror into the JWT via trigger so middleware can route on them. Resend sends 12 React Email templates, and a monthly cron job opens each payroll period.',
    keyFeatures: [
      'Employee dashboard with live balances and latest payslip',
      'Leave, medical and overtime requests with approval trails',
      'Admin approvals queue across every request type',
      'Monthly payroll runs, locked once finalised',
      'Payslips, released to employees only after lock',
      'Payoneer export and a policies document store',
    ],
    challenges: [
      {
        challenge:
          'Employees could not see their own locked payslips. The visibility policy subqueried an admin-only table, and that subquery runs with the caller’s privileges, so it silently returned nothing.',
        solution:
          'Moved the check into a SECURITY DEFINER helper that answers only "is this run locked?", so the policy resolves without exposing the company-wide payroll totals on that table.',
      },
      {
        challenge:
          'Approved medical and overtime could be double-counted, paid once in the run that swept them and again in the next.',
        solution:
          'Locking a run stamps each approved item with that run id in the same transaction, so every item feeds exactly one payroll and late approvals roll forward instead of duplicating.',
      },
      {
        challenge:
          'Admin overrides on a payslip, such as days worked, overtime multiplier and custom adjustments, were wiped whenever payroll was recalculated.',
        solution:
          'Made calculation idempotent: it upserts derived figures while preserving admin-entered overrides, so a recalc can be run safely at any point before the period locks.',
      },
    ],
  },

  {
    slug: 'bitsmiths-studio',
    featured: 12,
    efficiency: {
      lens: 'no-repeat',
      title: 'Publishing is a CMS action, not a deploy.',
      body:
        'Every content surface is modelled once in Directus and rendered through shared templates, so a new case study or post needs no engineering time. Media is converted to WebP per request, which removes the manual export step.',
      techniques: [
        'Shared templates for four content types',
        'No deploy needed to publish',
        'Images converted on request, not by hand',
      ],
    },
    title: 'Bitsmiths Studio',
    client: 'Bitsmiths Studio',
    tagline: 'Agency website and CMS where publishing needs no deploy',
    summary:
      'Marketing site for a studio that ships MVPs in 30 days. Every content type publishes from the CMS, without engineering time.',
    description:
      'The studio marketing site, built on a CMS so case studies, articles and testimonials publish without a deploy.',
    coverImage: '/work/screens/bitsmiths-studio-desktop.webp',
    coverWidth: 2160,
    coverHeight: 1350,
    platform: 'web',
    screens: {
      desktop: '/work/screens/bitsmiths-studio-desktop.webp',
      mobile: '/work/screens/bitsmiths-studio-mobile.webp',
    },
    gallery: [
      {
        title: 'Blog',
        caption: 'Posts and updates published from the CMS onto the homepage.',
        desktop: '/work/screens/bitsmiths-studio-blogs-desktop.webp',
        mobile: '/work/screens/bitsmiths-studio-blogs-mobile.webp',
      },
      {
        title: 'Services',
        caption:
          'The service catalogue, written and ordered by the team in the CMS.',
        desktop: '/work/screens/bitsmiths-studio-services-desktop.webp',
        mobile: '/work/screens/bitsmiths-studio-services-mobile.webp',
      },
      {
        title: 'Pricing',
        caption: 'Plans and the enquiry path at the end of the page.',
        desktop: '/work/screens/bitsmiths-studio-pricing-desktop.webp',
        mobile: '/work/screens/bitsmiths-studio-pricing-mobile.webp',
      },
    ],
    accent: '#22c55e',
    tech: ['Next.js', 'TypeScript', 'React', 'TailwindCSS', 'Directus'],
    techStack: [
      { category: 'Frontend', tools: ['Next.js', 'React', 'TypeScript'] },
      { category: 'Styling', tools: ['TailwindCSS'] },
      { category: 'CMS', tools: ['Directus'] },
    ],
    category: 'Website',
    capabilities: ['Web'],
    industry: 'Software agency',
    year: '2025',
    headline: { value: '30 days', label: 'from idea to shipped MVP' },
    problem:
      'The studio pitches production-ready MVPs in 30 days to founders who are comparing it against agencies charging many times more. That claim needs visible proof, and the proof changes every month: new case studies, articles and testimonials. The team needed to publish all of it without a developer in the loop.',
    approach:
      'We built the marketing site on Next.js over a Directus CMS, modelling every content surface once and rendering it through shared templates. The page is ordered as an argument: promise, proof, objections, one call to action. Media is converted to WebP per request, so nobody exports images by hand.',
    resultsSummary:
      'The site does the studio’s selling. Case studies, articles, testimonials and FAQs publish from the CMS on save, so the proof behind the 30-day promise stays current without engineering time, and a founder who reads to the end arrives at the enquiry form already informed.',
    results: [
      {
        value: '30 days',
        label: 'from brief to shipped MVP',
        detail:
          'The promise the site makes, backed by the case studies it publishes.',
      },
      {
        value: '4',
        label: 'content types publishable without a deploy',
        detail:
          'Case studies, posts, testimonials and FAQs are edited in Directus and go live on save, by whoever wrote them.',
      },
      {
        value: '1',
        label: 'call to action per visit',
        detail:
          'Promise, proof and objections come first, so the enquiry at the end is an informed one.',
      },
    ],
    architecture:
      'Next.js App Router over a Directus headless CMS. Case studies, posts, testimonials and FAQs are CMS collections rendered through shared templates, with media served as WebP via request-time transforms.',
    keyFeatures: [
      'CMS-driven case studies with a shared detail template',
      'Engineering blog',
      'Client testimonials carousel',
      'Pricing and process FAQ',
      'Per-page SEO and OpenGraph metadata',
    ],
    challenges: [
      {
        challenge:
          'Marketing copy, case studies and articles needed to change frequently without a developer in the loop.',
        solution:
          'Modelled every content surface in Directus and rendered it through shared templates, so publishing is a CMS action rather than a deploy.',
      },
      {
        challenge:
          'Case-study imagery is heavy and would otherwise dominate page weight on a marketing site where first impression speed matters.',
        solution:
          'Served all media through Directus with WebP transforms applied per request, so pages ship modern formats without a manual export step.',
      },
    ],
  },

  {
    slug: 'real-estate-management-system',
    featured: 9,
    efficiency: {
      lens: 'right-tool',
      title: 'Three specialised agents, each scoped to one job.',
      body:
        'Instead of one general assistant handed everything, CRM, compliance and knowledge work are split across three agents, with LangGraph coordinating the hand-offs. Agency differences sit behind CRM integrations, so more than 30 agencies share one workflow instead of thirty variants.',
      techniques: [
        'One agent per responsibility',
        'Explicit hand-offs between agents',
        'One shared workflow for 30+ agencies',
      ],
    },
    title: 'Real Estate Operating System',
    client: 'Confidential (real estate group)',
    tagline:
      'Multi-tenant AI platform for estate agencies, with one agent per job',
    summary:
      'A multi-tenant AI platform automating real estate agency operations. Three specialised agents share one workflow across 30+ agencies.',
    description:
      'A unified operating system for real estate agencies, bringing CRM, compliance, marketing, document generation and e-signing into one multi-tenant platform.',
    coverImage: '/work/screens/real-estate-management-system-desktop.webp',
    coverWidth: 2160,
    coverHeight: 1350,
    platform: 'web',
    screens: {
      desktop: '/work/screens/real-estate-management-system-desktop.webp',
      mobile: '/work/screens/real-estate-management-system-mobile.webp',
    },
    gallery: [
      {
        title: 'Leasing pipeline',
        caption:
          'Leads scored by the CRM agent and moved through viewing, offer and contract.',
        desktop: '/work/screens/real-estate-management-system-crm-desktop.webp',
        mobile: '/work/screens/real-estate-management-system-crm-mobile.webp',
      },
      {
        title: 'Agreement generation',
        caption:
          'Tenancy agreements generated from templates and sent for e-signature.',
        desktop:
          '/work/screens/real-estate-management-system-documents-desktop.webp',
        mobile:
          '/work/screens/real-estate-management-system-documents-mobile.webp',
      },
      {
        title: 'AI agents',
        caption:
          'CRM, compliance and knowledge agents scoped to each agency’s own data.',
        desktop:
          '/work/screens/real-estate-management-system-agents-desktop.webp',
        mobile:
          '/work/screens/real-estate-management-system-agents-mobile.webp',
      },
    ],
    accent: '#3b82f6',
    tech: [
      'React',
      'Python',
      'FastAPI',
      'LangGraph',
      'OpenAI',
      'Multi-tenant Architecture',
    ],
    techStack: [
      { category: 'Frontend', tools: ['React'] },
      { category: 'Backend', tools: ['Python', 'FastAPI'] },
      { category: 'AI', tools: ['LangGraph', 'OpenAI'] },
      { category: 'Architecture', tools: ['Multi-tenant Architecture'] },
    ],
    category: 'SaaS',
    capabilities: ['AI', 'Cloud & Automation', 'Full-Stack'],
    industry: 'Real estate',
    year: '2025',
    headline: { value: '70%', label: 'less paperwork' },
    problem:
      'Estate agencies ran CRM, compliance, marketing and documents across disconnected tools and manual processes, and each agency did it slightly differently. There was no shared system for clients and properties, and agreements were retyped from scratch. The group needed one platform that fitted thirty agencies without becoming thirty products.',
    approach:
      'We built a multi-tenant platform with three specialised agents, for CRM, compliance and knowledge, coordinated by LangGraph, rather than one general assistant handed everything. Agency differences sit behind CRM integrations so the workflow stays shared, and a marketing module and a document generation and e-signing pipeline complete the operating system.',
    resultsSummary:
      'More than thirty agencies now run CRM, compliance, marketing and paperwork on one platform. Tenancy agreements generate from templates and go straight to e-signature instead of being retyped, and the agents handle the routine work that used to sit in inboxes, so people spend more of their day with clients.',
    results: [
      {
        value: '30+',
        label: 'agencies on one platform',
        detail:
          'Each with its own CRM integration and workflows, served from a single multi-tenant deployment, so an improvement reaches everyone at once.',
      },
      {
        value: '70%',
        label: 'less time on documents and agreements',
        detail:
          'Tenancy agreements generate from templates and are sent for e-signature without a person retyping them.',
      },
      {
        value: '3',
        label: 'specialised AI agents',
        detail:
          'CRM, compliance and knowledge agents scoped to each agency’s own data and coordinated by LangGraph, each doing one job well.',
      },
    ],
    architecture:
      'A React frontend talks to a Python and FastAPI backend, while LangGraph orchestrates specialised multi-agent workflows powered by OpenAI models. The multi-tenant architecture serves more than 30 agencies from one platform while supporting each agency’s own CRM and workflows.',
    keyFeatures: [
      'CRM agent syncing with agency-specific CRMs',
      'Compliance agent for regulatory workflows',
      'Knowledge agent for pipeline and workflow Q&A',
      'Marketing module for photography booking and brochure ordering',
      'Vendor reporting',
      'Automated document generation and e-signing',
    ],
    challenges: [
      {
        challenge:
          'Each agency used its own CRM and operating workflow, so one fixed integration could not serve every tenant.',
        solution:
          'Put the differences behind agency-specific CRM integrations while keeping the agent workflow and product experience shared across tenants.',
      },
      {
        challenge:
          'CRM, compliance, knowledge and document tasks had to cooperate without turning one long workflow into a fragile chain.',
        solution:
          'Split the work into specialised agents and used LangGraph to coordinate their responsibilities and hand-offs.',
      },
    ],
  },

  {
    slug: 'qa-compliance-agent',
    featured: 5,
    efficiency: {
      lens: 'checked',
      title: 'Every finding points at the clause it came from.',
      body:
        'Each check is grounded in the standards dataset and returned as a clause-level tracked change with an explanation attached, so a reviewer can verify a finding where it stands. One repeatable workflow evaluates every report against the same standards and output structure.',
      techniques: [
        'Grounded in a standards dataset',
        'Clause-level, traceable findings',
        'One repeatable review workflow',
      ],
    },
    title: 'Compliance Review Agent',
    client: 'Confidential (audit firm)',
    tagline: 'AI compliance reviewer whose every finding cites its clause',
    summary:
      'An AI agent that reviews reports against a standards dataset and returns clause-level tracked changes a person can verify.',
    description:
      'An AI review workflow that checks uploaded reports against established standards and returns clause-level tracked changes with a clear explanation for every finding.',
    coverImage: '/work/screens/qa-compliance-agent-desktop.webp',
    coverWidth: 2160,
    coverHeight: 1350,
    platform: 'web',
    screens: {
      desktop: '/work/screens/qa-compliance-agent-desktop.webp',
      mobile: '/work/screens/qa-compliance-agent-mobile.webp',
    },
    gallery: [
      {
        title: 'Review queue',
        caption:
          'Documents split into clauses and checked against the selected standards.',
        desktop: '/work/screens/qa-compliance-agent-queue-desktop.webp',
        mobile: '/work/screens/qa-compliance-agent-queue-mobile.webp',
      },
      {
        title: 'Findings report',
        caption:
          'Findings by severity, exported as tracked changes and margin comments.',
        desktop: '/work/screens/qa-compliance-agent-report-desktop.webp',
        mobile: '/work/screens/qa-compliance-agent-report-mobile.webp',
      },
      {
        title: 'Standards library',
        caption:
          'The paragraphs every finding cites, with the firm’s own guidance alongside.',
        desktop: '/work/screens/qa-compliance-agent-standards-desktop.webp',
        mobile: '/work/screens/qa-compliance-agent-standards-mobile.webp',
      },
    ],
    accent: '#f59e0b',
    tech: ['Python', 'FastAPI', 'AWS', 'Claude (Anthropic)'],
    techStack: [
      { category: 'Backend', tools: ['Python', 'FastAPI'] },
      { category: 'Cloud', tools: ['AWS'] },
      { category: 'AI', tools: ['Claude (Anthropic)'] },
    ],
    category: 'AI',
    capabilities: ['AI', 'Cloud & Automation'],
    industry: 'Audit and compliance',
    year: '2025',
    headline: { value: '2x', label: 'faster document review' },
    problem:
      'Compliance and audit reviews against established standards were done by hand. Each report took about a week, and two reviewers could reach different conclusions on the same document. The firm wanted reviews to be faster and consistent, but was rightly sceptical of AI in audit work and would not accept findings it could not verify.',
    approach:
      'We built an agent that checks uploaded reports against the firm’s standards dataset and returns a findings report as clause-level tracked changes, each with a written explanation and the standard it cites. We started with a small pilot, showed the reasoning behind every finding, and expanded only when the firm’s reviewers were satisfied.',
    resultsSummary:
      'Reviews that took a week now take about half that, and every finding points at the clause and standard behind it. Reviewers spend their time on judgement calls instead of hunting for the paragraph that triggered an issue, and because every report goes through the same workflow, results are comparable between reviewers.',
    learning:
      'The pilot doubled as training. Reviewers learned to treat the agent’s findings as claims to check, not verdicts to accept, and the clause-level format made that check quick. Scepticism about AI in audit work turned into a working rule: it is useful exactly where its reasoning can be seen.',
    results: [
      {
        value: '2x',
        label: 'faster document review',
        detail:
          'Turnaround on a compliance report fell from about a week to roughly half, with reviewers still making the final call.',
      },
      {
        value: '100%',
        label: 'of findings tied to a clause',
        detail:
          'Each one arrives as a tracked change with the standard it cites and a written explanation, so a reviewer can verify it where it stands.',
      },
      {
        value: '1',
        label: 'review standard for every report',
        detail:
          'The same workflow evaluates every document, so results are consistent between reviewers and comparable across reports.',
      },
    ],
    architecture:
      'A Python and FastAPI backend deployed on AWS handles report ingestion and comparison against the standards dataset. Claude powers the review and comment generation, returning findings tied to individual clauses for a traceable review workflow.',
    keyFeatures: [
      'Report upload and comparison against a standards dataset',
      'Clause-level tracked-change findings',
      'AI-generated comments for every finding',
      'Consistent, repeatable review logic across reports',
    ],
    challenges: [
      {
        challenge:
          'Broad AI feedback was not precise enough for reviewers who needed to see exactly which clause triggered a finding.',
        solution:
          'Grounded each check in the standards dataset and returned findings as clause-level tracked changes with an explanation attached.',
      },
      {
        challenge:
          'Reviewer judgement varied between reports, making outcomes difficult to compare and slowing final sign-off.',
        solution:
          'Encoded the review as one repeatable agent workflow so every report is evaluated against the same standards and output structure.',
      },
    ],
  },

  {
    slug: 'ai-interview-assistant',
    featured: 10,
    efficiency: {
      lens: 'no-repeat',
      title: 'Voice and transcription share one real-time session.',
      body:
        'The interview and its transcript run within the same OpenAI Realtime session, not as two separate passes over the audio. Meeting links, invitations and the transcript email follow automatically, leaving zero manual steps after a session ends.',
      techniques: [
        'One session for voice and transcript',
        'No second pass over the audio',
        'Follow-up automated end to end',
      ],
    },
    title: 'Realtime Voice Interview Assistant',
    client: 'Confidential (recruitment)',
    tagline:
      'Live AI voice interviews, with the transcript in the same session',
    summary:
      'An end-to-end AI interview platform. Voice and transcription run in one real-time session, with no manual steps afterwards.',
    description:
      'An end-to-end interview platform that plans, schedules and conducts live AI voice interviews, then delivers the transcript automatically when the session ends.',
    coverImage: '/work/screens/ai-interview-assistant-desktop.webp',
    coverWidth: 2160,
    coverHeight: 1350,
    platform: 'web',
    screens: {
      desktop: '/work/screens/ai-interview-assistant-desktop.webp',
      mobile: '/work/screens/ai-interview-assistant-mobile.webp',
    },
    gallery: [
      {
        title: 'Candidates',
        caption:
          'Every round scored on the same rubric, with live sessions one click away.',
        desktop: '/work/screens/ai-interview-assistant-candidates-desktop.webp',
        mobile: '/work/screens/ai-interview-assistant-candidates-mobile.webp',
      },
      {
        title: 'Interview report',
        caption:
          'Rubric scores, timestamped highlights and a recommendation to review.',
        desktop: '/work/screens/ai-interview-assistant-report-desktop.webp',
        mobile: '/work/screens/ai-interview-assistant-report-mobile.webp',
      },
      {
        title: 'Role setup',
        caption:
          'Question structure, adaptive follow-ups and voice settings per role.',
        desktop: '/work/screens/ai-interview-assistant-roles-desktop.webp',
        mobile: '/work/screens/ai-interview-assistant-roles-mobile.webp',
      },
    ],
    accent: '#ec4899',
    tech: ['Next.js', 'OpenAI Realtime API'],
    techStack: [
      { category: 'Frontend & Backend', tools: ['Next.js'] },
      { category: 'AI', tools: ['OpenAI Realtime API'] },
    ],
    category: 'AI',
    capabilities: ['AI', 'Full-Stack'],
    industry: 'Recruitment',
    year: '2025',
    headline: { value: '30+', label: 'interviews completed' },
    problem:
      'Running structured interviews at scale, whether general, podcast-style or for recruitment, meant someone scheduling every session, someone facilitating it live and someone handling the transcript afterwards. The format was repeatable; the effort around it was not. The client needed interviews that ran themselves from invitation to transcript.',
    approach:
      'We built a platform where the user chooses an interview type, description, style and a custom intro or outro. It conducts the interview live through the OpenAI Realtime API with the transcript produced in the same session, generates meeting links and invitations, supports several candidates and CVs in recruitment rounds, and emails the transcript the moment the session ends.',
    resultsSummary:
      'Interviews that needed a scheduler, a facilitator and a transcriber now run end to end on their own. The recruiter decides the format and the questions; the platform books, conducts and documents the session, and intern recruitment rounds are scored on the same rubric for every candidate.',
    results: [
      {
        value: '30+',
        label: 'interviews completed on the platform',
        detail:
          'Intern recruitment rounds run live through the AI interviewer, each candidate scored on the same rubric.',
      },
      {
        value: '3',
        label: 'interview formats',
        detail:
          'General, podcast-style and recruitment sessions, each with a custom description, style, intro and outro.',
      },
      {
        value: '0',
        label: 'manual steps after a session ends',
        detail:
          'The transcript is generated live and emailed automatically when the interview closes, so nobody types up a session.',
      },
    ],
    architecture:
      'Next.js powers both the frontend and backend, keeping interview setup, invitations and post-session delivery in one application. The OpenAI Realtime API runs the live voice conversation and transcription, including recruitment sessions with multiple candidates and CVs.',
    keyFeatures: [
      'General, podcast-style and recruitment interview types',
      'Custom interview description, style, intro and outro',
      'Live voice interview with real-time transcription',
      'Multi-candidate and CV support for recruitment sessions',
      'Automated meeting link generation and invitations',
      'Automatic post-interview transcript email',
    ],
    challenges: [
      {
        challenge:
          'A live interview had to keep the spoken conversation and transcript aligned throughout the session.',
        solution:
          'Used the OpenAI Realtime API for both the voice interview and live transcription so they run within the same real-time session.',
      },
      {
        challenge:
          'Recruitment interviews needed to support several candidates and CVs without mixing their context.',
        solution:
          'Structured recruitment sessions around candidate-specific inputs while keeping scheduling, invitations and transcript delivery in one workflow.',
      },
    ],
  },

  {
    slug: 'snobbots',
    featured: 4,
    efficiency: {
      lens: 'lean-context',
      title:
        'Each answer is retrieved from one shop’s content, and nothing else.',
      body:
        'Embeddings are partitioned per tenant in Pinecone, so retrieval can only reach the requesting shop’s namespace. The model works from one knowledge base, which keeps answers grounded in that shop’s content. Provisioning is automated, so resellers set up shops in bulk instead of one at a time.',
      techniques: [
        'Retrieval scoped to one namespace',
        'Answers grounded in the shop’s own content',
        'Bulk provisioning instead of manual setup',
      ],
    },
    title: 'SnobBots',
    client: 'SnobBots',
    tagline:
      'AI support agents for online shops, each answering only from its own shop',
    summary:
      'A multi-tenant AI chatbot platform. Retrieval is scoped to one shop’s content, and new shops are provisioned in bulk.',
    description:
      'Resellers provision AI support agents for their shops in bulk, with each tenant isolated and each answer grounded in that shop’s own content.',
    coverImage: '/work/screens/snobbots-desktop.webp',
    coverWidth: 2160,
    coverHeight: 1350,
    platform: 'web',
    screens: {
      desktop: '/work/screens/snobbots-desktop.webp',
      mobile: '/work/screens/snobbots-mobile.webp',
    },
    gallery: [
      {
        title: 'Handover inbox',
        caption:
          'Conversations the bot could not close, with the order and customer beside them.',
        desktop: '/work/screens/snobbots-inbox-desktop.webp',
        mobile: '/work/screens/snobbots-inbox-mobile.webp',
      },
      {
        title: 'Knowledge base',
        caption:
          'The catalogue, orders API and policies each bot is allowed to answer from.',
        desktop: '/work/screens/snobbots-knowledge-desktop.webp',
        mobile: '/work/screens/snobbots-knowledge-mobile.webp',
      },
      {
        title: 'Shop widget',
        caption:
          'The customer-facing chat as it appears on a client’s storefront.',
        desktop: '/work/screens/snobbots-widget-desktop.webp',
        mobile: '/work/screens/snobbots-widget-mobile.webp',
      },
    ],
    accent: '#06b6d4',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Pinecone', 'RAG', 'LLM'],
    techStack: [
      { category: 'Frontend', tools: ['React'] },
      { category: 'Backend', tools: ['Node.js', 'Express'] },
      { category: 'Database', tools: ['MongoDB', 'Pinecone'] },
      { category: 'AI', tools: ['RAG', 'LLM'] },
    ],
    category: 'AI',
    capabilities: ['AI', 'Cloud & Automation'],
    industry: 'Ecommerce / Customer support',
    year: '2023-2024',
    headline: { value: '60%', label: 'faster shop setup' },
    problem:
      'Resellers wanted to offer AI support agents to their own shops, but every deployment was bespoke, so onboarding one shop took days of manual setup. Worse, a shared index risked one shop’s content surfacing in another shop’s answers. The platform needed to provision shops in bulk and keep each one’s knowledge strictly its own.',
    approach:
      'We built a multi-tenant MERN platform where each shop runs its own context-aware agent. Embeddings are partitioned per tenant in Pinecone, so retrieval can only reach the requesting shop’s namespace, and answers are grounded in that shop’s catalogue, orders and policies. Automated provisioning sits on top, so resellers set up shops in bulk from a management dashboard.',
    resultsSummary:
      'Resellers now stand up support agents for their shops in bulk instead of one bespoke deployment at a time. Each bot answers only from its own shop’s content and hands over to a person when it cannot close a conversation, so shoppers get grounded answers and shop owners keep the final word.',
    results: [
      {
        value: '60%',
        label: 'faster shop onboarding',
        detail:
          'Automated provisioning turned a multi-day manual setup into a bulk operation a reseller runs from the dashboard.',
      },
      {
        value: '1',
        label: 'isolated namespace per shop',
        detail:
          'Embeddings are partitioned per tenant in Pinecone, so no bot can ever surface another shop’s content.',
      },
      {
        value: '100%',
        label: 'of answers grounded in the shop’s own content',
        detail:
          'Retrieval runs over the catalogue, orders API and policies the reseller has allowed for that bot, and nothing outside them.',
      },
    ],
    architecture:
      'MERN: React, an Express and Node.js API, and MongoDB for tenant and conversation data. Pinecone holds per-tenant embeddings so retrieval is scoped to one shop’s knowledge base, and provisioning runs without manual setup.',
    keyFeatures: [
      'Multi-tenant architecture with isolated agents',
      'RAG for context-aware, business-specific answers',
      'Automated bulk bot provisioning',
      'Reseller management dashboard',
      'Embeddable support widget',
    ],
    challenges: [
      {
        challenge:
          'Retrieval across a shared vector index surfaced one shop’s content in another shop’s answers.',
        solution:
          'Partitioned embeddings per tenant in Pinecone so retrieval can only ever reach the requesting shop’s namespace.',
      },
      {
        challenge:
          'Manual per-shop setup made reseller onboarding the bottleneck on growth.',
        solution:
          'Automated provisioning end to end, turning a multi-day manual process into a bulk operation.',
      },
    ],
  },

  {
    slug: 'ai-physiotherapy',
    featured: 11,
    efficiency: {
      lens: 'right-tool',
      title:
        'Rules adapt the plan each day. The model does what needs judgement.',
      body:
        'Daily logs feed progression and regression rules, so the plan adapts automatically instead of waiting for a manual review. AI is used where it earns its place: intake, plan generation informed by uploaded injury articles, and feedback on exercise videos.',
      techniques: [
        'Progression and regression by rule',
        'Plans informed by uploaded source articles',
        'AI feedback on submitted videos',
      ],
    },
    title: 'AI Physiotherapy Assistant',
    client: 'Confidential (healthcare)',
    tagline: 'AI rehabilitation assistant whose plans adapt daily by rule',
    summary:
      'A full-stack AI platform for adaptive rehabilitation. Daily logs adjust the plan automatically, and AI handles intake, plans and video feedback.',
    description:
      'A connected rehabilitation journey spanning intake, movement assessment, adaptive exercise planning, daily progress and AI-assisted video feedback.',
    coverImage: '/work/screens/ai-physiotherapy-desktop.webp',
    coverWidth: 2160,
    coverHeight: 1350,
    platform: 'web',
    screens: {
      desktop: '/work/screens/ai-physiotherapy-desktop.webp',
      mobile: '/work/screens/ai-physiotherapy-mobile.webp',
    },
    gallery: [
      {
        title: 'Movement assessment',
        caption:
          'Pose analysis on an uploaded clip, with joint angles and form feedback.',
        desktop: '/work/screens/ai-physiotherapy-assessment-desktop.webp',
        mobile: '/work/screens/ai-physiotherapy-assessment-mobile.webp',
      },
      {
        title: 'Eight-week plan',
        caption:
          'Phases, this week’s sessions and every adaptation with its reason.',
        desktop: '/work/screens/ai-physiotherapy-plan-desktop.webp',
        mobile: '/work/screens/ai-physiotherapy-plan-mobile.webp',
      },
      {
        title: 'Clinician view',
        caption:
          'Patients by attention needed and AI plan changes waiting for approval.',
        desktop: '/work/screens/ai-physiotherapy-clinician-desktop.webp',
        mobile: '/work/screens/ai-physiotherapy-clinician-mobile.webp',
      },
    ],
    accent: '#14b8a6',
    tech: ['React', 'Python', 'FastAPI', 'LangChain', 'OpenAI'],
    techStack: [
      { category: 'Frontend', tools: ['React'] },
      { category: 'Backend', tools: ['Python', 'FastAPI'] },
      { category: 'AI', tools: ['LangChain', 'OpenAI'] },
    ],
    category: 'AI',
    capabilities: ['AI', 'Full-Stack'],
    industry: 'Healthcare',
    year: '2024',
    headline: { value: '90%+', label: 'accurate movement checks' },
    problem:
      'The rehabilitation journey was fragmented: manual intake, a movement assessment, a generic exercise plan and infrequent follow-up. Between supervised sessions patients had little guidance, and plans did not respond when a patient improved or struggled. Recovery needed to be one connected journey that adapted every day.',
    approach:
      'We built the journey end to end: an intake agent, guided movement assessment with instructional videos, automatic exercise plan generation informed by uploaded injury articles, daily logging, and AI feedback on uploaded exercise videos. Progression and regression are rules driven by the daily log; the model is used where judgement is needed, in intake, plan generation and video feedback.',
    resultsSummary:
      'Patients now have guidance every day, not just at supervised sessions. The plan adapts to how they actually performed, form feedback arrives on the clips they upload, and the clinician reviews joint angles and corrections instead of guessing what happened between appointments.',
    results: [
      {
        value: '90%+',
        label: 'accuracy on movement and form checks',
        detail:
          'Pose analysis on uploaded clips returns joint angles and corrective feedback the clinician can review before it reaches the patient.',
      },
      {
        value: '8 weeks',
        label: 'of plan, adapting daily',
        detail:
          'Daily logs drive progression or regression automatically instead of waiting for the next appointment.',
      },
      {
        value: '1',
        label: 'connected journey from intake to recovery',
        detail:
          'Intake agent, assessment, plan, daily logging and AI video feedback replace four disconnected steps.',
      },
    ],
    architecture:
      'A React frontend connects to a Python and FastAPI backend. LangChain coordinates intake, assessment context and plan generation, with OpenAI producing adaptive guidance. Video uploads feed the form-analysis workflow, and uploaded injury articles provide source material for plan generation.',
    keyFeatures: [
      'Intake agent starting the patient journey',
      'Movement assessment with instructional videos and tutorials',
      'Automatic exercise plan generation',
      'Daily logging with automatic plan progression or regression',
      'Uploaded-video form analysis with AI feedback',
      'Plan generation informed by uploaded injury articles',
    ],
    challenges: [
      {
        challenge:
          'Static exercise plans could not respond when a patient’s daily performance improved or declined.',
        solution:
          'Connected daily logs to progression and regression rules so the plan adapts automatically instead of waiting for manual review.',
      },
      {
        challenge:
          'Plan generation needed injury-specific context rather than relying on generic model knowledge.',
        solution:
          'Made uploaded articles on common injuries available to the generation workflow so recommendations can use relevant source material.',
      },
    ],
  },

  {
    slug: 'new-web-order',
    featured: 13,
    efficiency: {
      lens: 'lean-context',
      title: 'Each route ships only the code and images it needs.',
      body:
        'Routes are pre-rendered where content allows, JavaScript is split per route and only the above-the-fold image is prioritised. Pages load 40% faster with no layout shift from imagery, because the rendering work is done once at build time rather than on every visit.',
      techniques: [
        'Pre-rendered once, served many times',
        'Code split per route',
        'Only the first image prioritised',
      ],
    },
    title: 'New Web Order',
    client: 'New Web Order',
    tagline: 'Company website rebuilt to ship only what each page needs',
    summary:
      'A company website built for performance and SEO. Pre-rendered routes and per-route code make pages load 40% faster.',
    description:
      'A company site rebuilt on Next.js for speed and search. 40% faster, and finally ranking.',
    coverImage: '/work/screens/new-web-order-desktop.webp',
    coverWidth: 2160,
    coverHeight: 1350,
    platform: 'web',
    screens: {
      desktop: '/work/screens/new-web-order-desktop.webp',
      mobile: '/work/screens/new-web-order-mobile.webp',
    },
    gallery: [
      {
        title: 'Projects',
        caption: 'The project index, rebuilt as static pages.',
        desktop: '/work/screens/new-web-order-projects-desktop.webp',
        mobile: '/work/screens/new-web-order-projects-mobile.webp',
      },
      {
        title: 'Services',
        caption: 'Service pages generated from structured content.',
        desktop: '/work/screens/new-web-order-services-desktop.webp',
        mobile: '/work/screens/new-web-order-services-mobile.webp',
      },
      {
        title: 'About',
        caption: 'The company page on the same layout system.',
        desktop: '/work/screens/new-web-order-about-desktop.webp',
        mobile: '/work/screens/new-web-order-about-mobile.webp',
      },
    ],
    accent: '#f97316',
    tech: ['Next.js', 'TypeScript', 'TailwindCSS'],
    techStack: [
      { category: 'Frontend', tools: ['Next.js', 'TypeScript'] },
      { category: 'Styling', tools: ['TailwindCSS'] },
    ],
    category: 'Website',
    capabilities: ['Web'],
    industry: 'Professional services',
    year: '2024',
    headline: { value: '40%', label: 'faster-loading pages' },
    problem:
      'The company’s site loaded slowly and ranked poorly, so it lost inbound leads before a visitor ever saw the offering. It needed to be fast on the first visit, findable in search and built so that every page led somewhere.',
    approach:
      'We rebuilt the site on Next.js with TypeScript and Tailwind, then worked through the performance budget: routes pre-rendered where content allows, JavaScript split per route, images served through next/image with explicit dimensions and only the above-the-fold image prioritised, and SEO metadata on every route.',
    resultsSummary:
      'The rebuilt site loads 40% faster, ranks for the terms the company sells on, and puts an enquiry within one scroll on every route. Visitors see the offering before they have a chance to leave, and the rendering work is done once at build time rather than on every visit.',
    results: [
      {
        value: '40%',
        label: 'faster page loads',
        detail:
          'Static-first rendering, route-level code splitting and optimised imagery, so the first visit is the fast one.',
      },
      {
        value: '100%',
        label: 'of routes reach a call to action in one scroll',
        detail:
          'Every page moves a visitor from the offering to an enquiry without hunting.',
      },
      {
        value: '0',
        label: 'layout shift from imagery',
        detail:
          'All images serve through next/image with explicit dimensions and modern formats, so nothing jumps while the page loads.',
      },
    ],
    architecture:
      'Static-first Next.js App Router build. Routes are pre-rendered where content allows, images are served through next/image with explicit dimensions, and JavaScript is code-split per route to keep the initial payload small.',
    keyFeatures: [
      'Static-first rendering for fast first paint',
      'Route-level code splitting',
      'Optimised, layout-shift-free imagery',
      'SEO metadata across all routes',
      'Fully responsive layout',
    ],
    challenges: [
      {
        challenge:
          'Large marketing imagery dominated the page weight and delayed first paint.',
        solution:
          'Moved all imagery to next/image with explicit dimensions and modern formats, prioritising only the above-the-fold hero.',
      },
    ],
  },
  {
    slug: 'bank-islami-pep',
    featured: 2,
    efficiency: {
      lens: 'right-tool',
      title:
        'A scoring pipeline reads the news. Analysts see only credible matches.',
      body:
        'Matching is a scoring pipeline over name variants, transliterations, role and city. Only matches above a confidence threshold reach the review queue, each showing exactly which fields agreed, so analysts spend their time on decisions. Morning triage fell from four hours to 30 minutes.',
      techniques: [
        'Scheduled crawl before the team arrives',
        'Confidence threshold before human review',
        'Every match shows why it matched',
      ],
    },
    title: 'BankIslami PEP Screening',
    client: 'BankIslami, delivered with Aawaz AI',
    tagline:
      'Daily PEP adverse-media screening that shows analysts only credible matches',
    summary:
      'An internal web and mobile platform that reads the news every morning, scores it against the bank’s PEP list and turns it into a risk report.',
    description:
      'Banks must monitor politically exposed persons and their associates continuously, not just at onboarding. At BankIslami that meant analysts opening dozens of news sites every morning and searching for hundreds of names by hand. We built an end-to-end screening platform: a crawler that fetches the day’s financial and political news, a matching engine that ties articles to the bank’s PEP records, and a review workflow that ends in a signed daily risk report. It ships as a MERN web application for analysts at their desks and a native mobile app for compliance officers on the move.',
    coverImage: '/work/screens/bank-islami-pep-desktop.webp',
    coverWidth: 2160,
    coverHeight: 1350,
    platform: 'app',
    screens: {
      desktop: '/work/screens/bank-islami-pep-desktop.webp',
      mobile: '/work/screens/bank-islami-pep-mobile.webp',
      mobileAlt: '/work/screens/bank-islami-pep-alt.webp',
    },
    gallery: [
      {
        title: 'Review queue',
        caption:
          'Client record and article side by side, so a name match is confirmed or dismissed in seconds.',
        mobile: '/work/screens/bank-islami-pep-review-mobile.webp',
      },
      {
        title: 'Daily risk report',
        caption:
          'The morning’s findings as a signed PDF, with score movement and delivery to Compliance and Risk.',
        mobile: '/work/screens/bank-islami-pep-report-mobile.webp',
      },
      {
        title: 'Sources',
        caption:
          'Every news feed, regulator and court list the crawler reads, with last-run health.',
        mobile: '/work/screens/bank-islami-pep-sources-mobile.webp',
      },
    ],
    accent: '#059669',
    tech: [
      'React',
      'React Native',
      'Vite',
      'TypeScript',
      'TailwindCSS',
      'Node.js',
      'Express',
      'MongoDB',
      'Puppeteer',
      'BullMQ',
      'Redis',
      'JWT',
    ],
    techStack: [
      { category: 'Web app', tools: ['React', 'Vite', 'TypeScript'] },
      { category: 'Mobile app', tools: ['React Native', 'Expo'] },
      { category: 'Styling', tools: ['TailwindCSS'] },
      { category: 'Backend', tools: ['Node.js', 'Express', 'MongoDB'] },
      { category: 'Crawling', tools: ['Puppeteer', 'Cheerio'] },
      { category: 'Jobs', tools: ['BullMQ', 'Redis'] },
      { category: 'Auth & reports', tools: ['JWT', 'PDFKit'] },
    ],
    category: 'Mobile',
    capabilities: ['Mobile', 'Full-Stack', 'AI', 'Cloud & Automation'],
    industry: 'Banking / Compliance',
    year: '2025',
    headline: { value: '38', label: 'news sources screened daily' },
    problem:
      'Regulators expect banks to keep screening politically exposed persons for as long as the relationship lasts. BankIslami’s compliance team did this by hand: a morning across news sites, court lists and gazettes, searching for over a thousand names, then pasting findings into a spreadsheet. Stories were missed, the report landed mid-afternoon, and nobody could show an auditor how a name had been checked. Screening needed to be complete, early and provable.',
    approach:
      'With Aawaz AI we started with the sources, not the interface: a scheduled crawler that fetches every relevant Pakistani and international outlet at 06:00, normalises the articles and stores them. A scoring pipeline matches each article against the bank’s PEP list on name variants, transliterations, role and city, and only matches above a confidence threshold reach an analyst, each showing which fields agreed. The review queue, risk profiles and signed daily report were built once as a component set and shipped to the browser and to iOS and Android.',
    resultsSummary:
      'The compliance team now starts the day with a finished report instead of a morning of searching. Every relevant outlet is read before anyone arrives, analysts spend their time deciding rather than hunting, and every decision on a name is recorded well enough to show an auditor. The model does the reading; the person makes the call.',
    learning:
      'Compliance is about being able to show your reasoning, and the product was built that way from the first sprint. Every match explains itself, so analysts learned quickly which signals to trust and which to question, and nothing shipped that the team could not explain to an auditor.',
    results: [
      {
        value: '38',
        label: 'sources screened before the team arrives',
        detail:
          'Roughly 200 articles a day are crawled, normalised and matched against the PEP list from 06:00, before the first analyst logs in.',
      },
      {
        value: '30 min',
        label: 'of morning triage, down from four hours',
        detail:
          'Analysts confirm or dismiss scored matches with the client record and article side by side, instead of searching by hand.',
      },
      {
        value: '07:30',
        label: 'daily risk report delivered',
        detail:
          'Where it used to land mid-afternoon, now with a full audit trail per name and delivery to Compliance and Risk.',
      },
      {
        value: '1,240',
        label: 'accounts monitored continuously',
        detail:
          'PEP and related-party accounts screened every day across web and mobile, none of them skipped on a busy morning.',
      },
    ],
    architecture:
      'A MERN stack: React with Vite and Tailwind for the analyst dashboard, React Native for the mobile app, and one Express API over MongoDB serving both. A BullMQ worker on Redis runs the crawl at 06:00, fetching sources with Puppeteer where pages are rendered client-side and Cheerio where they are not. Matching is a scoring pipeline over name variants, transliterations, role and city, with a confidence threshold that routes matches to the review queue. Confirmed findings roll into a PDF report generated server-side and delivered by email and push notification.',
    keyFeatures: [
      'Scheduled daily crawl of news, regulator and court sources',
      'Name matching with transliteration and alias handling',
      'Risk score per person with adverse media, litigation and sanctions signals',
      'Review queue with client record and article side by side',
      'Escalation to the MLRO with a full audit trail',
      'Generated daily risk report as a signed PDF',
      'Mobile app with push alerts for high-risk matches',
      'Role-based access for analysts, reviewers and management',
    ],
    challenges: [
      {
        challenge:
          'Names in Urdu and English transliterate many ways, so a strict match missed real stories and a loose one buried analysts in false positives.',
        solution:
          'A scoring pipeline weighs name variants against role, city and known associates, and every match above the threshold shows the analyst exactly which fields agreed.',
      },
      {
        challenge:
          'News sites change their markup without notice, and one silent failure meant a source was missing from the morning report.',
        solution:
          'Each source has a health check and an article-count baseline; a crawl that returns far fewer than usual retries and flags the feed as delayed on the dashboard instead of passing quietly.',
      },
      {
        challenge:
          'The bank needed the same screening on phones for officers who are rarely at a desk, without maintaining two products.',
        solution:
          'Screens were designed once as a shared component set and served by one API, so the web dashboard and the React Native app always show the same data and the same decisions.',
      },
    ],
  },
  {
    slug: 'bidnest-mobile',
    featured: 14,
    efficiency: {
      lens: 'no-repeat',
      title: 'Three platforms from one build, with nothing rebuilt for native.',
      body:
        'The existing web application is wrapped with Capacitor instead of being rewritten twice. Bidding, messaging and checkout are the same code on web, iOS and Android, so a fix ships to three platforms at once.',
      techniques: [
        'One codebase for web, iOS and Android',
        'Zero features rebuilt for native',
        'One fix, three platforms',
      ],
    },
    title: 'Bidnest Mobile App',
    client: 'Confidential (student housing marketplace)',
    tagline: 'The bidding marketplace on iOS and Android, from one codebase',
    summary:
      'The Bidnest marketplace wrapped with Capacitor, so three platforms ship from one build with nothing rebuilt.',
    description:
      'The same codebase that runs the Bidnest web platform, wrapped with Capacitor into native iOS and Android apps. One team ships the web platform and both app stores from a single repository, and every marketplace flow works inside the native shell without being rebuilt.',
    coverImage: '/work/screens/bidnest-mobile-mobile.webp',
    coverWidth: 780,
    coverHeight: 1688,
    platform: 'app',
    screens: {
      desktop: '/work/screens/bidnest-desktop.webp',
      mobile: '/work/screens/bidnest-mobile-mobile.webp',
      mobileAlt: '/work/screens/bidnest-mobile-alt.webp',
    },
    gallery: [
      {
        title: 'Student dashboard',
        caption: 'Bids, lease steps and services inside the native shell.',
        mobile: '/work/screens/bidnest-mobile-dashboard-mobile.webp',
      },
      {
        title: 'Messaging',
        caption:
          'Threads with landlords and providers, opened by deep link from notifications.',
        mobile: '/work/screens/bidnest-mobile-messages-mobile.webp',
      },
      {
        title: 'Browse',
        caption: 'The map and search from the web platform, tuned for touch.',
        mobile: '/work/screens/bidnest-mobile-browse-mobile.webp',
      },
    ],
    accent: '#38bdf8',
    tech: [
      'Capacitor',
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'ShadCN',
      'Supabase',
      'PostgreSQL',
      'WebSockets',
      'Stripe',
      'Resend',
      'Twilio',
      'PostHog',
    ],
    techStack: [
      { category: 'Native shell', tools: ['Capacitor', 'iOS', 'Android'] },
      { category: 'Frontend', tools: ['Next.js', 'TypeScript'] },
      { category: 'Styling', tools: ['TailwindCSS', 'ShadCN'] },
      { category: 'Backend', tools: ['Supabase', 'PostgreSQL'] },
      { category: 'Real-time', tools: ['WebSockets'] },
      { category: 'Payments', tools: ['Stripe'] },
      { category: 'Notifications', tools: ['Resend', 'Twilio'] },
      { category: 'Analytics', tools: ['PostHog'] },
    ],
    category: 'Mobile',
    capabilities: ['Mobile', 'Full-Stack', 'Cloud & Automation'],
    industry: 'Property technology',
    year: '2024',
    anonymised: true,
    headline: { value: '3', label: 'platforms from one build' },
    problem:
      'Students live on their phones. A bid placed from a laptop can be outbid during a lecture, and a browser tab does not wake anyone up. The marketplace already existed on the web, and building two native apps from scratch would have doubled the work and split the team. Bidnest needed to be in students’ pockets without becoming three products.',
    approach:
      'Rather than rebuild natively, we wrapped the existing Next.js application with Capacitor, tuned the bidding and messaging screens for touch and safe areas, added native navigation, an offline screen, deep links from notifications and session persistence, and shipped to both stores from the same repository as the website.',
    resultsSummary:
      'Bidnest reached the App Store and Google Play without a second codebase or a second team. Students bid, message and pay from their phones with the same flows as the web platform, get woken up by a notification when they are outbid, and a fix ships to all three platforms at once.',
    results: [
      {
        value: '3',
        label: 'platforms from one build',
        detail:
          'The website, the iOS app and the Android app ship from a single repository and release branch.',
      },
      {
        value: '0',
        label: 'features rebuilt for native',
        detail:
          'Real-time bids, messaging and Stripe checkout are the same code that serves the web platform, so nothing was built twice.',
      },
      {
        value: '2',
        label: 'app stores from the same release branch',
        detail:
          'Native navigation, safe-area layouts and an offline screen, so the app behaves like an app rather than a website in a frame.',
      },
    ],
    architecture:
      'Capacitor hosts the production web build inside a native WebView on iOS and Android. Native plugins cover what the browser cannot; everything else, from real-time bids to Stripe checkout, is the same code that serves the web platform, so a fix ships to three platforms at once.',
    keyFeatures: [
      'Native iOS and Android builds from the web codebase',
      'Same bidding, messaging and payment flows as the web platform',
      'Touch-first layouts with safe-area handling',
      'Session kept on device between launches',
      'Deep links from notifications into the exact listing',
      'Offline screen instead of a browser error',
    ],
    challenges: [
      {
        challenge:
          'WebSocket connections drop when the app moves to the background, so bids could arrive late after resume.',
        solution:
          'Reconnect on resume with a full state re-sync, so the listing shows the committed bid history the moment the app returns.',
      },
      {
        challenge:
          'Store review rejects apps that behave like a website in a frame.',
        solution:
          'Native navigation gestures, safe-area layouts and an offline screen, with the web chrome removed inside the shell.',
      },
    ],
  },
  {
    slug: 'tayyab-sohail-portfolio',
    efficiency: {
      lens: 'no-repeat',
      title: 'One typed data file generates the whole site.',
      body:
        'The grid, every case-study page, the sitemap and the social previews are rendered from one array. There is no CMS or database to maintain, and the compiler refuses a build when a section is missing.',
      techniques: [
        'One source of truth',
        'No CMS or database to run',
        'Errors caught at build time',
      ],
    },
    title: 'Tayyab Sohail Portfolio',
    client: 'Tayyab Sohail',
    tagline: 'Case-study portfolio generated from one typed data file',
    summary:
      'A personal site where every project is a full case study, generated from one typed data file.',
    description:
      'The portfolio of our founder: a Next.js site where the project grid, every case-study page, the sitemap and the social previews are generated from a single typed data file. It ships as static HTML, animates without hurting load time and books calls through an embedded calendar.',
    coverImage: '/work/screens/tayyab-sohail-portfolio-desktop.webp',
    coverWidth: 2160,
    coverHeight: 1350,
    platform: 'web',
    screens: {
      desktop: '/work/screens/tayyab-sohail-portfolio-desktop.webp',
      mobile: '/work/screens/tayyab-sohail-portfolio-mobile.webp',
    },
    gallery: [
      {
        title: 'Tech stack',
        caption: 'Tools and frameworks, grouped by layer.',
        desktop: '/work/screens/tayyab-sohail-portfolio-stack-desktop.webp',
        mobile: '/work/screens/tayyab-sohail-portfolio-stack-mobile.webp',
      },
      {
        title: 'Contact',
        caption:
          'A message form and an embedded Cal.com booking on one screen.',
        desktop: '/work/screens/tayyab-sohail-portfolio-contact-desktop.webp',
        mobile: '/work/screens/tayyab-sohail-portfolio-contact-mobile.webp',
      },
    ],
    accent: '#10b981',
    tech: [
      'Next.js',
      'TypeScript',
      'React',
      'TailwindCSS',
      'Framer Motion',
      'Cal.com',
      'Vercel',
    ],
    techStack: [
      { category: 'Frontend', tools: ['Next.js', 'TypeScript', 'React'] },
      { category: 'Styling & motion', tools: ['TailwindCSS', 'Framer Motion'] },
      { category: 'Booking', tools: ['Cal.com'] },
      { category: 'Hosting', tools: ['Vercel'] },
    ],
    category: 'Website',
    capabilities: ['Web'],
    industry: 'Software engineering',
    year: '2025',
    notable: true,
    headline: { value: '12', label: 'projects in one portfolio' },
    problem:
      'A CV lists technologies; it does not show how a product was built or what changed after it shipped. Most portfolio sites are a grid of thumbnails with nothing behind them, and keeping a dozen project pages consistent by hand is where they fall apart. The portfolio needed to show the work properly and stay consistent without constant upkeep.',
    approach:
      'We treated the portfolio like a product. Every project is a typed record with problem, approach, architecture, features, challenges and outcomes, and the site renders the grid, the case-study pages, the sitemap and the social previews from that one array. It ships as static HTML, animates after first paint and books calls through an embedded Cal.com calendar.',
    resultsSummary:
      'Every project on the site is a full case study rather than a thumbnail, and all of them share one structure because they come from one typed data file. There is no CMS or database to maintain, the motion costs nothing on load, and a call is one click from any page.',
    results: [
      {
        value: '12',
        label: 'case studies from one typed data file',
        detail:
          'The grid, every case-study page, the sitemap and the social previews render from a single array.',
      },
      {
        value: '0',
        label: 'CMS or database to maintain',
        detail:
          'Every page is built statically at deploy time, and the type checker refuses a build if a section is missing.',
      },
      {
        value: '1',
        label: 'click from any case study to a booked call',
        detail:
          'An embedded Cal.com calendar sits on the contact screen alongside the message form.',
      },
    ],
    architecture:
      'Next.js App Router with static generation for every case-study route. Project data lives in one TypeScript array so the type checker refuses a build when a section is missing. Motion runs on Framer Motion after first paint; call booking is an embedded Cal.com widget.',
    keyFeatures: [
      'Filterable project grid by category and capability',
      'Case-study page generated per project',
      'Previous and next navigation across projects',
      'Sitemap and social images derived from the same data',
      'Embedded call booking',
      'Downloadable résumé',
    ],
    challenges: [
      {
        challenge:
          'Twelve hand-written case studies drifted apart in structure and tone.',
        solution:
          'One typed schema for all projects, with the compiler failing the build when a field is missing.',
      },
      {
        challenge:
          'Animated pages tend to score badly on load and layout stability.',
        solution:
          'Static generation, fonts loaded through next/font and motion that starts only after the first paint.',
      },
    ],
  },

  {
    slug: 'feinwerks',
    featured: 15,
    title: 'Feinwerks Software',
    client: 'Feinwerks Software',
    tagline: 'Bilingual site for a product engineering studio',
    summary:
      'Marketing site for a product engineering studio, in English and German.',
    description:
      'The website for Feinwerks, a Germany- and Pakistan-based product engineering studio. It sells a fixed-scope, fixed-quote way of building products, in English and German, and ends every page at a proposal request.',
    coverImage: '/images/feinwerks.png',
    coverWidth: 1600,
    coverHeight: 900,
    platform: 'web',
    // Only a desktop capture exists, so the card shows the laptop alone.
    screens: { desktop: '/images/feinwerks.png' },
    gallery: [],
    accent: '#f59e0b',
    tech: [
      'Next.js',
      'TypeScript',
      'React',
      'TailwindCSS',
      'Framer Motion',
      'Vercel',
    ],
    techStack: [
      { category: 'Frontend', tools: ['Next.js', 'React', 'TypeScript'] },
      { category: 'Styling & Motion', tools: ['TailwindCSS', 'Framer Motion'] },
      { category: 'Deployment', tools: ['Vercel'] },
    ],
    category: 'Website',
    capabilities: ['Web'],
    industry: 'Software studio',
    year: '2026',
    liveUrl: 'https://feinwerks.software/',
    headline: { value: '2', label: 'languages from one page' },
    problem:
      'Feinwerks pitches to founders who cannot afford a second attempt: a written scope, a fixed or custom quote and a committed launch date before any code is written. That is an unusual promise for a studio, and the site had to make it credible to readers in two markets, Germany and Pakistan, without a sales call.',
    approach:
      'A static-first Next.js build ordered as an argument: the promise, the five service lines, a six-step process from quote to handover, client testimonials, then one call to action. English and German copy live side by side and switch in place, so both languages share one page, one layout and one set of components.',
    results: [
      {
        value: '2',
        label: 'languages, English and German',
        detail: 'Both come from one page and one set of components.',
      },
      {
        value: '6',
        label: 'delivery steps explained on the page',
        detail: 'The fixed-quote promise is shown rather than claimed.',
      },
      {
        value: '1',
        label: 'primary call to action',
        detail: 'Request a proposal, placed at the end of the argument.',
      },
    ],
    architecture:
      'Next.js App Router deployed on Vercel. Routes are pre-rendered, fonts are self-hosted through next/font and preloaded, and the organisation schema is emitted as JSON-LD so search engines see both offices and contact points. Language switching is handled on the client over shared components rather than duplicated routes.',
    keyFeatures: [
      'English and German copy with an in-place language switch',
      'Five service lines with concrete deliverables under each',
      'Six-step process from written quote to handover',
      'Client testimonials in both languages',
      'Pricing, careers and contact pages with a request-a-proposal flow',
      'Organisation JSON-LD, per-page metadata and preloaded fonts',
    ],
    challenges: [
      {
        challenge:
          'Serving German and English without maintaining two sites that slowly drift apart.',
        solution:
          'Kept both languages in the same components and switched them in place, so a copy change is made once and both locales ship together.',
      },
      {
        challenge:
          'A fixed-quote promise reads as marketing unless the reader can see how the studio actually works.',
        solution:
          'Laid out the full six-step process, from the first call to ownership handover, ahead of the call to action and the pricing page, so the promise is backed by a visible method.',
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Homepage showcase, in `featured` order. */
export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => project.featured !== undefined)
    .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));
}

export function getProjectsBySlugs(slugs: readonly string[]): Project[] {
  return slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => Boolean(project));
}

/** Main products: every project not flagged `notable`, in `featured` order. */
export function getShowcaseProjects(): Project[] {
  return projects
    .filter((project) => !project.notable)
    .sort(
      (a, b) =>
        (a.featured ?? Number.MAX_SAFE_INTEGER) -
        (b.featured ?? Number.MAX_SAFE_INTEGER),
    );
}

/** Lenses present in `list`, in display order. */
/** Categories present in `list`, in display order. */
export function getCategories(
  list: readonly Project[] = projects,
): ProjectCategory[] {
  const present = new Set(list.map((project) => project.category));
  return CATEGORY_ORDER.filter((category) => present.has(category));
}

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
