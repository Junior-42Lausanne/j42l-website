"use client";

import Link from "next/link";
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type WheelEvent,
} from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

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

type BrowseFilter = "all" | PortfolioServiceId;

type BrowseCaseStudiesProps = {
    locale?: PortfolioLocale;
};

export function BrowseCaseStudies({
    locale = "en",
}: BrowseCaseStudiesProps) {
    const [activeFilter, setActiveFilter] = useState<BrowseFilter>("all");
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);

    const wheelDeltaRef = useRef(0);
    const wheelLockRef = useRef(false);
    const wheelUnlockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );
    const wheelIdleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    const filteredProjects = useMemo(() => {
        if (activeFilter === "all") {
            return portfolioData.projects;
        }

        return portfolioData.projects.filter((project) =>
            isProjectLinkedToService(project, activeFilter),
        );
    }, [activeFilter]);

    const activeProject =
        filteredProjects[activeProjectIndex] ?? filteredProjects[0];

    const goToProject = useCallback(
        (index: number) => {
            if (!filteredProjects.length) {
                return;
            }

            setActiveProjectIndex(clampIndex(index, filteredProjects.length));
        },
        [filteredProjects.length],
    );

    const goNext = useCallback(() => {
        setActiveProjectIndex((previousIndex) =>
            clampIndex(previousIndex + 1, filteredProjects.length),
        );
    }, [filteredProjects.length]);

    const goPrev = useCallback(() => {
        setActiveProjectIndex((previousIndex) =>
            clampIndex(previousIndex - 1, filteredProjects.length),
        );
    }, [filteredProjects.length]);

    useEffect(() => {
        setActiveProjectIndex(0);
        wheelDeltaRef.current = 0;
        wheelLockRef.current = false;
    }, [activeFilter]);

    useEffect(() => {
        return () => {
            if (wheelUnlockTimeoutRef.current) {
                clearTimeout(wheelUnlockTimeoutRef.current);
            }

            if (wheelIdleTimeoutRef.current) {
                clearTimeout(wheelIdleTimeoutRef.current);
            }
        };
    }, []);

    function handleCarouselWheel(event: WheelEvent<HTMLDivElement>) {
        if (filteredProjects.length <= 1) {
            return;
        }

        const isScrollingDown = event.deltaY > 0;
        const isScrollingUp = event.deltaY < 0;
        const isAtFirstProject = activeProjectIndex === 0;
        const isAtLastProject =
            activeProjectIndex === filteredProjects.length - 1;

        const shouldReleasePageScroll =
            (isAtFirstProject && isScrollingUp) ||
            (isAtLastProject && isScrollingDown);

        if (shouldReleasePageScroll) {
            wheelDeltaRef.current = 0;
            return;
        }

        event.preventDefault();

        if (wheelLockRef.current) {
            return;
        }

        wheelDeltaRef.current += event.deltaY;

        if (wheelIdleTimeoutRef.current) {
            clearTimeout(wheelIdleTimeoutRef.current);
        }

        wheelIdleTimeoutRef.current = setTimeout(() => {
            wheelDeltaRef.current = 0;
        }, 140);

        const wheelThreshold = 78;

        if (Math.abs(wheelDeltaRef.current) < wheelThreshold) {
            return;
        }

        wheelLockRef.current = true;

        if (wheelDeltaRef.current > 0) {
            goNext();
        } else {
            goPrev();
        }

        wheelDeltaRef.current = 0;

        if (wheelIdleTimeoutRef.current) {
            clearTimeout(wheelIdleTimeoutRef.current);
        }

        wheelUnlockTimeoutRef.current = setTimeout(() => {
            wheelLockRef.current = false;
        }, 640);
    }

    const canGoPrev = activeProjectIndex > 0;
    const canGoNext = activeProjectIndex < filteredProjects.length - 1;

    return (
        <section id="browse-case-studies" className={portfolioLayout.section}>
            <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
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
                                onClick={() => setActiveFilter("all")}
                            />

                            {portfolioData.services.map((service) => (
                                <FilterButton
                                    key={service.id}
                                    label={service.shortLabel}
                                    count={countProjectsForService(service.id)}
                                    isActive={activeFilter === service.id}
                                    onClick={() => setActiveFilter(service.id)}
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
                                {String(filteredProjects.length).padStart(2, "0")}
                            </p>
                        </div>
                    ) : null}
                </aside>

                <div className="relative min-h-[680px] lg:min-h-[740px]">
                    <DeckHeader
                        activeFilter={activeFilter}
                        activeProjectIndex={activeProjectIndex}
                        projectsCount={filteredProjects.length}
                        onPrev={goPrev}
                        onNext={goNext}
                        onGoToProject={goToProject}
                        canGoPrev={canGoPrev}
                        canGoNext={canGoNext}
                    />

                    <div
                        className="absolute inset-x-0 bottom-0 top-24 cursor-ns-resize"
                        onWheel={handleCarouselWheel}
                    >
                        <DeckStage
                            projects={filteredProjects}
                            activeIndex={activeProjectIndex}
                            locale={locale}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

type DeckHeaderProps = {
    activeFilter: BrowseFilter;
    activeProjectIndex: number;
    projectsCount: number;
    canGoPrev: boolean;
    canGoNext: boolean;
    onPrev: () => void;
    onNext: () => void;
    onGoToProject: (index: number) => void;
};

function DeckHeader({
    activeFilter,
    activeProjectIndex,
    projectsCount,
    canGoPrev,
    canGoNext,
    onPrev,
    onNext,
    onGoToProject,
}: DeckHeaderProps) {
    return (
        <div className="absolute left-0 right-0 top-0 z-30 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange">
                    {getFilterTitle(activeFilter)}
                </p>

                <p className="mt-2 text-sm text-white/44">
                    {formatIndex(activeProjectIndex)} /{" "}
                    {String(projectsCount).padStart(2, "0")} selected.
                </p>
            </div>

            <div className="flex flex-col items-start gap-4 sm:items-end">
                <div className="flex items-center gap-2">
                    {Array.from({ length: projectsCount }).map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onGoToProject(index)}
                            aria-label={`Go to project ${index + 1}`}
                            className={[
                                "h-1.5 rounded-full transition-[width,background-color] duration-300",
                                index === activeProjectIndex
                                    ? "w-8 bg-orange"
                                    : "w-4 bg-white/18 hover:bg-white/34",
                            ].join(" ")}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onPrev}
                        disabled={!canGoPrev}
                        className={[
                            "inline-flex h-10 w-10 items-center justify-center rounded-full transition",
                            canGoPrev
                                ? "bg-white/[0.045] text-white/70 hover:bg-white/[0.08] hover:text-white"
                                : "bg-white/[0.025] text-white/20",
                        ].join(" ")}
                        aria-label="Previous project"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    </button>

                    <button
                        type="button"
                        onClick={onNext}
                        disabled={!canGoNext}
                        className={[
                            "inline-flex h-10 w-10 items-center justify-center rounded-full transition",
                            canGoNext
                                ? "bg-orange text-[#14120e] hover:bg-[#ffad3d]"
                                : "bg-white/[0.025] text-white/20",
                        ].join(" ")}
                        aria-label="Next project"
                    >
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
}

type DeckStageProps = {
    projects: PortfolioProject[];
    activeIndex: number;
    locale: PortfolioLocale;
};

function DeckStage({
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

    const visibleProjects = projects
        .map((project, index) => ({
            project,
            index,
            offset: index - activeIndex,
        }))
        .filter(({ offset }) => Math.abs(offset) <= 1);

    return (
        <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
            {visibleProjects.map(({ project, index, offset }) => {
                const isCurrent = offset === 0;
                const direction = offset > 0 ? 1 : -1;

                const translateY = isCurrent ? 0 : direction * 108;
                const scale = isCurrent ? 1 : 0.955;
                const opacity = isCurrent ? 1 : 0.34;
                const zIndex = isCurrent ? 30 : 20;

                return (
                    <article
                        key={project.slug}
                        className={[
                            "absolute inset-0 transform-gpu transition-[transform,opacity] duration-[640ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                            isCurrent ? "pointer-events-auto" : "pointer-events-none",
                        ].join(" ")}
                        style={{
                            transform: `translate3d(0, ${translateY}%, 0) scale(${scale})`,
                            opacity,
                            zIndex,
                            willChange: "transform, opacity",
                        }}
                        aria-hidden={!isCurrent}
                    >
                        <ProjectDeckCard
                            project={project}
                            locale={locale}
                            index={index}
                            isCurrent={isCurrent}
                            isGhost={!isCurrent}
                        />
                    </article>
                );
            })}
        </div>
    );
}

type ProjectDeckCardProps = {
    project: PortfolioProject;
    locale: PortfolioLocale;
    index: number;
    isCurrent: boolean;
    isGhost?: boolean;
};

function ProjectDeckCard({
    project,
    locale,
    index,
    isCurrent,
    isGhost = false,
}: ProjectDeckCardProps) {
    const href = `/${locale}/portfolio/${project.slug}`;
    const serviceLabel = getServiceLabel(project.serviceId);
    const outcome = project.outcomes[0]?.description ?? project.shortDescription;

    return (
        <div
            className={[
                "relative h-full overflow-hidden rounded-[2rem] bg-[#201c16] ring-1 ring-white/[0.075]",
                "shadow-[0_18px_52px_rgba(0,0,0,0.22)]",
                isGhost ? "brightness-[0.72]" : "",
            ].join(" ")}
        >
            <ProjectVisualPoster project={project} />

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(18,15,11,0.94)_0%,rgba(18,15,11,0.72)_42%,rgba(18,15,11,0.22)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,15,11,0.02)_0%,rgba(18,15,11,0.08)_42%,rgba(18,15,11,0.74)_100%)]" />

            <div
                className={[
                    "relative flex h-full flex-col justify-between p-5 sm:p-6 lg:p-7",
                    isGhost ? "opacity-0" : "opacity-100",
                    "transition-opacity duration-300",
                ].join(" ")}
            >
                <div className="flex items-start justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">
                        {formatIndex(index)} / {serviceLabel}
                    </p>

                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/38">
                        {project.type}
                    </p>
                </div>

                <div className="max-w-[560px]">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange">
                        {project.status}
                    </p>

                    <h3
                        className="mt-3 max-w-[12ch] overflow-hidden text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-5xl lg:text-[3.7rem]"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {project.title}
                    </h3>

                    <p
                        className="mt-5 max-w-[42ch] overflow-hidden text-base leading-7 text-white/72"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {project.proofStatement}
                    </p>

                    <div className="mt-8 grid gap-5 border-t border-white/12 pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/36">
                                Impact
                            </p>

                            <p
                                className="mt-2 max-w-[34ch] overflow-hidden text-sm leading-6 text-white/58"
                                style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                }}
                            >
                                {outcome}
                            </p>
                        </div>

                        <Link
                            href={href}
                            tabIndex={isCurrent ? 0 : -1}
                            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-orange px-5 text-sm font-semibold text-[#14120e] transition duration-300 hover:bg-[#ffad3d]"
                        >
                            Open case
                            <ArrowUpRight
                                className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

type ProjectVisualPosterProps = {
    project: PortfolioProject;
};

function ProjectVisualPoster({ project }: ProjectVisualPosterProps) {
    return (
        <div className="absolute inset-0 overflow-hidden bg-[#201c16]">
            <div className="absolute inset-y-8 right-8 w-[52%] rounded-[1.75rem] bg-white/[0.032] ring-1 ring-white/[0.06]" />

            <div className="absolute right-12 top-14 h-24 w-[22%] rounded-[1.35rem] bg-orange/[0.10] ring-1 ring-orange/15" />
            <div className="absolute right-12 top-44 h-3 w-[20%] rounded-full bg-orange/38" />
            <div className="absolute right-12 top-52 h-3 w-[13%] rounded-full bg-white/12" />

            <div className="absolute left-[44%] top-16 h-24 w-[24%] rounded-[1.35rem] bg-white/[0.052]" />
            <div className="absolute left-[44%] top-48 h-3 w-[22%] rounded-full bg-white/16" />
            <div className="absolute left-[44%] top-56 h-3 w-[14%] rounded-full bg-white/10" />

            <div className="absolute bottom-12 left-[44%] grid w-[46%] grid-cols-3 gap-4">
                <div className="h-20 rounded-[1.25rem] bg-white/[0.045]" />
                <div className="h-20 rounded-[1.25rem] bg-white/[0.035]" />
                <div className="h-20 rounded-[1.25rem] bg-white/[0.045]" />
            </div>

            <div className="absolute left-7 top-20 h-[50%] w-[38%] rounded-[1.75rem] bg-[#17140f]/76 p-6 ring-1 ring-white/[0.07]">
                <div className="h-2.5 w-24 rounded-full bg-orange/82" />

                <div className="mt-8 space-y-4">
                    <div className="h-3 w-11/12 rounded-full bg-white/20" />
                    <div className="h-3 w-8/12 rounded-full bg-white/13" />
                    <div className="h-3 w-6/12 rounded-full bg-white/10" />
                </div>

                <div className="absolute bottom-6 left-6 h-11 w-28 rounded-full bg-orange/78" />
            </div>

            <p className="absolute right-8 top-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/18">
                {project.visual.kind.replace("-", " ")}
            </p>
        </div>
    );
}

type FilterButtonProps = {
    label: string;
    count: number;
    isActive: boolean;
    onClick: () => void;
};

function FilterButton({
    label,
    count,
    isActive,
    onClick,
}: FilterButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
        >
            <span
                className={[
                    "text-sm font-medium transition",
                    isActive ? "text-orange" : "text-white/58 group-hover:text-white",
                ].join(" ")}
            >
                {label}
            </span>

            <span
                className={[
                    "text-xs font-semibold tabular-nums transition",
                    isActive ? "text-orange" : "text-white/32 group-hover:text-white/52",
                ].join(" ")}
            >
                {String(count).padStart(2, "0")}
            </span>
        </button>
    );
}

function countProjectsForService(serviceId: PortfolioServiceId) {
    return portfolioData.projects.filter((project) =>
        isProjectLinkedToService(project, serviceId),
    ).length;
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

    return service.shortLabel || service.label;
}

function getFilterTitle(activeFilter: BrowseFilter) {
    if (activeFilter === "all") {
        return "All case studies";
    }

    return (
        portfolioData.services.find((service) => service.id === activeFilter)
            ?.label ?? "Selected service"
    );
}

function formatIndex(index: number) {
    return String(index + 1).padStart(2, "0");
}

function clampIndex(index: number, itemCount: number) {
    return Math.min(Math.max(index, 0), Math.max(itemCount - 1, 0));
}