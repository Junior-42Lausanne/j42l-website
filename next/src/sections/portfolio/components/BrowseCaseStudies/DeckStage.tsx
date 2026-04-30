import type {
    PortfolioLocale,
    PortfolioProject,
} from "@/sections/portfolio/types/portfolio.types";

import { ProjectDeckCard } from "./ProjectDeckCard";

type DeckStageProps = {
    projects: PortfolioProject[];
    activeIndex: number;
    locale: PortfolioLocale;
};

export function DeckStage({
    projects,
    activeIndex,
    locale,
}: DeckStageProps) {
    if (!projects.length) {
        return (
            <div className="flex h-full items-center justify-center border-y border-white/10">
                <p className="text-sm text-white/46">
                    No case study available for this filter.
                </p>
            </div>
        );
    }

    return (
        <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-[#15120e]/72 ring-1 ring-white/[0.055] shadow-[0_18px_70px_rgba(0,0,0,0.18)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(244,152,25,0.045),transparent_30%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.016),transparent_22%,transparent_78%,rgba(0,0,0,0.18))]" />

            <div
                className="relative z-10 flex h-full flex-col transition-transform duration-[760ms] ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none"
                style={{
                    transform: `translate3d(0, -${activeIndex * 100}%, 0)`,
                    willChange: "transform",
                }}
                aria-label="Case studies vertical carousel"
            >
                {projects.map((project, index) => (
                    <section
                        key={project.slug}
                        className="h-full shrink-0"
                        aria-hidden={index !== activeIndex}
                    >
                        <ProjectDeckCard
                            project={project}
                            locale={locale}
                            index={index}
                            isCurrent={index === activeIndex}
                        />
                    </section>
                ))}
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 bg-gradient-to-b from-[#15120e]/70 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-[#15120e]/84 to-transparent" />
        </div>
    );
}