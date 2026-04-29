import type { PortfolioData } from "@/sections/portfolio/types/portfolio.types";

export const portfolioData: PortfolioData = {
  services: [
    {
      id: "web-platforms",
      label: "Web Platforms",
      shortLabel: "Web",
      headline: "Build credible, scalable web platforms for real business needs.",
      description:
        "From institutional websites to service platforms, J42L helps organizations turn their offer into clear, usable and maintainable web experiences.",
      proofAngle:
        "Projects in this service prove that J42L can structure content, design interfaces and ship production-ready web foundations.",
      capabilities: [
        "ux-strategy",
        "ui-design",
        "frontend-development",
        "cms-architecture",
        "responsive-design",
        "performance",
      ],
      featuredProjectSlugs: [
        "j42l-website-redesign",
        "local-commerce-platform",
        "association-member-portal",
      ],
    },
    {
      id: "product-discovery-prototyping",
      label: "Product Discovery & Prototyping",
      shortLabel: "Discovery",
      headline: "Clarify ideas before investing in full-scale development.",
      description:
        "J42L supports early-stage products with discovery workshops, UX flows, clickable prototypes and technical framing.",
      proofAngle:
        "Projects in this service show how J42L reduces uncertainty before committing budget to development.",
      capabilities: [
        "ux-strategy",
        "technical-discovery",
        "rapid-prototyping",
        "ui-design",
        "responsive-design",
      ],
      featuredProjectSlugs: [
        "startup-mvp-prototype",
        "sports-matchmaking-concept",
        "j42l-website-redesign",
      ],
    },
    {
      id: "automation-internal-tools",
      label: "Automation & Internal Tools",
      shortLabel: "Automation",
      headline: "Replace fragile manual workflows with useful internal tools.",
      description:
        "J42L designs and builds tools that help teams save time, reduce repetitive work and centralize operational processes.",
      proofAngle:
        "Projects in this service demonstrate J42L’s ability to understand operations and turn them into practical software.",
      capabilities: [
        "automation",
        "frontend-development",
        "backend-integration",
        "technical-discovery",
        "content-modeling",
      ],
      featuredProjectSlugs: [
        "association-member-portal",
        "operations-request-tracker",
        "local-commerce-platform",
      ],
    },
    {
      id: "data-dashboards",
      label: "Data & Dashboards",
      shortLabel: "Data",
      headline: "Turn scattered information into readable decision interfaces.",
      description:
        "J42L can help teams structure, visualize and interpret data through dashboards, reporting interfaces and decision-support tools.",
      proofAngle:
        "Projects in this service show how raw information can become useful, readable and actionable.",
      capabilities: [
        "dashboard-design",
        "data-visualization",
        "frontend-development",
        "technical-discovery",
        "responsive-design",
      ],
      featuredProjectSlugs: [
        "impact-dashboard",
        "operations-request-tracker",
        "startup-mvp-prototype",
      ],
    },
  ],

  capabilities: [
    {
      id: "ux-strategy",
      label: "UX Strategy",
      description:
        "Clarifying user journeys, priorities and information architecture before interface production.",
    },
    {
      id: "ui-design",
      label: "UI Design",
      description:
        "Designing polished, readable and conversion-oriented interfaces adapted to the product context.",
    },
    {
      id: "frontend-development",
      label: "Frontend Development",
      description:
        "Building responsive, maintainable interfaces with modern React and Next.js practices.",
    },
    {
      id: "backend-integration",
      label: "Backend Integration",
      description:
        "Connecting interfaces to APIs, CMS data models and operational backends.",
    },
    {
      id: "cms-architecture",
      label: "CMS Architecture",
      description:
        "Structuring content models so non-technical teams can manage pages and content safely.",
    },
    {
      id: "automation",
      label: "Automation",
      description:
        "Reducing repetitive tasks by designing flows, tools and process-oriented interfaces.",
    },
    {
      id: "dashboard-design",
      label: "Dashboard Design",
      description:
        "Creating readable dashboards focused on hierarchy, decision-making and operational clarity.",
    },
    {
      id: "data-visualization",
      label: "Data Visualization",
      description:
        "Turning metrics and structured information into understandable visual patterns.",
    },
    {
      id: "rapid-prototyping",
      label: "Rapid Prototyping",
      description:
        "Testing product ideas quickly through clickable, realistic and lightweight prototypes.",
    },
    {
      id: "technical-discovery",
      label: "Technical Discovery",
      description:
        "Framing technical constraints, risks and implementation paths before production.",
    },
    {
      id: "responsive-design",
      label: "Responsive Design",
      description:
        "Ensuring interfaces remain clear and usable across desktop, tablet and mobile.",
    },
    {
      id: "performance",
      label: "Performance",
      description:
        "Improving perceived speed, loading strategy and frontend efficiency.",
    },
    {
      id: "content-modeling",
      label: "Content Modeling",
      description:
        "Organizing information into reusable, structured and CMS-friendly content blocks.",
    },
  ],

  projects: [
    {
      title: "J42L Website Redesign",
      slug: "j42l-website-redesign",
      serviceId: "web-platforms",
      secondaryServiceIds: ["product-discovery-prototyping"],
      type: "",
      status: "In progress",
      proofStatement:
        "A service-first institutional website designed to turn J42L’s offer into clear proof of capability.",
      shortDescription:
        "A full redesign of the J42L website structure, visual direction and CMS-driven content architecture.",
      capabilities: [
        "ux-strategy",
        "ui-design",
        "frontend-development",
        "cms-architecture",
        "content-modeling",
        "responsive-design",
      ],
      deliverables: [
        {
          label: "Portfolio feature architecture",
          description:
            "A scalable structure connecting services, projects and case studies.",
        },
        {
          label: "Next.js frontend implementation",
          description:
            "A modular implementation prepared for CMS integration and future expansion.",
        },
        {
          label: "Strapi-ready content model",
          description:
            "A frontend data structure that can later be mapped to CMS entities.",
        },
      ],
      outcomes: [
        {
          label: "Clearer commercial positioning",
          description:
            "The portfolio becomes a proof system rather than a decorative project gallery.",
        },
        {
          label: "CMS-ready structure",
          description:
            "The feature can evolve toward Strapi without rewriting the frontend architecture.",
        },
      ],
      visual: {
        kind: "website-preview",
        title: "Service-first portfolio interface",
        caption:
          "A structured hub that connects J42L services to relevant project evidence.",
      },
      isFeatured: true,
      featuredOrder: 1,
      caseStudy: {
        eyebrow: "Web Platforms",
        headline:
          "Turning an institutional website into a proof-driven commercial platform.",
        summary:
          "The J42L website redesign reframes the portfolio as a strategic interface where services lead the exploration and projects validate credibility.",
        quickFacts: [
          { label: "Service", value: "Web Platforms" },
          { label: "Type", value: "" },
          { label: "Status", value: "In progress" },
          { label: "Core stack", value: "Next.js, React, Strapi" },
        ],
        mission: {
          title: "Mission",
          body: "Create a portfolio experience that helps prospects understand what J42L can deliver and why its team is credible for real digital projects.",
        },
        context: {
          title: "Context",
          body: "J42L needs to present its services clearly while showing concrete examples of execution. The previous direction risked becoming a generic project gallery without strong commercial meaning.",
        },
        challenge: {
          title: "Challenge",
          body: "The interface must stay premium and readable while connecting services, capabilities and projects without overwhelming the user.",
        },
        response: {
          title: "Response",
          body: "The portfolio is structured around services first, then featured proofs, then deeper case studies. This makes the user journey clearer and more commercially relevant.",
        },
        approach: {
          title: "Approach",
          body: "The frontend is designed with typed mock data, modular sections, reusable visual primitives and a future Strapi integration path.",
        },
        visualEvidence: [
          {
            kind: "website-preview",
            title: "Portfolio hub",
            caption:
              "Service-first navigation with highlighted proof-driven case studies.",
          },
          {
            kind: "cms-preview",
            title: "CMS-ready content structure",
            caption:
              "A content model prepared for projects, services, capabilities and case studies.",
          },
        ],
        stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Strapi"],
        whatThisProves: [
          "J42L can translate a commercial strategy into a structured digital interface.",
          "J42L can design frontend architecture that anticipates CMS integration.",
          "J42L can create a portfolio that sells services through concrete proof.",
        ],
        relatedProjectSlugs: [
          "local-commerce-platform",
          "startup-mvp-prototype",
          "association-member-portal",
        ],
      },
    },

    {
      title: "Local Commerce Platform",
      slug: "local-commerce-platform",
      serviceId: "web-platforms",
      secondaryServiceIds: ["automation-internal-tools"],
      type: "Web Application",
      status: "Concept",
      proofStatement:
        "A local business platform showing how a simple website can evolve into an operational tool.",
      shortDescription:
        "A commerce-oriented web platform concept with product presentation, requests and admin-ready workflows.",
      capabilities: [
        "ui-design",
        "frontend-development",
        "backend-integration",
        "responsive-design",
        "content-modeling",
      ],
      deliverables: [
        { label: "Responsive web interface" },
        { label: "Request workflow" },
        { label: "Admin-ready content structure" },
      ],
      outcomes: [
        {
          label: "Better lead qualification",
          description:
            "The platform helps convert casual visitors into clearer business requests.",
        },
      ],
      visual: {
        kind: "website-preview",
        title: "Commerce platform mockup",
        caption:
          "A structured web interface for services, products and customer requests.",
      },
      isFeatured: true,
      featuredOrder: 2,
      caseStudy: {
        eyebrow: "Web Platforms",
        headline:
          "Helping local businesses move from static presence to digital operations.",
        summary:
          "This concept demonstrates how a local business website can become a practical service and request platform.",
        quickFacts: [
          { label: "Service", value: "Web Platforms" },
          { label: "Type", value: "Web Application" },
          { label: "Status", value: "Concept" },
          { label: "Focus", value: "Local business operations" },
        ],
        mission: {
          title: "Mission",
          body: "Design a platform that helps a local business present its offer and receive structured client requests.",
        },
        context: {
          title: "Context",
          body: "Many local businesses need more than a visual website. They need a simple operational interface that helps them manage demand.",
        },
        challenge: {
          title: "Challenge",
          body: "The interface must stay approachable for a small business while leaving room for future features.",
        },
        response: {
          title: "Response",
          body: "The platform is structured around service clarity, customer actions and an admin-ready content model.",
        },
        approach: {
          title: "Approach",
          body: "The concept uses reusable page sections, clear CTAs and a content hierarchy that can be connected to a CMS.",
        },
        visualEvidence: [
          {
            kind: "website-preview",
            title: "Service landing page",
          },
          {
            kind: "automation-flow",
            title: "Request workflow",
          },
        ],
        stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        whatThisProves: [
          "J42L can design interfaces for practical business workflows.",
          "J42L can create web platforms that go beyond static presentation.",
          "J42L can prepare frontend structures for future operational features.",
        ],
        relatedProjectSlugs: [
          "j42l-website-redesign",
          "operations-request-tracker",
          "association-member-portal",
        ],
      },
    },

    {
      title: "Association Member Portal",
      slug: "association-member-portal",
      serviceId: "automation-internal-tools",
      secondaryServiceIds: ["web-platforms"],
      type: "Internal Tool",
      status: "Prototype",
      proofStatement:
        "A member portal prototype showing how internal processes can be centralized into one clear interface.",
      shortDescription:
        "A member management interface for associations with profiles, requests and operational status tracking.",
      capabilities: [
        "automation",
        "frontend-development",
        "backend-integration",
        "content-modeling",
        "responsive-design",
      ],
      deliverables: [
        { label: "Member dashboard" },
        { label: "Request management flow" },
        { label: "Role-oriented interface structure" },
      ],
      outcomes: [
        {
          label: "Reduced operational friction",
          description:
            "Common member requests become easier to follow and manage.",
        },
      ],
      visual: {
        kind: "cms-preview",
        title: "Member portal interface",
        caption:
          "A structured internal tool for profiles, requests and team coordination.",
      },
      isFeatured: true,
      featuredOrder: 3,
      caseStudy: {
        eyebrow: "Automation & Internal Tools",
        headline:
          "Centralizing association workflows into a member-focused internal portal.",
        summary:
          "This prototype shows how associations can reduce scattered communication by moving recurring workflows into a dedicated interface.",
        quickFacts: [
          { label: "Service", value: "Automation & Internal Tools" },
          { label: "Type", value: "Internal Tool" },
          { label: "Status", value: "Prototype" },
          { label: "Focus", value: "Member operations" },
        ],
        mission: {
          title: "Mission",
          body: "Create a clear interface where members and administrators can manage recurring requests and operational information.",
        },
        context: {
          title: "Context",
          body: "Associations often manage workflows through messages, spreadsheets and manual coordination.",
        },
        challenge: {
          title: "Challenge",
          body: "The tool must be simple enough for non-technical users while still supporting structured operations.",
        },
        response: {
          title: "Response",
          body: "The prototype groups profiles, requests and statuses into a dashboard-like interface.",
        },
        approach: {
          title: "Approach",
          body: "The interface is built around operational clarity, role-based priorities and reusable workflow patterns.",
        },
        visualEvidence: [
          {
            kind: "cms-preview",
            title: "Member management screen",
          },
          {
            kind: "data-grid",
            title: "Request tracking table",
          },
        ],
        stack: ["React", "TypeScript", "Tailwind CSS"],
        whatThisProves: [
          "J42L can transform scattered processes into structured tools.",
          "J42L can design internal interfaces for non-technical teams.",
          "J42L can prototype operational workflows before full backend development.",
        ],
        relatedProjectSlugs: [
          "operations-request-tracker",
          "local-commerce-platform",
          "j42l-website-redesign",
        ],
      },
    },

    {
      title: "Startup MVP Prototype",
      slug: "startup-mvp-prototype",
      serviceId: "product-discovery-prototyping",
      secondaryServiceIds: ["web-platforms"],
      type: "Prototype",
      status: "Prototype",
      proofStatement:
        "A clickable MVP prototype that helps validate product direction before engineering investment.",
      shortDescription:
        "A product discovery prototype with user flows, interface structure and technical assumptions.",
      capabilities: [
        "ux-strategy",
        "rapid-prototyping",
        "technical-discovery",
        "ui-design",
        "responsive-design",
      ],
      deliverables: [
        { label: "Clickable prototype" },
        { label: "Core user journey" },
        { label: "Technical framing notes" },
      ],
      outcomes: [
        {
          label: "Reduced product uncertainty",
          description:
            "The concept can be discussed, tested and refined before production development.",
        },
      ],
      visual: {
        kind: "prototype-preview",
        title: "MVP prototype preview",
        caption:
          "A lightweight interface used to test flows and product assumptions.",
      },
      caseStudy: {
        eyebrow: "Product Discovery & Prototyping",
        headline:
          "Validating a product idea through a focused MVP prototype.",
        summary:
          "This project demonstrates how early product uncertainty can be reduced through structured discovery and realistic interface prototyping.",
        quickFacts: [
          { label: "Service", value: "Product Discovery & Prototyping" },
          { label: "Type", value: "Prototype" },
          { label: "Status", value: "Prototype" },
          { label: "Focus", value: "MVP validation" },
        ],
        mission: {
          title: "Mission",
          body: "Help a startup clarify its first product experience before investing in a complete build.",
        },
        context: {
          title: "Context",
          body: "Early-stage products often need concrete interfaces to align stakeholders and validate assumptions.",
        },
        challenge: {
          title: "Challenge",
          body: "The prototype must feel realistic without becoming a full production build.",
        },
        response: {
          title: "Response",
          body: "The MVP is framed around the core journey, key screens and technical risks.",
        },
        approach: {
          title: "Approach",
          body: "The work combines UX framing, interface prototyping and technical discovery notes.",
        },
        visualEvidence: [
          {
            kind: "prototype-preview",
            title: "Clickable flow preview",
          },
          {
            kind: "website-preview",
            title: "Landing concept",
          },
        ],
        stack: ["Figma", "React", "TypeScript"],
        whatThisProves: [
          "J42L can support early-stage product thinking.",
          "J42L can prototype quickly without losing technical realism.",
          "J42L can help teams make better build-or-refine decisions.",
        ],
        relatedProjectSlugs: [
          "sports-matchmaking-concept",
          "j42l-website-redesign",
          "local-commerce-platform",
        ],
      },
    },

    {
      title: "Operations Request Tracker",
      slug: "operations-request-tracker",
      serviceId: "automation-internal-tools",
      secondaryServiceIds: ["data-dashboards"],
      type: "Automation",
      status: "Concept",
      proofStatement:
        "A request tracking interface showing how operational visibility can replace scattered follow-ups.",
      shortDescription:
        "A workflow-oriented interface for tracking requests, priorities, statuses and ownership.",
      capabilities: [
        "automation",
        "dashboard-design",
        "frontend-development",
        "data-visualization",
        "technical-discovery",
      ],
      deliverables: [
        { label: "Request board" },
        { label: "Status workflow" },
        { label: "Operational overview" },
      ],
      outcomes: [
        {
          label: "More visible operations",
          description:
            "Teams can quickly understand what is pending, blocked or completed.",
        },
      ],
      visual: {
        kind: "automation-flow",
        title: "Operational request flow",
        caption:
          "A clear workflow view for request ownership, status and priority.",
      },
      caseStudy: {
        eyebrow: "Automation & Internal Tools",
        headline:
          "Replacing scattered follow-ups with a structured request tracker.",
        summary:
          "This concept shows how a lightweight internal tool can bring clarity to recurring operational requests.",
        quickFacts: [
          { label: "Service", value: "Automation & Internal Tools" },
          { label: "Type", value: "Automation" },
          { label: "Status", value: "Concept" },
          { label: "Focus", value: "Workflow visibility" },
        ],
        mission: {
          title: "Mission",
          body: "Create a simple interface to follow operational requests from submission to completion.",
        },
        context: {
          title: "Context",
          body: "Teams often lose time because requests are spread across chats, emails and informal notes.",
        },
        challenge: {
          title: "Challenge",
          body: "The tracker must make the workflow visible without becoming heavy project management software.",
        },
        response: {
          title: "Response",
          body: "The interface focuses on request state, priority, ownership and next action.",
        },
        approach: {
          title: "Approach",
          body: "The concept uses a board, status indicators and lightweight dashboard patterns.",
        },
        visualEvidence: [
          {
            kind: "automation-flow",
            title: "Workflow board",
          },
          {
            kind: "dashboard-preview",
            title: "Operational overview",
          },
        ],
        stack: ["React", "TypeScript", "Tailwind CSS"],
        whatThisProves: [
          "J42L can simplify operational complexity.",
          "J42L can design tools that improve visibility and accountability.",
          "J42L can combine automation logic with clear interface design.",
        ],
        relatedProjectSlugs: [
          "association-member-portal",
          "impact-dashboard",
          "local-commerce-platform",
        ],
      },
    },

    {
      title: "Impact Dashboard",
      slug: "impact-dashboard",
      serviceId: "data-dashboards",
      secondaryServiceIds: ["automation-internal-tools"],
      type: "Dashboard",
      status: "Concept",
      proofStatement:
        "A dashboard concept demonstrating how project activity can become readable performance insight.",
      shortDescription:
        "A reporting dashboard for tracking activity, outcomes and operational indicators.",
      capabilities: [
        "dashboard-design",
        "data-visualization",
        "frontend-development",
        "technical-discovery",
        "responsive-design",
      ],
      deliverables: [
        { label: "Dashboard interface" },
        { label: "Metric hierarchy" },
        { label: "Visual reporting system" },
      ],
      outcomes: [
        {
          label: "Clearer decision-making",
          description:
            "Important metrics become easier to read, compare and discuss.",
        },
      ],
      visual: {
        kind: "dashboard-preview",
        title: "Impact dashboard mockup",
        caption:
          "A dashboard structure for metrics, trends and operational signals.",
      },
      caseStudy: {
        eyebrow: "Data & Dashboards",
        headline:
          "Making project impact readable through a focused dashboard interface.",
        summary:
          "This dashboard concept shows how teams can transform scattered indicators into a clear decision-support interface.",
        quickFacts: [
          { label: "Service", value: "Data & Dashboards" },
          { label: "Type", value: "Dashboard" },
          { label: "Status", value: "Concept" },
          { label: "Focus", value: "Impact reporting" },
        ],
        mission: {
          title: "Mission",
          body: "Design a dashboard that helps teams understand activity, outcomes and performance signals.",
        },
        context: {
          title: "Context",
          body: "Data is often available but hard to interpret because it is scattered across tools or presented without hierarchy.",
        },
        challenge: {
          title: "Challenge",
          body: "The dashboard must show useful information without overwhelming users with too many metrics.",
        },
        response: {
          title: "Response",
          body: "The interface prioritizes key indicators, visual grouping and readable comparison patterns.",
        },
        approach: {
          title: "Approach",
          body: "The dashboard is structured around hierarchy, signal clarity and modular data cards.",
        },
        visualEvidence: [
          {
            kind: "dashboard-preview",
            title: "Metric overview",
          },
          {
            kind: "data-grid",
            title: "Structured data table",
          },
        ],
        stack: ["React", "TypeScript", "Tailwind CSS"],
        whatThisProves: [
          "J42L can design dashboards that prioritize readability.",
          "J42L can turn raw indicators into decision-oriented interfaces.",
          "J42L can support future data-driven services.",
        ],
        relatedProjectSlugs: [
          "operations-request-tracker",
          "startup-mvp-prototype",
          "association-member-portal",
        ],
      },
    },

    {
      title: "Sports Matchmaking Concept",
      slug: "sports-matchmaking-concept",
      serviceId: "product-discovery-prototyping",
      secondaryServiceIds: ["data-dashboards"],
      type: "Prototype",
      status: "Concept",
      proofStatement:
        "A product concept showing how location, competition and social interaction can become a coherent user flow.",
      shortDescription:
        "A sports-oriented matchmaking concept with user flows for match creation, discovery and participation.",
      capabilities: [
        "ux-strategy",
        "rapid-prototyping",
        "ui-design",
        "technical-discovery",
        "responsive-design",
      ],
      deliverables: [
        { label: "Product flow" },
        { label: "Match creation prototype" },
        { label: "Interface concept" },
      ],
      outcomes: [
        {
          label: "Clearer product direction",
          description:
            "The product idea becomes easier to test, explain and prioritize.",
        },
      ],
      visual: {
        kind: "prototype-preview",
        title: "Sports matchmaking flow",
        caption:
          "A concept interface for creating, joining and managing local sport matches.",
      },
      caseStudy: {
        eyebrow: "Product Discovery & Prototyping",
        headline:
          "Structuring a sport-based social product into testable user flows.",
        summary:
          "This concept explores how social discovery, local sports and competitive interaction can be shaped into a coherent product experience.",
        quickFacts: [
          { label: "Service", value: "Product Discovery & Prototyping" },
          { label: "Type", value: "Prototype" },
          { label: "Status", value: "Concept" },
          { label: "Focus", value: "Social sports product" },
        ],
        mission: {
          title: "Mission",
          body: "Turn a broad product idea into a set of clear user flows and interface priorities.",
        },
        context: {
          title: "Context",
          body: "Location-based social products need strong interaction design because users must quickly understand who, where and why to join.",
        },
        challenge: {
          title: "Challenge",
          body: "The experience must balance discovery, trust, competition and simplicity.",
        },
        response: {
          title: "Response",
          body: "The concept focuses on match creation, sport selection, local discovery and player participation.",
        },
        approach: {
          title: "Approach",
          body: "The prototype breaks the product into flows that can be tested independently before full implementation.",
        },
        visualEvidence: [
          {
            kind: "prototype-preview",
            title: "Match creation flow",
          },
          {
            kind: "website-preview",
            title: "Discovery interface",
          },
        ],
        stack: ["Figma", "React", "Flutter-ready thinking"],
        whatThisProves: [
          "J42L can clarify complex product ideas.",
          "J42L can design flows before committing to full development.",
          "J42L can connect UX strategy with technical product framing.",
        ],
        relatedProjectSlugs: [
          "startup-mvp-prototype",
          "impact-dashboard",
          "j42l-website-redesign",
        ],
      },
    },
  ],
};