export type PortfolioLocale = "en" | "fr" | "de";

export type PortfolioServiceId =
  | "web-platforms"
  | "product-discovery-prototyping"
  | "automation-internal-tools"
  | "data-dashboards";

export type ProjectType =
  | "Website"
  | "Web Application"
  | "Internal Tool"
  | "Dashboard"
  | "Prototype"
  | "Automation"
  | "CMS Platform";

export type ProjectStatus =
  | "Live"
  | "Prototype"
  | "Internal"
  | "Concept"
  | "In progress";

export type CapabilityId =
  | "ux-strategy"
  | "ui-design"
  | "frontend-development"
  | "backend-integration"
  | "cms-architecture"
  | "automation"
  | "dashboard-design"
  | "data-visualization"
  | "rapid-prototyping"
  | "technical-discovery"
  | "responsive-design"
  | "performance"
  | "content-modeling";

export type PortfolioVisualKind =
  | "website-preview"
  | "dashboard-preview"
  | "cms-preview"
  | "prototype-preview"
  | "automation-flow"
  | "data-grid";

export type PortfolioService = {
  id: PortfolioServiceId;
  label: string;
  shortLabel: string;
  headline: string;
  description: string;
  proofAngle: string;
  capabilities: CapabilityId[];
  featuredProjectSlugs: string[];
};

export type PortfolioCapability = {
  id: CapabilityId;
  label: string;
  description: string;
};

export type PortfolioDeliverable = {
  label: string;
  description?: string;
};

export type PortfolioOutcome = {
  label: string;
  value?: string;
  description?: string;
};

export type PortfolioQuickFact = {
  label: string;
  value: string;
};

export type PortfolioNarrativeBlock = {
  title: string;
  body: string;
};

export type PortfolioVisual = {
  kind: PortfolioVisualKind;
  title: string;
  caption?: string;
};

export type PortfolioProject = {
  title: string;
  slug: string;

  serviceId: PortfolioServiceId;
  secondaryServiceIds?: PortfolioServiceId[];

  type: ProjectType;
  status: ProjectStatus;

  proofStatement: string;
  shortDescription: string;

  capabilities: CapabilityId[];
  deliverables: PortfolioDeliverable[];
  outcomes: PortfolioOutcome[];

  visual: PortfolioVisual;

  isFeatured?: boolean;
  featuredOrder?: number;

  caseStudy: {
    eyebrow: string;
    headline: string;
    summary: string;

    quickFacts: PortfolioQuickFact[];

    mission: PortfolioNarrativeBlock;
    context: PortfolioNarrativeBlock;
    challenge: PortfolioNarrativeBlock;
    response: PortfolioNarrativeBlock;
    approach: PortfolioNarrativeBlock;

    visualEvidence: PortfolioVisual[];

    stack: string[];

    whatThisProves: string[];

    relatedProjectSlugs: string[];
  };
};

export type PortfolioData = {
  services: PortfolioService[];
  capabilities: PortfolioCapability[];
  projects: PortfolioProject[];
};