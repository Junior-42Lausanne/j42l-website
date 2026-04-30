
import { portfolioData } from "@/sections/portfolio/data/portfolio.mock";
import { portfolioLayout } from "@/sections/portfolio/styles/portfolioStyles";
import { HeroProofPlate } from "@/sections/portfolio/components/PortfolioHero/HeroProofPlate";
import { HeroMetaLabel } from "@/sections/portfolio/components/PortfolioHero/HeroMetalLabe";
import { HeroReadingRail } from "@/sections/portfolio/components/PortfolioHero/HeroReadingRail";
import { HeroPrimaryAction, HeroSecondaryAction } from "@/sections/portfolio/components/PortfolioHero/Action";

export function PortfolioHero() {
    const featuredProject =
        portfolioData.projects.find(
            (project) => project.slug === "j42l-website-redesign",
        ) ?? portfolioData.projects[0];

    return (
        <section
            className={[
                portfolioLayout.section,
                "overflow-hidden lg:py-24",
            ].join(" ")}
        >
            <div className="relative mx-auto w-full max-w-[96rem]">
                <div className="pointer-events-none absolute -left-16 top-10 hidden h-[420px] w-[420px] rounded-full bg-orange/[0.045] blur-3xl lg:block" />
                {/* <div className="pointer-events-none absolute right-0 top-0 hidden h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" /> */}

                <div className="relative grid gap-14 lg:grid-cols-[minmax(0,0.94fr)_minmax(440px,0.82fr)] lg:items-start lg:gap-16 xl:gap-20">
                    <div className="max-w-[52rem]">
                        <HeroMetaLabel tone="accent">
                            Portfolio
                        </HeroMetaLabel>

                        <h1 className="mt-6 max-w-[10.8ch] text-[clamp(4rem,8vw,7.8rem)] font-semibold leading-[0.86] tracking-[-0.085em] text-white">
                            Projects are not the point. Proof is.
                        </h1>

                        <p className="mt-8 max-w-2xl text-base leading-8 text-white/68 sm:text-lg sm:leading-9">
                            Explore J42L work through the services it validates:
                            web platforms, product discovery, internal tools and
                            data interfaces. The portfolio is built to show what
                            can be delivered, not just what can be displayed.
                        </p>

                        <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
                            <HeroPrimaryAction href="#featured-case-studies">
                                View selected proofs
                            </HeroPrimaryAction>

                            <HeroSecondaryAction href="#services">
                                Explore services
                            </HeroSecondaryAction>
                        </div>

                        <HeroReadingRail />
                    </div>

                    <HeroProofPlate project={featuredProject} />
                </div>
            </div>
        </section>
    );
}
