"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
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

type WorkFilter = "all" | PortfolioServiceId;

type FeaturedCaseStudiesProps = {
    locale?: PortfolioLocale;
};

const smoothEase = [0.19, 1, 0.22, 1] as const;
const exitEase = [0.4, 0, 1, 1] as const;

const workGridVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 18,
        filter: "blur(6px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.62,
            ease: smoothEase,
            staggerChildren: 0.08,
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        filter: "blur(5px)",
        transition: {
            duration: 0.24,
            ease: exitEase,
        },
    },
};

const workCardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 24,
        scale: 0.985,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.62,
            ease: smoothEase,
        },
    },
};

export function FeaturedCaseStudies({
    locale = "en",
}: FeaturedCaseStudiesProps) {
    const [activeFilter, setActiveFilter] = useState<WorkFilter>("all");

    const visibleProjects = useMemo(() => {
        return getProjectsByFilter(activeFilter).slice(0, 3);
    }, [activeFilter]);

    const primaryProject = visibleProjects[0];
    const secondaryProjects = visibleProjects.slice(1, 3);

    if (!primaryProject) {
        return null;
    }

    return (
        <section
            id="featured-case-studies"
            className={portfolioLayout.section}
        >
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.72fr_0.78fr] lg:items-end">
                <div>
                    <span className={portfolioText.eyebrow}>
                        Selected work
                    </span>

                    <h2 className={`${portfolioText.h2} mt-4 max-w-3xl`}>
                        Work that proves what J42L can deliver.
                    </h2>
                </div>

                <div className="max-w-xl mr-10 lg:justify-self-end">
                    <p className={portfolioText.body}>
                        Explore selected projects by service category.
                    </p>

                    <WorkFilterNav
                        activeFilter={activeFilter}
                        onChangeFilter={setActiveFilter}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={getWorkGridKey(activeFilter, visibleProjects)}
                    variants={workGridVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.72fr)] xl:grid-cols-[minmax(0,1.04fr)_minmax(420px,0.68fr)]"
                >
                    <motion.div variants={workCardVariants}>
                        <FeaturedWorkCard
                            project={primaryProject}
                            serviceLabel={getServiceLabel(primaryProject.serviceId)}
                            locale={locale}
                            variant="large"
                        />
                    </motion.div>

                    <div className="grid h-full grid-rows-2 gap-5">
                        {secondaryProjects.map((project) => (
                            <motion.div
                                key={project.slug}
                                variants={workCardVariants}
                                className="h-full"
                            >
                                <FeaturedWorkCard
                                    project={project}
                                    serviceLabel={getServiceLabel(project.serviceId)}
                                    locale={locale}
                                    variant="compact"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <p className="text-sm leading-6 text-white/38">
                    Showing{" "}
                    <span className="font-medium text-white/70">
                        {getFilterLabel(activeFilter)}
                    </span>{" "}
                    work.
                </p>

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/28">
                    {String(visibleProjects.length).padStart(2, "0")} selected
                    cases
                </p>
            </div>
        </section>
    );
}

type WorkFilterNavProps = {
    activeFilter: WorkFilter;
    onChangeFilter: (filter: WorkFilter) => void;
};

function WorkFilterNav({
    activeFilter,
    onChangeFilter,
}: WorkFilterNavProps) {
    return (
        <nav
            className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3"
            aria-label="Filter selected work by service"
        >
            <FilterButton
                label="All"
                isActive={activeFilter === "all"}
                onClick={() => onChangeFilter("all")}
            />

            {portfolioData.services.map((service) => (
                <FilterButton
                    key={service.id}
                    label={service.shortLabel}
                    isActive={activeFilter === service.id}
                    onClick={() => onChangeFilter(service.id)}
                />
            ))}
        </nav>
    );
}

type FilterButtonProps = {
    label: string;
    isActive: boolean;
    onClick: () => void;
};

function FilterButton({
    label,
    isActive,
    onClick,
}: FilterButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={isActive}
            className={[
                "group relative pb-1 text-sm font-semibold transition",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange",
                isActive
                    ? "text-orange"
                    : "text-white/42 hover:text-white/76",
            ].join(" ")}
        >
            {label}

            <span
                className={[
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left transition-transform duration-300",
                    isActive
                        ? "scale-x-100 bg-orange"
                        : "scale-x-0 bg-white/30 group-hover:scale-x-100",
                ].join(" ")}
            />
        </button>
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
            className={[
                "group relative block overflow-hidden rounded-[2.25rem] border border-white/[0.075] bg-[#211e18]",
                "transition duration-500 ease-out hover:border-orange/35",
                isLarge
                    ? "min-h-[620px] lg:min-h-[640px] xl:min-h-[660px]"
                    : "h-full min-h-[300px] lg:min-h-0",
            ].join(" ")}
        >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(244,152,25,0.10),transparent_34%,rgba(255,255,255,0.025))] opacity-70 transition duration-500 group-hover:opacity-100" />

            <div
                className={[
                    "relative grid h-full gap-0",
                    isLarge
                        ? "grid-rows-[0.58fr_auto]"
                        : "grid-cols-[0.46fr_0.54fr]",
                ].join(" ")}
            >
                <div
                    className={[
                        "relative overflow-hidden",
                        isLarge
                            ? "min-h-[360px] lg:min-h-[380px]"
                            : "min-h-full",
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
                                    ? "max-w-[12ch] text-5xl leading-[0.95] sm:text-6xl lg:text-[4.1rem] xl:text-[4.35rem]"
                                    : "text-2xl leading-[1] sm:text-3xl xl:text-[2.35rem]",
                            ].join(" ")}
                        >
                            {project.title}
                        </h3>
                    </div>

                    <div className={isLarge ? "mt-10" : "mt-8"}>
                        <p
                            className={[
                                "overflow-hidden leading-7 text-white/62",
                                isLarge
                                    ? "max-w-xl text-base sm:text-lg"
                                    : "text-sm",
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

function getProjectsByFilter(filter: WorkFilter) {
    if (filter === "all") {
        return portfolioData.projects
            .filter((project) => project.isFeatured)
            .sort(sortFeaturedProjects);
    }

    const service = portfolioData.services.find(
        (currentService) => currentService.id === filter,
    );

    if (!service) {
        return [];
    }

    const featuredProjects = service.featuredProjectSlugs
        .map((slug) =>
            portfolioData.projects.find((project) => project.slug === slug),
        )
        .filter((project): project is PortfolioProject => Boolean(project));

    if (featuredProjects.length) {
        return featuredProjects;
    }

    return portfolioData.projects.filter((project) =>
        isProjectLinkedToService(project, filter),
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

function isProjectLinkedToService(
    project: PortfolioProject,
    serviceId: PortfolioServiceId,
) {
    const isPrimaryService = project.serviceId === serviceId;
    const isSecondaryService = project.secondaryServiceIds?.includes(serviceId);

    return isPrimaryService || Boolean(isSecondaryService);
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

function getFilterLabel(filter: WorkFilter) {
    if (filter === "all") {
        return "selected";
    }

    const service = portfolioData.services.find(
        (currentService) => currentService.id === filter,
    );

    return service?.shortLabel ?? "selected";
}

function getWorkGridKey(filter: WorkFilter, projects: PortfolioProject[]) {
    return `${filter}-${projects.map((project) => project.slug).join("-")}`;
}