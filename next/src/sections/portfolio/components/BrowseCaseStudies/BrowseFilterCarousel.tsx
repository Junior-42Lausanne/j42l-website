"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import type {
    PortfolioLocale,
    PortfolioProject,
} from "@/sections/portfolio/types/portfolio.types";

import { BrowseCarousel } from "./BrowseCarousel";
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
    const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    const [incomingProjectIndex, setIncomingProjectIndex] = useState(0);

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

    const slides = useMemo(() => {
        if (!hasPendingFilter || !pendingFilter) {
            return [
                {
                    key: String(currentFilter),
                    filter: currentFilter,
                    projects: currentProjects,
                    activeIndex: currentProjectIndex,
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
                onActiveIndexChange: onCurrentProjectIndexChange,
            },
            {
                key: String(pendingFilter),
                filter: pendingFilter,
                projects: pendingProjects,
                activeIndex: incomingProjectIndex,
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

    return (
        <div className="overflow-hidden">
            <div
                ref={emblaRef}
                className="overflow-hidden"
                aria-label="Service filter transition carousel"
            >
                <div className="flex">
                    {slides.map((slide) => (
                        <div
                            key={slide.key}
                            className="min-w-0 flex-[0_0_100%]"
                        >
                            <BrowseCarousel
                                activeFilter={slide.filter}
                                projects={slide.projects}
                                activeProjectIndex={slide.activeIndex}
                                locale={locale}
                                onActiveProjectIndexChange={
                                    slide.onActiveIndexChange
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}