"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import type {
    PortfolioLocale,
    PortfolioProject,
} from "@/sections/portfolio/types/portfolio.types";

import { DeckHeader } from "./DeckHeader";
import { ProjectDeckCard } from "./ProjectDeckCard";
import type { BrowseFilter } from "./types";

type BrowseCarouselProps = {
    activeFilter: BrowseFilter;
    projects: PortfolioProject[];
    activeProjectIndex: number;
    locale: PortfolioLocale;
    onActiveProjectIndexChange: (index: number) => void;
};

export function BrowseCarousel({
    activeFilter,
    projects,
    activeProjectIndex,
    locale,
    onActiveProjectIndexChange,
}: BrowseCarouselProps) {
    const viewportNodeRef = useRef<HTMLDivElement | null>(null);
    const wheelDeltaRef = useRef(0);
    const wheelLockRef = useRef(false);
    const wheelIdleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );
    const wheelUnlockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    const [emblaRef, emblaApi] = useEmblaCarousel({
        axis: "y",
        align: "start",
        loop: false,
        skipSnaps: false,
        dragFree: false,
        containScroll: "trimSnaps",
        duration: 28,
    });

    const [canGoPrev, setCanGoPrev] = useState(false);
    const [canGoNext, setCanGoNext] = useState(projects.length > 1);

    const setEmblaViewportRef = useCallback(
        (node: HTMLDivElement | null) => {
            viewportNodeRef.current = node;
            emblaRef(node);
        },
        [emblaRef],
    );

    const updateCarouselState = useCallback(() => {
        if (!emblaApi) {
            return;
        }

        const selectedIndex = emblaApi.selectedScrollSnap();

        onActiveProjectIndexChange(selectedIndex);
        setCanGoPrev(emblaApi.canScrollPrev());
        setCanGoNext(emblaApi.canScrollNext());
    }, [emblaApi, onActiveProjectIndexChange]);

    useEffect(() => {
        if (!emblaApi) {
            return;
        }

        emblaApi.on("select", updateCarouselState);
        emblaApi.on("reInit", updateCarouselState);

        updateCarouselState();

        return () => {
            emblaApi.off("select", updateCarouselState);
            emblaApi.off("reInit", updateCarouselState);
        };
    }, [emblaApi, updateCarouselState]);

    useEffect(() => {
        if (!emblaApi) {
            return;
        }

        emblaApi.reInit();
        emblaApi.scrollTo(0, true);

        wheelDeltaRef.current = 0;
        wheelLockRef.current = false;

        onActiveProjectIndexChange(0);
        setCanGoPrev(false);
        setCanGoNext(projects.length > 1);
    }, [activeFilter, emblaApi, onActiveProjectIndexChange, projects.length]);

    useEffect(() => {
        const viewportNode = viewportNodeRef.current;

        if (!viewportNode || !emblaApi) {
            return;
        }

        function handleWheel(event: WheelEvent) {
            if (projects.length <= 1 || !emblaApi) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            if (wheelLockRef.current) {
                return;
            }

            const normalizedDelta = normalizeWheelDelta(event);

            if (Math.abs(normalizedDelta) < 0.5) {
                return;
            }

            wheelDeltaRef.current += normalizedDelta;

            if (wheelIdleTimeoutRef.current) {
                clearTimeout(wheelIdleTimeoutRef.current);
            }

            wheelIdleTimeoutRef.current = setTimeout(() => {
                wheelDeltaRef.current = 0;
            }, 90);

            const wheelThreshold = 300;

            if (Math.abs(wheelDeltaRef.current) < wheelThreshold) {
                return;
            }

            const shouldGoNext = wheelDeltaRef.current > 0;
            const canScrollInDirection = shouldGoNext
                ? emblaApi.canScrollNext()
                : emblaApi.canScrollPrev();

            wheelDeltaRef.current = 0;

            if (!canScrollInDirection) {
                return;
            }

            wheelLockRef.current = true;

            if (shouldGoNext) {
                emblaApi.scrollNext();
            } else {
                emblaApi.scrollPrev();
            }

            if (wheelUnlockTimeoutRef.current) {
                clearTimeout(wheelUnlockTimeoutRef.current);
            }

            wheelUnlockTimeoutRef.current = setTimeout(() => {
                wheelLockRef.current = false;
            }, 530);
        }

        viewportNode.addEventListener("wheel", handleWheel, {
            passive: false,
        });

        return () => {
            viewportNode.removeEventListener("wheel", handleWheel);

            if (wheelIdleTimeoutRef.current) {
                clearTimeout(wheelIdleTimeoutRef.current);
            }

            if (wheelUnlockTimeoutRef.current) {
                clearTimeout(wheelUnlockTimeoutRef.current);
            }
        };
    }, [emblaApi, projects.length]);

    const goToProject = useCallback(
        (index: number) => {
            emblaApi?.scrollTo(index);
        },
        [emblaApi],
    );

    const goPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const goNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative min-h-[690px] overscroll-contain lg:min-h-[760px]">
            <DeckHeader
                activeFilter={activeFilter}
                activeProjectIndex={activeProjectIndex}
                projectsCount={projects.length}
                onPrev={goPrev}
                onNext={goNext}
                onGoToProject={goToProject}
                canGoPrev={canGoPrev}
                canGoNext={canGoNext}
            />

            <div className="absolute inset-x-0 bottom-0 top-24 overflow-hidden">
                <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-[#15120e]/72 ring-1 ring-white/[0.055] shadow-[0_18px_70px_rgba(0,0,0,0.18)]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(244,152,25,0.045),transparent_30%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.016),transparent_22%,transparent_78%,rgba(0,0,0,0.18))]" />

                    <div
                        ref={setEmblaViewportRef}
                        className="relative z-10 h-full overflow-hidden overscroll-contain"
                        aria-label="Case studies vertical carousel"
                    >
                        <div className="flex h-full flex-col">
                            {projects.map((project, index) => {
                                const isCurrent = index === activeProjectIndex;

                                return (
                                    <section
                                        key={project.slug}
                                        className="h-full min-h-0 flex-[0_0_100%]"
                                        aria-hidden={!isCurrent}
                                    >
                                        <ProjectDeckCard
                                            project={project}
                                            locale={locale}
                                            index={index}
                                            isCurrent={isCurrent}
                                        />
                                    </section>
                                );
                            })}
                        </div>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 bg-gradient-to-b from-[#15120e]/70 to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-[#15120e]/84 to-transparent" />
                </div>
            </div>
        </div>
    );
}

function normalizeWheelDelta(event: WheelEvent) {
    if (event.deltaMode === 1) {
        return event.deltaY * 16;
    }

    if (event.deltaMode === 2) {
        return event.deltaY * window.innerHeight;
    }

    return event.deltaY;
}