"use client";

import type {
  PortfolioService,
  PortfolioServiceId,
} from "@/sections/portfolio/types/portfolio.types";
import {
  portfolioBadge,
  portfolioLayout,
  portfolioText,
} from "@/sections/portfolio/styles/portfolioStyles";

type ServiceSelectorProps = {
  services: PortfolioService[];
  selectedServiceId: PortfolioServiceId;
  onSelect: (serviceId: PortfolioServiceId) => void;
};

export function ServiceSelector({
  services,
  selectedServiceId,
  onSelect,
}: ServiceSelectorProps) {
  return (
    <section id="services" className={portfolioLayout.sectionCompact}>
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <span className={portfolioText.eyebrow}>Service-first exploration</span>

          <h2 className={`${portfolioText.h2} mt-4`}>
            Start with the service, then inspect the proof.
          </h2>

          <p className={`${portfolioText.body} mt-5 max-w-xl`}>
            Each service acts as an entry point into relevant projects,
            capabilities and case studies. The goal is to show what J42L can
            deliver, not just what it can display.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-2">
          <div className="grid gap-2 sm:grid-cols-2">
            {services.map((service, index) => {
              const isSelected = service.id === selectedServiceId;

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => onSelect(service.id)}
                  aria-pressed={isSelected}
                  className={[
                    "group relative overflow-hidden rounded-[1.5rem] border p-5 text-left transition duration-300",
                    "focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-[#181612]",
                    isSelected
                      ? "border-orange/45 bg-orange/[0.10] shadow-[0_20px_70px_rgba(244,152,25,0.08)]"
                      : "border-white/10 bg-[#181612]/60 hover:border-white/20 hover:bg-white/[0.055]",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={
                        isSelected ? portfolioBadge.accent : portfolioBadge.muted
                      }
                    >
                      0{index + 1}
                    </span>

                    <span
                      className={[
                        "text-xs font-semibold uppercase tracking-[0.18em] transition",
                        isSelected ? "text-orange" : "text-white/36",
                      ].join(" ")}
                    >
                      {service.shortLabel}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.04em] text-white">
                    {service.label}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {service.description}
                  </p>

                  <div className="mt-5 h-px w-full bg-white/10" />

                  <p
                    className={[
                      "mt-4 text-sm leading-6 transition",
                      isSelected ? "text-white/76" : "text-white/48",
                    ].join(" ")}
                  >
                    {service.proofAngle}
                  </p>

                  <div
                    className={[
                      "pointer-events-none absolute inset-x-5 bottom-0 h-px transition",
                      isSelected ? "bg-orange/70" : "bg-transparent",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}