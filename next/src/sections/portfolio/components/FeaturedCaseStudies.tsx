import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { PortfolioVisualMockup } from "@/sections/portfolio/components/PortfolioVisualMockup";
import { portfolioData } from "@/sections/portfolio/data/portfolio.mock";
import type {
    PortfolioLocale,
    PortfolioProject,
    PortfolioServiceId,
} from "@/sections/portfolio/types/portfolio.types";
import {
    portfolioLayout,
    portfolioText,
} from "@/sections/portfolio/styles/portfolioStyles";

type FeaturedCaseStudiesProps = {
    locale?: PortfolioLocale;
};

export function FeaturedCaseStudies({
    locale = "en",
}: FeaturedCaseStudiesProps) {
    const featuredProjects = portfolioData.projects
        .filter((project) => project.isFeatured)
        .sort(sortFeaturedProjects)
        .slice(0, 3);

    const primaryProject = featuredProjects[0];
    const secondaryProjects = featuredProjects.slice(1, 3);

    if (!primaryProject) {
        return null;
    }

    return (
        <section
            id="featured-case-studies"
            className={portfolioLayout.section}
        >
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.72fr_0.78fr] lg:items-end">
                <div>
                    <span className={portfolioText.eyebrow}>
                        Selected work
                    </span>

                    <h2 className={`${portfolioText.h2} mt-4 max-w-3xl`}>
                        Proof through work, not explanation.
                    </h2>
                </div>

                <p className={`${portfolioText.body} max-w-xl lg:justify-self-end`}>
                    A focused selection of projects showing what J42L can design,
                    build and deliver across web platforms, tools and product systems.
                </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
                <FeaturedWorkCard
                    project={primaryProject}
                    serviceLabel={getServiceLabel(primaryProject.serviceId)}
                    locale={locale}
                    variant="large"
                />

                <div className="grid gap-5">
                    {secondaryProjects.map((project) => (
                        <FeaturedWorkCard
                            key={project.slug}
                            project={project}
                            serviceLabel={getServiceLabel(project.serviceId)}
                            locale={locale}
                            variant="compact"
                        />
                    ))}
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <Link
                    href="#browse-case-studies"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-white/58 transition hover:text-orange"
                >
                    View all work
                    <ArrowRight
                        className="h-4 w-4 transition group-hover:translate-x-1"
                        aria-hidden="true"
                    />
                </Link>
            </div>
        </section>
    );
}

type FeaturedWorkCardProps = {
    project: PortfolioProject;
    serviceLabel: string;
    locale: PortfolioLocale;
    variant: "large" | "compact";
};

function FeaturedWorkCard({
    project,
    serviceLabel,
    locale,
    variant,
}: FeaturedWorkCardProps) {
    const href = `/${locale}/portfolio/${project.slug}`;
    const isLarge = variant === "large";

    return (
        <Link
            href={href}
            // Jouer sur avec la className juste en dessous, partie concernée --> "border border-white/[0.075] bg-[#211e18]"
            className={[
                "group relative block overflow-hidden rounded-[2.25rem] border border-white/[0.075] bg-[#211e18]",
                "transition duration-500 ease-out hover:border-orange/35",
                isLarge
                    ? "min-h-[720px]"
                    : "min-h-[350px] lg:min-h-[350px]",
            ].join(" ")}
        >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(244,152,25,0.10),transparent_34%,rgba(255,255,255,0.025))] opacity-70 transition duration-500 group-hover:opacity-100" />

            <div
                className={[
                    "relative grid h-full gap-0",
                    isLarge
                        ? "grid-rows-[1fr_auto]"
                        : "grid-cols-[0.95fr_1.05fr]",
                ].join(" ")}
            >
                <div
                    className={[
                        "relative overflow-hidden",
                        isLarge ? "min-h-[420px]" : "min-h-full",
                    ].join(" ")}
                >
                    <PortfolioVisualMockup
                        kind={project.visual.kind}
                        title={project.visual.title}
                        className={[
                            "h-full min-h-full rounded-none border-0 bg-transparent",
                            isLarge ? "p-6" : "p-4",
                        ].join(" ")}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(18,15,11,0.16)_58%,rgba(18,15,11,0.86)_100%)]" />
                </div>

                <div
                    className={[
                        "relative z-10 flex flex-col justify-between",
                        isLarge
                            ? "border-t border-white/10 p-7 sm:p-8"
                            : "border-l border-white/10 p-5 sm:p-6",
                    ].join(" ")}
                >
                    <div>
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange">
                                {serviceLabel}
                            </p>

                            <ArrowUpRight
                                className="h-4 w-4 text-white/32 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange"
                                aria-hidden="true"
                            />
                        </div>

                        <h3
                            className={[
                                "mt-5 font-semibold tracking-[-0.055em] text-white",
                                isLarge
                                    ? "max-w-[11ch] text-5xl leading-[0.95] sm:text-6xl lg:text-[4.7rem]"
                                    : "text-3xl leading-[1] sm:text-4xl",
                            ].join(" ")}
                        >
                            {project.title}
                        </h3>
                    </div>

                    <div className={isLarge ? "mt-10" : "mt-8"}>
                        <p
                            className={[
                                "overflow-hidden leading-7 text-white/62",
                                isLarge ? "max-w-xl text-base sm:text-lg" : "text-sm",
                            ].join(" ")}
                            style={{
                                display: "-webkit-box",
                                WebkitLineClamp: isLarge ? 2 : 3,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {project.proofStatement}
                        </p>

                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-white/48 transition group-hover:text-orange">
                            Open case
                            <ArrowRight
                                className="h-4 w-4 transition group-hover:translate-x-1"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function sortFeaturedProjects(
    firstProject: PortfolioProject,
    secondProject: PortfolioProject,
) {
    return (
        (firstProject.featuredOrder ?? 999) -
        (secondProject.featuredOrder ?? 999)
    );
}

function getServiceLabel(serviceId: PortfolioServiceId) {
    const service = portfolioData.services.find(
        (currentService) => currentService.id === serviceId,
    );

    if (!service) {
        return "Service";
    }

    if (service.label.length > 22) {
        return service.shortLabel;
    }

    return service.label;
}