import { CheckCircle2, Layers3 } from "lucide-react";

import type {
  PortfolioCapability,
  PortfolioService,
} from "@/sections/portfolio/types/portfolio.types";
import {
  portfolioBadge,
  portfolioChip,
  portfolioSurface,
  portfolioText,
} from "@/sections/portfolio/styles/portfolioStyles";

type SelectedServicePanelProps = {
  service: PortfolioService;
  capabilities: PortfolioCapability[];
  relatedProjectsCount: number;
};

export function SelectedServicePanel({
  service,
  capabilities,
  relatedProjectsCount,
}: SelectedServicePanelProps) {
  const serviceCapabilities = capabilities.filter((capability) =>
    service.capabilities.includes(capability.id),
  );

  return (
    <section
      className={[
        portfolioSurface.elevated,
        portfolioSurface.softGlow,
        "relative overflow-hidden p-6 sm:p-8 lg:p-10",
      ].join(" ")}
      aria-labelledby="selected-service-title"
    >
      <div className="relative grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={portfolioBadge.accent}>
              Selected service
            </span>

            <span className={portfolioBadge.muted}>
              {relatedProjectsCount} linked projects
            </span>
          </div>

          <h2
            id="selected-service-title"
            className={`${portfolioText.h2} mt-5`}
          >
            {service.headline}
          </h2>

          <p className={`${portfolioText.lead} mt-5`}>
            {service.description}
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-orange/20 bg-orange/[0.08] p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange/30 bg-orange/[0.12] text-orange">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange">
                  What this service proves
                </p>

                <p className="mt-3 text-sm leading-6 text-white/76 sm:text-base sm:leading-7">
                  {service.proofAngle}
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-[1.75rem] border border-white/10 bg-[#181612]/72 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] text-orange">
              <Layers3 className="h-4 w-4" aria-hidden="true" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Capabilities involved
              </p>
              <p className={portfolioText.small}>
                The operational skills behind this service.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {serviceCapabilities.map((capability) => (
              <span key={capability.id} className={portfolioChip.base}>
                {capability.label}
              </span>
            ))}
          </div>

          <div className="mt-6 h-px bg-white/10" />

          <div className="mt-6 space-y-4">
            {serviceCapabilities.slice(0, 3).map((capability) => (
              <div key={capability.id}>
                <p className="text-sm font-semibold text-white">
                  {capability.label}
                </p>

                <p className="mt-1 text-sm leading-6 text-white/54">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}