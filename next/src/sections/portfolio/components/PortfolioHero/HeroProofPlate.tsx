import { portfolioData } from "@/sections/portfolio/data/portfolio.mock";
import type { PortfolioProject } from "@/sections/portfolio/types/portfolio.types";
import { HeroMetaLabel } from "@/sections/portfolio/components/PortfolioHero/HeroMetalLabe";
import { HeroInterfaceSketch } from "@/sections/portfolio/components/PortfolioHero/HeroInterfaceSketch";


export function HeroProofPlate({ project }: HeroProofPlateProps) {
    const service = project
        ? portfolioData.services.find(
            (currentService) => currentService.id === project.serviceId,
        )
        : undefined;

    if (!project) {
        return null;
    }

    return (
        <aside
            className="relative w-full lg:pt-[2px]"
            aria-label="Featured portfolio proof"
        >
            <div className="pointer-events-none absolute -left-8 top-0 hidden h-full w-px from-transparent via-white/10 to-transparent lg:block" />

            <div className="group relative">
                <div className="mb-5 grid grid-cols-[1fr_auto] items-center gap-6 pb-4">
                    {/* <HeroMetaLabel tone="accent">
                        01 / Featured proof
                    </HeroMetaLabel> */}

                    <HeroMetaLabel>{project.type}</HeroMetaLabel>
                </div>

                <div className="relative">
                    <HeroInterfaceSketch />
                </div>

                <div className="mt-8 border-t border-white/[0.08] pt-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/36">
                        {service?.label ?? "Service"}{" "}
                        <span className="text-orange/70">/</span>{" "}
                        {project.status}
                    </p>

                    <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-none tracking-[-0.055em] text-white sm:text-4xl">
                        {project.title}
                    </h2>

                    <p className="mt-4 max-w-xl text-sm leading-7 text-white/62 sm:text-base sm:leading-8">
                        {project.proofStatement}
                    </p>

                    <div className="mt-6 grid gap-4 border-t border-white/[0.08] pt-5 sm:grid-cols-[0.42fr_1fr]">
                        <HeroMetaLabel>What it proves</HeroMetaLabel>

                        <p className="text-sm leading-7 text-white/54">
                            The portfolio itself becomes a service-first system:
                            a way to connect offer, execution and evidence
                            without turning projects into decoration.
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

type HeroProofPlateProps = {
    project?: PortfolioProject;
};
