import type { PortfolioProject } from "@/sections/portfolio/types/portfolio.types";

type ProjectVisualPosterProps = {
    project: PortfolioProject;
};

export function ProjectVisualPoster({ project }: ProjectVisualPosterProps) {
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