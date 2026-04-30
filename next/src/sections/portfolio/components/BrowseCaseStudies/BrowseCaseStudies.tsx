"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { portfolioData } from "@/sections/portfolio/data/portfolio.mock";
import { portfolioLayout } from "@/sections/portfolio/styles/portfolioStyles";

import { BrowseSidebar } from "./BrowseSidebar";
import { DeckHeader } from "./DeckHeader";
import { DeckStage } from "./DeckStage";
import { useBodyScrollLock } from "./hooks/useBodyScrollLock";
import { useCarouselWheelControl } from "./hooks/useCarouselWheelControl";
import type {
    BrowseCaseStudiesProps,
    BrowseFilter,
    FilterTransitionState,
} from "./types";
import {
    clampIndex,
    getFilterTransitionClass,
    isProjectLinkedToService,
} from "./utils/browseCaseStudies.utils";

export function BrowseCaseStudies({
    locale = "en",
}: BrowseCaseStudiesProps) {
    const carouselRegionRef = useRef<HTMLDivElement | null>(null);
    const filterTransitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    const [activeFilter, setActiveFilter] = useState<BrowseFilter>("all");
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);
    const [filterTransitionState, setFilterTransitionState] =
        useState<FilterTransitionState>("idle");

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

    const activeProjectIndexRef = useRef(activeProjectIndex);
    const projectCountRef = useRef(filteredProjects.length);

    activeProjectIndexRef.current = activeProjectIndex;
    projectCountRef.current = filteredProjects.length;

    const goToProject = useCallback((index: number) => {
        const projectCount = projectCountRef.current;

        if (!projectCount) {
            return;
        }

        setActiveProjectIndex(clampIndex(index, projectCount));
    }, []);

    const goNext = useCallback(() => {
        setActiveProjectIndex((previousIndex) =>
            clampIndex(previousIndex + 1, projectCountRef.current),
        );
    }, []);

    const goPrev = useCallback(() => {
        setActiveProjectIndex((previousIndex) =>
            clampIndex(previousIndex - 1, projectCountRef.current),
        );
    }, []);

    const {
        isCarouselHovered,
        handlePointerEnter,
        handlePointerLeave,
        resetWheelControl,
    } = useCarouselWheelControl({
        carouselRegionRef,
        activeProjectIndexRef,
        projectCountRef,
        onIndexChange: setActiveProjectIndex,
        wheelThreshold: 46,
        transitionLockDuration: 760,
    });

    useBodyScrollLock(isCarouselHovered);

    function changeFilter(nextFilter: BrowseFilter) {
        if (nextFilter === activeFilter || filterTransitionState !== "idle") {
            return;
        }

        if (filterTransitionTimeoutRef.current) {
            clearTimeout(filterTransitionTimeoutRef.current);
        }

        setFilterTransitionState("leaving");

        filterTransitionTimeoutRef.current = setTimeout(() => {
            setActiveFilter(nextFilter);
            setActiveProjectIndex(0);
            resetWheelControl();

            setFilterTransitionState("entering");

            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    setFilterTransitionState("idle");
                });
            });
        }, 280);
    }

    useEffect(() => {
        setActiveProjectIndex(0);
        resetWheelControl();
    }, [activeFilter, resetWheelControl]);

    useEffect(() => {
        return () => {
            if (filterTransitionTimeoutRef.current) {
                clearTimeout(filterTransitionTimeoutRef.current);
            }
        };
    }, []);

    const canGoPrev = activeProjectIndex > 0;
    const canGoNext = activeProjectIndex < filteredProjects.length - 1;

    return (
        <section id="browse-case-studies" className={portfolioLayout.section}>
            <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
                <BrowseSidebar
                    activeFilter={activeFilter}
                    activeProject={activeProject}
                    activeProjectIndex={activeProjectIndex}
                    projectsCount={filteredProjects.length}
                    onChangeFilter={changeFilter}
                />

                <div
                    ref={carouselRegionRef}
                    className={[
                        "relative min-h-[690px] overscroll-contain lg:min-h-[760px]",
                        isCarouselHovered ? "isolate" : "",
                    ].join(" ")}
                    onPointerEnter={handlePointerEnter}
                    onPointerLeave={handlePointerLeave}
                >
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

                    <div className="absolute inset-x-0 bottom-0 top-24 cursor-ns-resize overflow-hidden">
                        <div
                            className={[
                                "h-full transform-gpu transition-[transform,opacity] duration-[620ms] ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none",
                                getFilterTransitionClass(filterTransitionState),
                            ].join(" ")}
                        >
                            <DeckStage
                                projects={filteredProjects}
                                activeIndex={activeProjectIndex}
                                locale={locale}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}