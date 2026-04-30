import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { portfolioData } from "@/sections/portfolio/data/portfolio.mock";
import type { PortfolioProject } from "@/sections/portfolio/types/portfolio.types";
import { portfolioLayout } from "@/sections/portfolio/styles/portfolioStyles";
import {HeroInterfaceSketch} from "@/sections/portfolio/components/PortfolioHero/HeroInterfaceSketch";
import {HeroProofPlate} from "@/sections/portfolio/components/PortfolioHero/HeroProofPlate";
import {HeroMetaLabel} from "@/sections/portfolio/components/PortfolioHero/HeroMetalLabe";
import {HeroReadingRail} from "@/sections/portfolio/components/PortfolioHero/HeroReadingRail";

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

type HeroActionProps = {
    href: string;
    children: React.ReactNode;
};

function HeroPrimaryAction({ href, children }: HeroActionProps) {
    return (
        <Link
            href={href}
            className={[
                "group relative inline-flex h-12 w-fit items-center overflow-hidden rounded-full bg-orange px-6 text-sm font-semibold text-[#14120e]",
                "transition duration-500 ease-out hover:-translate-y-0.5 hover:bg-[#ffad3d]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#181612]",
            ].join(" ")}
        >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.46),transparent)] transition duration-700 ease-out group-hover:translate-x-full" />

            <span className="relative flex items-center transition duration-500 ease-out group-hover:translate-x-0.5">
                {children}
                <ArrowRight
                    className="ml-3 h-4 w-4 transition duration-500 ease-out group-hover:translate-x-1.5"
                    aria-hidden="true"
                />
            </span>
        </Link>
    );
}

function HeroSecondaryAction({ href, children }: HeroActionProps) {
    return (
        <Link
            href={href}
            className={[
                "group relative inline-flex h-12 w-fit items-center gap-3 text-sm font-semibold text-white/76",
                "transition duration-500 ease-out hover:text-white",
                "after:absolute after:bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-orange/80 after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#181612]",
            ].join(" ")}
        >
            <span>{children}</span>
            <ArrowRight
                className="h-4 w-4 opacity-50 transition duration-500 ease-out group-hover:translate-x-1 group-hover:opacity-100"
                aria-hidden="true"
            />
        </Link>
    );
}

