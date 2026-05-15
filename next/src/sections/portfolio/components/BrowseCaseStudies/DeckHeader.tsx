import { ArrowLeft, ArrowRight } from "lucide-react";

import type { BrowseFilter } from "./types";
import {
    formatIndex,
    getFilterTitle,
} from "./utils/browseCaseStudies.utils";

type DeckHeaderProps = {
    activeFilter: BrowseFilter;
    activeProjectIndex: number;
    projectsCount: number;
    canGoPrev: boolean;
    canGoNext: boolean;
    isTransitioning?: boolean;
    onPrev: () => void;
    onNext: () => void;
    onGoToProject: (index: number) => void;
};

export function DeckHeader({
    activeFilter,
    activeProjectIndex,
    projectsCount,
    canGoPrev,
    canGoNext,
    isTransitioning = false,
    onPrev,
    onNext,
    onGoToProject,
}: DeckHeaderProps) {
    const isPrevDisabled = isTransitioning || !canGoPrev;
    const isNextDisabled = isTransitioning || !canGoNext;

    return (
        <div className="absolute left-0 right-0 top-0 z-30 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
                <div className="relative min-h-[1.05rem] overflow-hidden">
                    <p
                        key={String(activeFilter)}
                        className={[
                            "text-xs font-semibold uppercase tracking-[0.22em] text-orange",
                            "animate-[headerFadeIn_420ms_cubic-bezier(0.19,1,0.22,1)_both]",
                            isTransitioning ? "opacity-20" : "opacity-100",
                        ].join(" ")}
                    >
                        {getFilterTitle(activeFilter)}
                    </p>
                </div>

                <div className="relative mt-2 min-h-[1.25rem] overflow-hidden">
                    <p
                        key={`${activeFilter}-${activeProjectIndex}-${projectsCount}`}
                        className={[
                            "text-sm text-white/44",
                            "animate-[headerFadeIn_420ms_cubic-bezier(0.19,1,0.22,1)_both]",
                            isTransitioning ? "opacity-45" : "opacity-100",
                        ].join(" ")}
                    >
                        {formatIndex(activeProjectIndex)} /{" "}
                        {String(projectsCount).padStart(2, "0")} selected.
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-start gap-4 sm:items-end">
                <div
                    className={[
                        "flex items-center gap-2 transition-opacity duration-300",
                        isTransitioning ? "opacity-45" : "opacity-100",
                    ].join(" ")}
                    aria-hidden={projectsCount <= 1}
                >
                    {Array.from({ length: projectsCount }).map((_, index) => {
                        const isActive = index === activeProjectIndex;

                        return (
                            <button
                                key={`${activeFilter}-${index}`}
                                type="button"
                                onClick={() => onGoToProject(index)}
                                disabled={isTransitioning}
                                aria-label={`Go to project ${index + 1}`}
                                className={[
                                    "h-1.5 rounded-full transition-[width,background-color,opacity] duration-300",
                                    isActive
                                        ? "w-8 bg-orange"
                                        : "w-4 bg-white/18 hover:bg-white/34",
                                    isTransitioning
                                        ? "cursor-not-allowed opacity-70"
                                        : "cursor-pointer",
                                ].join(" ")}
                            />
                        );
                    })}
                </div>

                <div
                    className={[
                        "flex items-center gap-2 transition-opacity duration-300",
                        isTransitioning ? "opacity-55" : "opacity-100",
                    ].join(" ")}
                >
                    <button
                        type="button"
                        onClick={onPrev}
                        disabled={isPrevDisabled}
                        className={[
                            "inline-flex h-10 w-10 items-center justify-center rounded-full transition",
                            !isPrevDisabled
                                ? "bg-white/[0.045] text-white/70 hover:bg-white/[0.08] hover:text-white"
                                : "cursor-not-allowed bg-white/[0.025] text-white/20",
                        ].join(" ")}
                        aria-label="Previous project"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    </button>

                    <button
                        type="button"
                        onClick={onNext}
                        disabled={isNextDisabled}
                        className={[
                            "inline-flex h-10 w-10 items-center justify-center rounded-full transition",
                            !isNextDisabled
                                ? "bg-orange text-[#14120e] hover:bg-[#ffad3d]"
                                : "cursor-not-allowed bg-white/[0.025] text-white/20",
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