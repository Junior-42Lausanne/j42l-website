import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { portfolioData } from "@/sections/portfolio/data/portfolio.mock";
import type { PortfolioProject } from "@/sections/portfolio/types/portfolio.types";
import { portfolioLayout } from "@/sections/portfolio/styles/portfolioStyles";

const readingSteps = [
    {
        index: "01",
        label: "Services",
        description: "Start from the business need.",
    },
    {
        index: "02",
        label: "Proofs",
        description: "See which projects validate it.",
    },
    {
        index: "03",
        label: "Case studies",
        description: "Inspect the work behind the claim.",
    },
];

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

type HeroMetaLabelProps = {
    children: React.ReactNode;
    tone?: "accent" | "muted";
};

function HeroMetaLabel({ children, tone = "muted" }: HeroMetaLabelProps) {
    return (
        <p
            className={[
                "text-[11px] font-semibold uppercase tracking-[0.28em]",
                tone === "accent" ? "text-orange" : "text-white/36",
            ].join(" ")}
        >
            {children}
        </p>
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

function HeroReadingRail() {
    return (
        <div className="mt-16 border-t border-white/[0.08] pt-6">
            <div className="grid gap-6 sm:grid-cols-3 sm:items-start">
                {readingSteps.map((step, index) => (
                    <div key={step.index} className="relative min-w-0">
                        {index < readingSteps.length - 1 ? (
                            <span
                                className="pointer-events-none absolute right-6 top-3 hidden h-px w-14 from-orange/50 to-transparent sm:block"
                                aria-hidden="true"
                            />
                        ) : null}

                        <div className="flex items-baseline gap-3">
                            <span className="text-xs font-semibold text-orange">
                                {step.index}
                            </span>

                            <p className="text-sm font-semibold text-white">
                                {step.label}
                            </p>
                        </div>

                        <p className="mt-3 max-w-[13rem] text-sm leading-6 text-white/46">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

type HeroProofPlateProps = {
    project?: PortfolioProject;
};

function HeroProofPlate({ project }: HeroProofPlateProps) {
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

// shadow-[0_30px_100px_rgba(0,0,0,0.34)]
function HeroInterfaceSketch() {
    return (
        <div className="relative min-h-[410px] w-full overflow-hidden rounded-[2.4rem] bg-[#211e18]/76 p-5 ring-1 ring-white/[0.07]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_42%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.055),transparent_30%)]" />

            <div className="relative flex min-h-[370px] flex-col">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-orange" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                    </div>

                    <div className="h-px w-32 bg-white/16 transition-[width,background-color] duration-700 ease-out group-hover:w-36 group-hover:bg-white/22" />

                    <div className="h-7 w-7 rounded-full bg-white/[0.06] ring-1 ring-white/10 transition-colors duration-700 ease-out group-hover:bg-white/[0.08]" />
                </div>

                <div className="relative mt-8 flex flex-1 items-stretch">
                    <div className="grid w-full grid-cols-[0.92fr_1.08fr] gap-5">
                        <div className="relative overflow-hidden rounded-[1.65rem] bg-[#17140f]/72 p-5 ring-1 ring-white/[0.07]">
                            <div className="hero-screen-pill h-2 w-20 origin-left rounded-full bg-orange/90" />

                            <div className="mt-7 space-y-3">
                                <div className="hero-screen-line-a h-3 w-11/12 origin-left rounded-full bg-white/24" />
                                <div className="hero-screen-line-b h-3 w-9/12 origin-left rounded-full bg-white/17" />
                                <div className="hero-screen-line-c h-3 w-7/12 origin-left rounded-full bg-white/12" />
                            </div>

                            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                                <div className="hero-screen-pill h-10 w-24 origin-left rounded-full bg-orange/85" />
                                <div className="h-px flex-1 bg-white/12 transition-colors duration-700 ease-out group-hover:bg-white/18" />
                            </div>
                        </div>

                        <div className="grid grid-rows-[1fr_0.65fr] gap-5">
                            <div className="grid grid-cols-[1fr_0.76fr] gap-5">
                                <div className="hero-screen-card-a rounded-[1.65rem] bg-white/[0.055] p-4 ring-1 ring-white/[0.07]">
                                    <div className="h-16 rounded-[1.2rem] bg-white/[0.07] transition-colors duration-700 ease-out group-hover:bg-white/[0.085]" />
                                    <div className="mt-4 h-2.5 w-3/4 rounded-full bg-white/18" />
                                    <div className="mt-2 h-2.5 w-1/2 rounded-full bg-white/10" />
                                </div>

                                <div className="hero-screen-card-b rounded-[1.65rem] bg-orange/[0.10] p-4 ring-1 ring-orange/25">
                                    <div className="h-16 rounded-[1.2rem] bg-orange/16 transition-colors duration-700 ease-out group-hover:bg-orange/20" />
                                    <div className="mt-4 h-2.5 w-4/5 rounded-full bg-orange/55" />
                                    <div className="mt-2 h-2.5 w-1/2 rounded-full bg-white/12" />
                                </div>
                            </div>

                            <div className="grid min-h-[112px] grid-cols-3 gap-4">
                                <div className="hero-screen-card-a h-full rounded-[1.35rem] bg-white/[0.055]" />
                                <div className="hero-screen-card-c h-full rounded-[1.35rem] bg-white/[0.04]" />
                                <div className="hero-screen-card-b h-full rounded-[1.35rem] bg-white/[0.06]" />
                            </div>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute -right-6 top-10 hidden h-[72%] w-px bg-gradient-to-b from-transparent via-orange/45 to-transparent sm:block" />

                    <div className="pointer-events-none absolute -right-10 top-12 hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-orange/70 [writing-mode:vertical-rl] sm:block">
                        service / proof / case
                    </div>
                </div>
            </div>
        </div>
    );
}