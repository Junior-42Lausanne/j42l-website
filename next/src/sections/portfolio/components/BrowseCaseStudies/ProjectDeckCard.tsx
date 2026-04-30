import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type {
    PortfolioLocale,
    PortfolioProject,
} from "@/sections/portfolio/types/portfolio.types";

import { ProjectVisualPoster } from "./ProjectVisualPoster";
import {
    formatIndex,
    getServiceLabel,
} from "./utils/browseCaseStudies.utils";

type ProjectDeckCardProps = {
    project: PortfolioProject;
    locale: PortfolioLocale;
    index: number;
    isCurrent: boolean;
};

export function ProjectDeckCard({
    project,
    locale,
    index,
    isCurrent,
}: ProjectDeckCardProps) {
    const href = `/${locale}/portfolio/${project.slug}`;
    const serviceLabel = getServiceLabel(project.serviceId);
    const outcome = project.outcomes[0]?.description ?? project.shortDescription;

    return (
        <div className="relative h-full overflow-hidden rounded-[2.25rem] bg-[#201c16] ring-1 ring-white/[0.07] shadow-[0_18px_46px_rgba(0,0,0,0.16)]">
            <div className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] ring-1 ring-inset ring-white/[0.035]" />

            <ProjectVisualPoster project={project} />

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(18,15,11,0.96)_0%,rgba(18,15,11,0.74)_42%,rgba(18,15,11,0.24)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,15,11,0.02)_0%,rgba(18,15,11,0.08)_42%,rgba(18,15,11,0.76)_100%)]" />

            <div className="relative z-20 flex h-full flex-col justify-between p-5 sm:p-6 lg:p-7">
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