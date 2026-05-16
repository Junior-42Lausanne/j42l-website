import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { portfolioData } from "@/sections/portfolio/data/portfolio.mock";
import type {
    PortfolioLocale,
    PortfolioProject,
    PortfolioService,
    PortfolioServiceId,
} from "@/sections/portfolio/types/portfolio.types";
import {
    portfolioLayout,
    portfolioText,
} from "@/sections/portfolio/styles/portfolioStyles";

type PortfolioServiceExplorerProps = {
    locale?: PortfolioLocale;
};

export function PortfolioServiceExplorer({
    locale = "en",
}: PortfolioServiceExplorerProps) {
    return (
        <section id="services" className={portfolioLayout.section}>
            <div className="mb-14 grid gap-6 lg:grid-cols-[0.72fr_0.78fr] lg:items-end">
                <div>
                    <span className={portfolioText.eyebrow}>
                        Services
                    </span>

                    <h2 className={`${portfolioText.h2} mt-4 max-w-3xl`}>
                        What J42L builds.
                    </h2>
                </div>

                <p className={`${portfolioText.body} max-w-xl lg:justify-self-end`}>
                    Digital services shaped around useful interfaces, clear systems and
                    production-ready execution.
                </p>
            </div>

            <div className="border-y border-white/10">
                {portfolioData.services.map((service, index) => (
                    <ServiceRow
                        key={service.id}
                        service={service}
                        index={index}
                        locale={locale}
                    />
                ))}
            </div>
        </section>
    );
}

type ServiceRowProps = {
    service: PortfolioService;
    index: number;
    locale: PortfolioLocale;
};

function ServiceRow({
    service,
    index,
    locale,
}: ServiceRowProps) {
    const capabilities = getServiceCapabilities(service).slice(0, 4);
    const proofProjects = getServiceProofProjects(service).slice(0, 2);

    return (
        <article className="group grid gap-8 border-b border-white/10 py-10 last:border-b-0 lg:grid-cols-[0.16fr_0.44fr_0.4fr] lg:items-start lg:py-14">
            <div className="flex items-center gap-4 lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange">
                    {String(index + 1).padStart(2, "0")}
                </p>

                <div className="h-px flex-1 bg-white/10 lg:mt-6 lg:w-14" />
            </div>

            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/34">
                    {service.shortLabel}
                </p>

                <h3 className="mt-4 max-w-[12ch] text-4xl font-semibold leading-[0.95] tracking-[-0.055em] text-white sm:text-5xl lg:text-[4rem]">
                    {getShortServiceTitle(service.id)}
                </h3>
            </div>

            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] lg:grid-cols-1 xl:grid-cols-[0.9fr_1.1fr]">
                <div>
                    <p className="max-w-md text-base leading-7 text-white/62">
                        {getShortServiceDescription(service.id)}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                        {capabilities.map((capability) => (
                            <span
                                key={capability.id}
                                className="text-sm font-medium text-white/44 transition group-hover:text-white/58"
                            >
                                {capability.label}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/34">
                        Related work
                    </p>

                    <div className="mt-4 space-y-3">
                        {proofProjects.map((project) => (
                            <Link
                                key={project.slug}
                                href={`/${locale}/portfolio/${project.slug}`}
                                className="group/link flex items-start justify-between gap-4 border-t border-white/10 pt-3 transition hover:border-orange/45"
                            >
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-white">
                                        {project.title}
                                    </p>

                                    <p className="mt-1 text-sm text-white/38">
                                        {project.type}
                                    </p>
                                </div>

                                <ArrowUpRight
                                    className="mt-0.5 h-4 w-4 shrink-0 text-white/24 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-orange"
                                    aria-hidden="true"
                                />
                            </Link>
                        ))}
                    </div>

                    <Link
                        href="#featured-case-studies"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/46 transition hover:text-orange"
                    >
                        See selected work
                        <ArrowRight
                            className="h-4 w-4 transition group-hover:translate-x-1"
                            aria-hidden="true"
                        />
                    </Link>
                </div>
            </div>
        </article>
    );
}

function getServiceCapabilities(service: PortfolioService) {
    return portfolioData.capabilities.filter((capability) =>
        service.capabilities.includes(capability.id),
    );
}

function getServiceProofProjects(service: PortfolioService) {
    const featuredProjects = service.featuredProjectSlugs
        .map((slug) => portfolioData.projects.find((project) => project.slug === slug))
        .filter((project): project is PortfolioProject => Boolean(project));

    if (featuredProjects.length) {
        return featuredProjects;
    }

    return portfolioData.projects.filter((project) =>
        isProjectLinkedToService(project, service.id),
    );
}

function isProjectLinkedToService(
    project: PortfolioProject,
    serviceId: PortfolioServiceId,
) {
    const isPrimaryService = project.serviceId === serviceId;
    const isSecondaryService = project.secondaryServiceIds?.includes(serviceId);

    return isPrimaryService || Boolean(isSecondaryService);
}

function getShortServiceTitle(serviceId: PortfolioServiceId) {
    const titles: Record<PortfolioServiceId, string> = {
        "web-platforms": "Web platforms",
        "product-discovery-prototyping": "Product discovery",
        "automation-internal-tools": "Internal tools",
        "data-dashboards": "Data interfaces",
    };

    return titles[serviceId];
}

function getShortServiceDescription(serviceId: PortfolioServiceId) {
    const descriptions: Record<PortfolioServiceId, string> = {
        "web-platforms":
            "Clear, scalable websites and platforms built to make an offer credible online.",
        "product-discovery-prototyping":
            "Workshops, flows and prototypes that help teams validate direction before building.",
        "automation-internal-tools":
            "Operational tools that reduce manual work and make internal processes easier to run.",
        "data-dashboards":
            "Readable dashboards and reporting interfaces that turn scattered data into decisions.",
    };

    return descriptions[serviceId];
}