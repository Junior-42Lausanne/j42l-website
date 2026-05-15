"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import type {
    PortfolioLocale,
    PortfolioProject,
} from "@/sections/portfolio/types/portfolio.types";

import {
    BrowseCarousel,
    type BrowseCarouselHandle,
} from "./BrowseCarousel";
import { DeckHeader } from "./DeckHeader";
import type { BrowseFilter } from "./types";

type BrowseFilterCarouselProps = {
    currentFilter: BrowseFilter;
    currentProjects: PortfolioProject[];
    currentProjectIndex: number;
    pendingFilter: BrowseFilter | null;
    pendingProjects: PortfolioProject[];
    locale: PortfolioLocale;
    onCurrentProjectIndexChange: (index: number) => void;
    onTransitionEnd: () => void;
};

const FILTER_HORIZONTAL_TRANSITION_MS = 720;

export function BrowseFilterCarousel({
    currentFilter,
    currentProjects,
    currentProjectIndex,
    pendingFilter,
    pendingProjects,
    locale,
    onCurrentProjectIndexChange,
    onTransitionEnd,
}: BrowseFilterCarouselProps) {
    const currentCarouselRef = useRef<BrowseCarouselHandle | null>(null);
    const pendingCarouselRef = useRef<BrowseCarouselHandle | null>(null);
    const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    const [incomingProjectIndex, setIncomingProjectIndex] = useState(0);
    const [canGoPrev, setCanGoPrev] = useState(false);
    const [canGoNext, setCanGoNext] = useState(currentProjects.length > 1);

    const hasPendingFilter = pendingFilter !== null;

    const [emblaRef, emblaApi] = useEmblaCarousel({
        axis: "x",
        align: "start",
        loop: false,
        skipSnaps: false,
        dragFree: false,
        containScroll: "trimSnaps",
        watchDrag: false,
        duration: 36,
    });

    const headerFilter = pendingFilter ?? currentFilter;
    const headerProjectIndex = hasPendingFilter ? 0 : currentProjectIndex;
    const headerProjectsCount = hasPendingFilter
        ? pendingProjects.length
        : currentProjects.length;

    const slides = useMemo(() => {
        if (!hasPendingFilter || !pendingFilter) {
            return [
                {
                    key: String(currentFilter),
                    filter: currentFilter,
                    projects: currentProjects,
                    activeIndex: currentProjectIndex,
                    ref: currentCarouselRef,
                    onActiveIndexChange: onCurrentProjectIndexChange,
                },
            ];
        }

        return [
            {
                key: String(currentFilter),
                filter: currentFilter,
                projects: currentProjects,
                activeIndex: currentProjectIndex,
                ref: currentCarouselRef,
                onActiveIndexChange: onCurrentProjectIndexChange,
            },
            {
                key: String(pendingFilter),
                filter: pendingFilter,
                projects: pendingProjects,
                activeIndex: incomingProjectIndex,
                ref: pendingCarouselRef,
                onActiveIndexChange: setIncomingProjectIndex,
            },
        ];
    }, [
        currentFilter,
        currentProjectIndex,
        currentProjects,
        hasPendingFilter,
        incomingProjectIndex,
        onCurrentProjectIndexChange,
        pendingFilter,
        pendingProjects,
    ]);

    const updateHeaderControls = useCallback(
        (state: { canGoPrev: boolean; canGoNext: boolean }) => {
            if (hasPendingFilter) {
                return;
            }

            setCanGoPrev(state.canGoPrev);
            setCanGoNext(state.canGoNext);
        },
        [hasPendingFilter],
    );

    useEffect(() => {
        if (!emblaApi) {
            return;
        }

        emblaApi.reInit();
        emblaApi.scrollTo(0, true);
    }, [emblaApi, slides.length]);

    useEffect(() => {
        if (!emblaApi || !hasPendingFilter) {
            return;
        }

        setIncomingProjectIndex(0);
        setCanGoPrev(false);
        setCanGoNext(false);

        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
        }

        emblaApi.reInit();
        emblaApi.scrollTo(0, true);

        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                emblaApi.scrollTo(1);

                transitionTimeoutRef.current = setTimeout(() => {
                    onTransitionEnd();
                }, FILTER_HORIZONTAL_TRANSITION_MS);
            });
        });

        return () => {
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
            }
        };
    }, [emblaApi, hasPendingFilter, onTransitionEnd, pendingFilter]);

    useEffect(() => {
        if (hasPendingFilter) {
            return;
        }

        setCanGoPrev(currentProjectIndex > 0);
        setCanGoNext(currentProjectIndex < currentProjects.length - 1);
    }, [currentProjectIndex, currentProjects.length, hasPendingFilter]);

    const goToProject = useCallback(
        (index: number) => {
            if (hasPendingFilter) {
                return;
            }

            currentCarouselRef.current?.scrollTo(index);
        },
        [hasPendingFilter],
    );

    const goPrev = useCallback(() => {
        if (hasPendingFilter) {
            return;
        }

        currentCarouselRef.current?.scrollPrev();
    }, [hasPendingFilter]);

    const goNext = useCallback(() => {
        if (hasPendingFilter) {
            return;
        }

        currentCarouselRef.current?.scrollNext();
    }, [hasPendingFilter]);

    return (
        <div className="relative min-h-[690px] overscroll-contain lg:min-h-[760px]">
            <div className="absolute left-0 right-0 top-0 z-30 transition-opacity duration-300 ease-out">
                <DeckHeader
                    activeFilter={headerFilter}
                    activeProjectIndex={headerProjectIndex}
                    projectsCount={headerProjectsCount}
                    onPrev={goPrev}
                    onNext={goNext}
                    onGoToProject={goToProject}
                    canGoPrev={!hasPendingFilter && canGoPrev}
                    canGoNext={!hasPendingFilter && canGoNext}
                />
            </div>

            <div className="absolute inset-x-0 bottom-0 top-24 overflow-hidden">
                <div
                    ref={emblaRef}
                    className="h-full overflow-hidden"
                    aria-label="Service filter transition carousel"
                >
                    <div className="flex h-full">
                        {slides.map((slide) => (
                            <div
                                key={slide.key}
                                className="min-w-0 flex-[0_0_100%]"
                            >
                                <BrowseCarousel
                                    ref={slide.ref}
                                    projects={slide.projects}
                                    activeProjectIndex={slide.activeIndex}
                                    locale={locale}
                                    onActiveProjectIndexChange={
                                        slide.onActiveIndexChange
                                    }
                                    onCarouselStateChange={updateHeaderControls}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}