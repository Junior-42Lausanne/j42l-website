"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

import { portfolioData } from "@/sections/portfolio/data/portfolio.mock";
import type {
  PortfolioCapability,
  PortfolioProject,
  PortfolioService,
  PortfolioServiceId,
} from "@/sections/portfolio/types/portfolio.types";
import {
  portfolioBadge,
  portfolioText,
} from "@/sections/portfolio/styles/portfolioStyles";

export function PortfolioServiceExplorer() {
  const [selectedServiceId, setSelectedServiceId] =
    useState<PortfolioServiceId>("web-platforms");

  const selectedService = useMemo(() => {
    return (
      portfolioData.services.find(
        (service) => service.id === selectedServiceId,
      ) ?? portfolioData.services[0]
    );
  }, [selectedServiceId]);

  const relatedProjects = useMemo(() => {
    return portfolioData.projects.filter((project) =>
      isProjectLinkedToService(project, selectedService.id),
    );
  }, [selectedService.id]);

  const serviceCapabilities = useMemo(() => {
    return portfolioData.capabilities.filter((capability) =>
      selectedService.capabilities.includes(capability.id),
    );
  }, [selectedService]);

  return (
    <section
      id="services"
      className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mb-10 max-w-4xl">
        <span className={portfolioText.eyebrow}>
          Service-first exploration
        </span>

        <h2 className={`${portfolioText.h2} mt-4`}>
          Start with the service, then inspect the proof.
        </h2>

        <p className={`${portfolioText.body} mt-5 max-w-2xl`}>
          Select a service and see how positioning, capabilities and project
          evidence connect inside one focused view.
        </p>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#1d1a15]">
        <div className="grid lg:min-h-[640px] lg:grid-cols-[0.38fr_0.62fr]">
          <ServiceIndex
            services={portfolioData.services}
            selectedServiceId={selectedService.id}
            onSelect={setSelectedServiceId}
          />

          <ServiceBrief
            service={selectedService}
            capabilities={serviceCapabilities}
            relatedProjects={relatedProjects}
          />
        </div>
      </div>
    </section>
  );
}

type ServiceIndexProps = {
  services: PortfolioService[];
  selectedServiceId: PortfolioServiceId;
  onSelect: (serviceId: PortfolioServiceId) => void;
};

function ServiceIndex({
  services,
  selectedServiceId,
  onSelect,
}: ServiceIndexProps) {
  return (
    <nav
      className="flex min-h-full flex-col border-b border-white/10 lg:border-b-0 lg:border-r"
      aria-label="Portfolio services"
    >
      <div className="border-b border-white/10 px-5 py-4 sm:px-6">
        <div className="grid grid-cols-[0.24fr_1fr_0.18fr] text-xs font-semibold uppercase tracking-[0.22em] text-white/36">
          <span>Index</span>
          <span>Service</span>
          <span className="text-right">Go</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {services.map((service, index) => {
          const isSelected = service.id === selectedServiceId;

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelect(service.id)}
              aria-pressed={isSelected}
              className={[
                "group relative grid w-full flex-1 grid-cols-[0.24fr_1fr_0.18fr] gap-4 border-b border-white/10 px-5 py-6 text-left transition duration-300 last:border-b-0 sm:px-6 lg:min-h-[145px]",
                "focus:outline-none focus:ring-2 focus:ring-orange focus:ring-inset",
                isSelected
                  ? "bg-[#2b2418]"
                  : "bg-transparent hover:bg-white/[0.03]",
              ].join(" ")}
            >
              <div>
                <span
                  className={[
                    "inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition",
                    isSelected
                      ? "bg-orange/12 text-orange"
                      : "bg-white/[0.03] text-white/42",
                  ].join(" ")}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="self-center">
                <h3
                  className={[
                    "text-lg font-semibold tracking-[-0.035em] transition sm:text-xl",
                    isSelected ? "text-white" : "text-white/76",
                  ].join(" ")}
                >
                  {service.label}
                </h3>

                <p
                  className={[
                    "mt-3 max-w-md overflow-hidden text-sm leading-6 transition",
                    isSelected ? "text-white/66" : "text-white/42",
                  ].join(" ")}
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {service.description}
                </p>
              </div>

              <div className="flex justify-end">
                <span
                  className={[
                    "mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full transition",
                    isSelected
                      ? "bg-orange/12 text-orange"
                      : "bg-white/[0.025] text-white/24 group-hover:text-white/50",
                  ].join(" ")}
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>

              <span
                className={[
                  "absolute inset-y-0 left-0 w-px transition",
                  isSelected ? "bg-orange" : "bg-transparent",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

type ServiceBriefProps = {
  service: PortfolioService;
  capabilities: PortfolioCapability[];
  relatedProjects: PortfolioProject[];
};

function ServiceBrief({
  service,
  capabilities,
  relatedProjects,
}: ServiceBriefProps) {
  const primaryCapabilities = capabilities.slice(0, 5);
  const primaryProjects = relatedProjects.slice(0, 3);

  return (
    <article className="relative min-h-full overflow-hidden bg-[#211e18]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(244,152,25,0.10),transparent_34%)]" />

      <div className="relative flex min-h-full flex-col p-6 sm:p-8 lg:p-10 xl:p-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={portfolioBadge.accent}>Selected service</span>
            <span className="text-sm text-white/44">
              {relatedProjects.length} linked projects
            </span>
          </div>

          <p className="hidden text-sm text-white/38 lg:block">
            Proof context updated.
          </p>
        </div>

        <div className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange">
              {service.shortLabel}
            </p>

            <h3 className="mt-4 max-w-2xl text-[2.7rem] font-semibold leading-[1] tracking-[-0.055em] text-white sm:text-5xl lg:text-[3.25rem]">
              {service.headline}
            </h3>

            <p
              className="mt-6 max-w-2xl overflow-hidden text-base leading-7 text-white/68 sm:text-lg sm:leading-8"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {service.description}
            </p>

            <div className="mt-8 max-w-2xl border-l border-orange/40 pl-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange">
                What this service proves
              </p>

              <p
                className="mt-3 overflow-hidden text-base leading-7 text-white/82"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {service.proofAngle}
              </p>
            </div>
          </div>

          <aside className="border-t border-white/10 pt-8 xl:border-l xl:border-t-0 xl:pl-10 xl:pt-0">
            <p className="text-sm font-semibold text-white">
              Capabilities involved
            </p>

            <p className="mt-1 text-sm leading-6 text-white/46">
              Main skills mobilized for this service.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {primaryCapabilities.map((capability, index) => (
                <span
                  key={capability.id}
                  className="inline-flex items-center gap-2 text-sm leading-6 text-white/70"
                >
                  <span className="text-xs font-semibold text-orange/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{capability.label}</span>
                </span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-auto pt-10">
          <div className="border-t border-white/10 pt-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">
                  Proof projects
                </p>
                <p className="mt-1 text-sm text-white/42">
                  Projects that support this service positioning.
                </p>
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/34">
                Related cases
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {primaryProjects.map((project, index) => (
                <div key={project.slug} className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange/75">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <p className="mt-2 text-sm font-semibold leading-5 text-white">
                    {project.title}
                  </p>

                  <p
                    className="mt-2 overflow-hidden text-sm leading-6 text-white/48"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {project.proofStatement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function isProjectLinkedToService(
  project: PortfolioProject,
  serviceId: PortfolioServiceId,
) {
  const isPrimaryService = project.serviceId === serviceId;
  const isSecondaryService = project.secondaryServiceIds?.includes(serviceId);

  return isPrimaryService || Boolean(isSecondaryService);
}