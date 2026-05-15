import type {
    PortfolioLocale,
    PortfolioProject,
    PortfolioServiceId,
} from "@/sections/portfolio/types/portfolio.types";

export type BrowseFilter = "all" | PortfolioServiceId;

export type FilterTransitionState =
    | "idle"
    | "leaving"
    | "entering-prep"
    | "entering";

export type BrowseCaseStudiesProps = {
    locale?: PortfolioLocale;
};

export type ActiveProjectSummaryProps = {
    activeProject?: PortfolioProject;
    activeProjectIndex: number;
    projectsCount: number;
};