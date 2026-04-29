import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PortfolioVisualMockup } from "@/sections/portfolio/components/PortfolioVisualMockup";
import type {
  PortfolioLocale,
  PortfolioProject,
} from "@/sections/portfolio/types/portfolio.types";

type ProjectCardVariant = "featured" | "compact";

type ProjectCardProps = {
  project: PortfolioProject;
  serviceLabel: string;
  locale?: PortfolioLocale;
  index?: number;
  variant?: ProjectCardVariant;
};

export function ProjectCard({
  project,
  serviceLabel,
  locale = "en",
  index,
  variant = "featured",
}: ProjectCardProps) {
  const href = `/${locale}/portfolio/${project.slug}`;

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="group block border-t border-white/10 py-6 transition duration-300 hover:border-orange/45"
      >
        <div className="grid gap-4 md:grid-cols-[0.12fr_0.28fr_1fr_0.12fr] md:items-start">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange/75">
            {formatIndex(index)}
          </p>

          <div>
            <p className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-white/36">
              {serviceLabel}
            </p>

            <p className="mt-2 text-sm text-white/46">
              {project.type}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold tracking-[-0.035em] text-white transition group-hover:text-orange">
              {project.title}
            </h3>

            <p
              className="mt-3 max-w-2xl overflow-hidden text-sm leading-6 text-white/56"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {project.proofStatement}
            </p>
          </div>

          <div className="flex md:justify-end">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.035] text-white/34 transition group-hover:bg-orange/12 group-hover:text-orange">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-orange/35 hover:bg-white/[0.055]"
    >
      <div className="grid min-h-full grid-rows-[auto_1fr]">
        <PortfolioVisualMockup
          kind={project.visual.kind}
          title={project.visual.title}
          className="min-h-[250px] rounded-none border-0 border-b border-white/10"
        />

        <div className="flex min-h-[300px] flex-col p-6">
          <div className="grid min-h-10 grid-cols-[1fr_auto] items-start gap-4">
            <div className="min-w-0">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]">
                <span className="text-orange">
                  {formatIndex(index)}
                </span>

                <span className="truncate text-white/36">
                  {serviceLabel}
                </span>
              </p>
            </div>

            <p className="max-w-[9rem] truncate text-right text-sm text-white/42">
              {project.type}
            </p>
          </div>

          <div className="mt-7">
            <h3 className="max-w-md text-2xl font-semibold leading-tight tracking-[-0.045em] text-white transition group-hover:text-orange sm:text-3xl">
              {project.title}
            </h3>

            <p
              className="mt-4 max-w-xl overflow-hidden text-sm leading-6 text-white/62"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {project.proofStatement}
            </p>
          </div>

          <div className="mt-auto pt-8">
            <div className="grid grid-cols-[1fr_auto] items-end gap-6 border-t border-white/10 pt-5">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/34">
                  Impact
                </p>

                <p
                  className="mt-2 max-w-xs overflow-hidden text-sm leading-6 text-white/54"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {project.outcomes[0]?.description ?? project.shortDescription}
                </p>
              </div>

              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.035] text-white/34 transition group-hover:bg-orange/12 group-hover:text-orange">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function formatIndex(index?: number) {
  if (typeof index !== "number") {
    return "Case";
  }

  return String(index + 1).padStart(2, "0");
}