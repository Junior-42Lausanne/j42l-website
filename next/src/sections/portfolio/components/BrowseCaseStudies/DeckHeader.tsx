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