// src/sections/portfolio/components/ServiceSelector.tsx

"use client";

import { ArrowUpRight } from "lucide-react";

import type {
  PortfolioService,
  PortfolioServiceId,
} from "@/sections/portfolio/types/portfolio.types";
import { portfolioText } from "@/sections/portfolio/styles/portfolioStyles";

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
    <section
      id="services"
      className="relative mx-auto w-full max-w-7xl px-5 pt-16 pb-8 sm:px-6 lg:px-8 lg:pt-20 lg:pb-10"
    >
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className="max-w-xl">
          <span className={portfolioText.eyebrow}>
            Service-first exploration
          </span>

          <h2 className={`${portfolioText.h2} mt-4`}>
            Start with the service, then inspect the proof.
          </h2>

          <p className={`${portfolioText.body} mt-5`}>
            The portfolio is structured like a commercial proof system. Each
            service opens a focused path toward the projects, capabilities and
            case studies that validate it.
          </p>

          <div className="mt-8 hidden border-l border-white/10 pl-5 lg:block">
            <p className="text-sm leading-6 text-white/48">
              Select a service to reframe the portfolio around one specific
              business need.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]">
          <div className="grid border-b border-white/10 px-5 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/36 sm:grid-cols-[0.35fr_1.15fr_0.6fr]">
            <span>Index</span>
            <span className="hidden sm:block">Service</span>
            <span className="hidden text-right sm:block">Focus</span>
          </div>

          <div>
            {services.map((service, index) => {
              const isSelected = service.id === selectedServiceId;

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => onSelect(service.id)}
                  aria-pressed={isSelected}
                  className={[
                    "group grid w-full gap-4 border-b border-white/10 px-5 py-5 text-left transition duration-300 last:border-b-0 sm:grid-cols-[0.35fr_1.15fr_0.6fr] sm:items-start",
                    "focus:outline-none focus:ring-2 focus:ring-orange focus:ring-inset",
                    isSelected
                      ? "bg-orange/[0.075]"
                      : "bg-transparent hover:bg-white/[0.035]",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        "inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition",
                        isSelected
                          ? "border-orange/45 bg-orange/10 text-orange"
                          : "border-white/10 bg-white/[0.03] text-white/44",
                      ].join(" ")}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={[
                        "h-px flex-1 transition sm:hidden",
                        isSelected ? "bg-orange/60" : "bg-white/10",
                      ].join(" ")}
                    />
                  </div>

                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3
                        className={[
                          "text-xl font-semibold tracking-[-0.04em] transition",
                          isSelected ? "text-white" : "text-white/86",
                        ].join(" ")}
                      >
                        {service.label}
                      </h3>

                      <ArrowUpRight
                        className={[
                          "mt-1 h-4 w-4 shrink-0 transition sm:hidden",
                          isSelected
                            ? "text-orange"
                            : "text-white/28 group-hover:text-white/50",
                        ].join(" ")}
                        aria-hidden="true"
                      />
                    </div>

                    <p
                      className={[
                        "mt-3 max-w-2xl text-sm leading-6 transition",
                        isSelected ? "text-white/72" : "text-white/52",
                      ].join(" ")}
                    >
                      {service.description}
                    </p>

                    <p
                      className={[
                        "mt-4 max-w-2xl text-sm leading-6 transition",
                        isSelected ? "text-white/82" : "text-white/38",
                      ].join(" ")}
                    >
                      {service.proofAngle}
                    </p>
                  </div>

                  <div className="hidden items-start justify-end gap-3 sm:flex">
                    <span
                      className={[
                        "mt-1 text-xs font-semibold uppercase tracking-[0.22em] transition",
                        isSelected ? "text-orange" : "text-white/32",
                      ].join(" ")}
                    >
                      {service.shortLabel}
                    </span>

                    <ArrowUpRight
                      className={[
                        "mt-0.5 h-4 w-4 shrink-0 transition",
                        isSelected
                          ? "text-orange"
                          : "text-white/22 group-hover:text-white/48",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}