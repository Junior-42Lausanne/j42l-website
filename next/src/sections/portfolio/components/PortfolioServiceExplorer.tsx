"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { PortfolioVisualMockup } from "@/sections/portfolio/components/PortfolioVisualMockup";
import { portfolioData } from "@/sections/portfolio/data/portfolio.mock";
import type {
    PortfolioCapability,
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
    const [selectedServiceId, setSelectedServiceId] =
        useState<PortfolioServiceId>("web-platforms");

    const selectedService = useMemo(() => {
        return (
            portfolioData.services.find(
                (service) => service.id === selectedServiceId,
            ) ?? portfolioData.services[0]
        );
    }, [selectedServiceId]);

    const relatedProjects = useMemo(() => {
        return getRelatedProjects(selectedService);
    }, [selectedService]);

    const featuredProject = relatedProjects[0];

    const serviceCapabilities = useMemo(() => {
        return portfolioData.capabilities.filter((capability) =>
            selectedService.capabilities.includes(capability.id),
        );
    }, [selectedService]);

    return (
        <section id="services" className={portfolioLayout.section}>
            <div className="grid gap-12 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
                <div className="lg:sticky lg:top-28">
                    <span className={portfolioText.eyebrow}>
                        Service-first exploration
                    </span>

                    <h2 className={`${portfolioText.h2} mt-4 max-w-xl`}>
                        Start with the need.
                    </h2>

                    <p className={`${portfolioText.body} mt-5 max-w-md`}>
                        Pick a service. See the kind of interface, proof and capability
                        behind it.
                    </p>

                    <ServiceIndex
                        services={portfolioData.services}
                        selectedServiceId={selectedService.id}
                        onSelect={setSelectedServiceId}
                    />
                </div>

                <ServiceProofPanel
                    service={selectedService}
                    capabilities={serviceCapabilities}
                    relatedProjects={relatedProjects}
                    featuredProject={featuredProject}
                    locale={locale}
                />
            </div>
        </section>
    );
}

type ServiceIndexProps = {
    services: PortfolioService[];
    selectedServiceId: PortfolioServiceId;
    onSelect: (serviceId: PortfolioServiceId) => void;
};

function ServiceIndex({
    services,
    selectedServiceId,
    onSelect,
}: ServiceIndexProps) {
    return (
        <nav
            className="mt-9 border-t border-white/10 pt-5"
            aria-label="Portfolio services"
        >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/36">
                Services
            </p>

            <div className="mt-5 space-y-1">
                {services.map((service, index) => {
                    const isSelected = service.id === selectedServiceId;

                    return (
                        <button
                            key={service.id}
                            type="button"
                            onClick={() => onSelect(service.id)}
                            aria-pressed={isSelected}
                            className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
                        >
                            <span
                                className={[
                                    "text-xs font-semibold tabular-nums transition",
                                    isSelected
                                        ? "text-orange"
                                        : "text-white/32 group-hover:text-white/54",
                                ].join(" ")}
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <span>
                                <span
                                    className={[
                                        "block text-base font-semibold tracking-[-0.025em] transition",
                                        isSelected
                                            ? "text-white"
                                            : "text-white/62 group-hover:text-white",
                                    ].join(" ")}
                                >
                                    {service.label}
                                </span>

                                <span
                                    className={[
                                        "mt-1 block text-sm leading-5 transition",
                                        isSelected
                                            ? "text-white/50"
                                            : "text-white/34 group-hover:text-white/48",
                                    ].join(" ")}
                                >
                                    {service.shortLabel}
                                </span>
                            </span>

                            <span
                                className={[
                                    "inline-flex h-8 w-8 items-center justify-center rounded-full transition",
                                    isSelected
                                        ? "bg-orange text-[#14120e]"
                                        : "bg-white/[0.035] text-white/26 group-hover:text-white/60",
                                ].join(" ")}
                            >
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

type ServiceProofPanelProps = {
    service: PortfolioService;
    capabilities: PortfolioCapability[];
    relatedProjects: PortfolioProject[];
    featuredProject?: PortfolioProject;
    locale: PortfolioLocale;
};

function ServiceProofPanel({
    service,
    capabilities,
    relatedProjects,
    featuredProject,
    locale,
}: ServiceProofPanelProps) {
    const primaryCapabilities = capabilities.slice(0, 3);
    const secondaryProjects = relatedProjects.slice(0, 2);
    const promise = getServicePromise(service.id);

    return (
        <article className="relative min-w-0 border-t border-white/10 pt-8 lg:border-t-0 lg:pt-0">
            <div className="grid gap-8">
                <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_240px] xl:items-start">
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange">
                                {service.shortLabel}
                            </p>

                            <span className="h-px w-10 bg-orange/40" />

                            <p className="text-sm text-white/38">
                                {relatedProjects.length} proofs
                            </p>
                        </div>

                        <h3 className="mt-5 max-w-[13ch] text-5xl font-semibold leading-[0.92] tracking-[-0.065em] text-white sm:text-6xl lg:text-[4.9rem]">
                            {promise}
                        </h3>
                    </div>

                    <CapabilityStack capabilities={primaryCapabilities} />
                </div>

                <ServiceVisualPreview
                    service={service}
                    project={featuredProject}
                    locale={locale}
                />

                <div className="grid gap-7 border-t border-white/10 pt-7 lg:grid-cols-[0.42fr_0.58fr]">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/36">
                            What it proves
                        </p>

                        <p
                            className="mt-3 max-w-md overflow-hidden text-base leading-7 text-white/72"
                            style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {service.proofAngle}
                        </p>
                    </div>

                    <RelatedProofs
                        projects={secondaryProjects}
                        locale={locale}
                    />
                </div>
            </div>
        </article>
    );
}

type ServiceVisualPreviewProps = {
    service: PortfolioService;
    project?: PortfolioProject;
    locale: PortfolioLocale;
};

function ServiceVisualPreview({
    service,
    project,
    locale,
}: ServiceVisualPreviewProps) {
    const visualKind = project?.visual.kind ?? getFallbackVisualKind(service.id);
    const visualTitle = project?.visual.title ?? service.label;
    const href = project ? `/${locale}/portfolio/${project.slug}` : "#browse-case-studies";

    return (
        <div className="group relative overflow-hidden rounded-[2.25rem] border border-white/[0.08] bg-[#211e18]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(244,152,25,0.10),transparent_34%,rgba(255,255,255,0.025))]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange/40 to-transparent" />

            <div className="relative grid gap-6 p-4 sm:p-5 lg:grid-cols-[1fr_0.34fr] lg:p-6">
                <PortfolioVisualMockup
                    kind={visualKind}
                    title={visualTitle}
                    className="min-h-[360px] border-white/[0.07] bg-[#181612]/78"
                />

                <div className="flex flex-col justify-between gap-6 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/36">
                            Visual proof
                        </p>

                        <h4 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.045em] text-white">
                            {project?.title ?? service.label}
                        </h4>

                        <p
                            className="mt-4 overflow-hidden text-sm leading-6 text-white/52"
                            style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {project?.proofStatement ?? service.description}
                        </p>
                    </div>

                    <Link
                        href={href}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-orange px-5 text-sm font-semibold text-[#14120e] transition hover:bg-[#ffad3d]"
                    >
                        Open proof
                        <ArrowUpRight
                            className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

type CapabilityStackProps = {
    capabilities: PortfolioCapability[];
};

function CapabilityStack({ capabilities }: CapabilityStackProps) {
    return (
        <aside className="border-t border-white/10 pt-6 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/36">
                Capabilities
            </p>

            <div className="mt-5 space-y-4">
                {capabilities.map((capability, index) => (
                    <div key={capability.id}>
                        <p className="flex items-center gap-3 text-sm font-semibold text-white">
                            <span className="text-xs text-orange/80">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            {capability.label}
                        </p>

                        <p
                            className="mt-1 overflow-hidden text-sm leading-6 text-white/42"
                            style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {capability.description}
                        </p>
                    </div>
                ))}
            </div>
        </aside>
    );
}

type RelatedProofsProps = {
    projects: PortfolioProject[];
    locale: PortfolioLocale;
};

function RelatedProofs({ projects, locale }: RelatedProofsProps) {
    return (
        <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/36">
                Related proofs
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {projects.map((project, index) => (
                    <Link
                        key={project.slug}
                        href={`/${locale}/portfolio/${project.slug}`}
                        className="group min-w-0 border-t border-white/10 pt-4 transition hover:border-orange/45"
                    >
                        <p className="text-xs font-semibold text-orange/80">
                            {String(index + 1).padStart(2, "0")}
                        </p>

                        <h4 className="mt-2 truncate text-sm font-semibold text-white transition group-hover:text-orange">
                            {project.title}
                        </h4>

                        <p
                            className="mt-2 overflow-hidden text-sm leading-5 text-white/42"
                            style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {project.proofStatement}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function getRelatedProjects(service: PortfolioService) {
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

function getServicePromise(serviceId: PortfolioServiceId) {
    const promises: Record<PortfolioServiceId, string> = {
        "web-platforms": "Turn offers into credible web platforms.",
        "product-discovery-prototyping": "Turn ideas into testable product paths.",
        "automation-internal-tools": "Turn manual work into useful internal tools.",
        "data-dashboards": "Turn scattered data into clear decisions.",
    };

    return promises[serviceId];
}

function getFallbackVisualKind(serviceId: PortfolioServiceId) {
    const visualKinds: Record<
        PortfolioServiceId,
        PortfolioProject["visual"]["kind"]
    > = {
        "web-platforms": "website-preview",
        "product-discovery-prototyping": "prototype-preview",
        "automation-internal-tools": "automation-flow",
        "data-dashboards": "dashboard-preview",
    };

    return visualKinds[serviceId];
}