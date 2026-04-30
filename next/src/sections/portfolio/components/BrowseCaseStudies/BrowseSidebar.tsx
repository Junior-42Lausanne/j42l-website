import { portfolioData } from "@/sections/portfolio/data/portfolio.mock";
import type {
    PortfolioProject,
    PortfolioServiceId,
} from "@/sections/portfolio/types/portfolio.types";
import { portfolioText } from "@/sections/portfolio/styles/portfolioStyles";

import { FilterButton } from "./FilterButton";
import type { BrowseFilter } from "./types";
import {
    countProjectsForService,
    formatIndex,
} from "./utils/browseCaseStudies.utils";

type BrowseSidebarProps = {
    activeFilter: BrowseFilter;
    activeProject?: PortfolioProject;
    activeProjectIndex: number;
    projectsCount: number;
    onChangeFilter: (filter: BrowseFilter) => void;
};

export function BrowseSidebar({
    activeFilter,
    activeProject,
    activeProjectIndex,
    projectsCount,
    onChangeFilter,
}: BrowseSidebarProps) {
    return (
        <aside className="lg:sticky lg:top-28">
            <span className={portfolioText.eyebrow}>
                Browse all case studies
            </span>

            <h2 className={`${portfolioText.h2} mt-4`}>
                Explore the complete proof system.
            </h2>

            <p className={`${portfolioText.body} mt-5 max-w-md`}>
                Browse the full set of case studies through a vertical proof
                deck: one case at a time, connected to the service it validates.
            </p>

            <div className="mt-8 border-t border-white/10 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/36">
                    Filter by service
                </p>

                <div className="mt-5 space-y-1">
                    <FilterButton
                        label="All case studies"
                        count={portfolioData.projects.length}
                        isActive={activeFilter === "all"}
                        onClick={() => onChangeFilter("all")}
                    />

                    {portfolioData.services.map((service) => (
                        <FilterButton
                            key={service.id}
                            label={service.shortLabel}
                            count={countProjectsForService(
                                service.id as PortfolioServiceId,
                            )}
                            isActive={activeFilter === service.id}
                            onClick={() => onChangeFilter(service.id)}
                        />
                    ))}
                </div>
            </div>

            {activeProject ? (
                <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/36">
                        Current project
                    </p>

                    <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                        {activeProject.title}
                    </p>

                    <p className="mt-2 text-sm text-white/44">
                        {formatIndex(activeProjectIndex)} /{" "}
                        {String(projectsCount).padStart(2, "0")}
                    </p>
                </div>
            ) : null}
        </aside>
    );
}