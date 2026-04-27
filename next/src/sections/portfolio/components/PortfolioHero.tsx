import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { portfolioData } from "@/sections/portfolio/data/portfolio.mock";
import { PortfolioVisualMockup } from "@/sections/portfolio/components/PortfolioVisualMockup";
import {
  portfolioBadge,
  portfolioButton,
  portfolioLayout,
  portfolioSurface,
  portfolioText,
} from "@/sections/portfolio/styles/portfolioStyles";

export function PortfolioHero() {
  const featuredProject = portfolioData.projects.find(
    (project) => project.slug === "j42l-website-redesign",
  );

  return (
    <section className={portfolioLayout.section}>
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <span className={portfolioText.eyebrow}>Portfolio</span>

          <h1 className={`${portfolioText.h1} mt-5`}>
            Proof of what J42L can deliver.
          </h1>

          <p className={`${portfolioText.lead} mt-6`}>
            Explore J42L projects through the services they prove. This
            portfolio connects capabilities, delivery methods and case studies
            so prospects can understand what the team can build with confidence.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#featured-case-studies" className={portfolioButton.primary}>
              View featured proofs
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>

            <Link href="#services" className={portfolioButton.secondary}>
              Explore services
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {portfolioData.services.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
              >
                <p className="text-sm font-semibold text-white">
                  {service.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  {service.proofAngle}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside
          className={[
            portfolioSurface.elevated,
            portfolioSurface.softGlow,
            "relative overflow-hidden p-4 sm:p-5",
          ].join(" ")}
          aria-label="Featured portfolio proof"
        >
          <div className="relative">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className={portfolioBadge.accent}>
                Featured proof
              </span>

              {featuredProject ? (
                <span className={portfolioBadge.muted}>
                  {featuredProject.type}
                </span>
              ) : null}
            </div>

            <PortfolioVisualMockup
              kind={featuredProject?.visual.kind ?? "website-preview"}
              title={featuredProject?.visual.title}
              className="min-h-[320px]"
            />

            {featuredProject ? (
              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[#181612]/75 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={portfolioBadge.base}>
                    Web Platforms
                  </span>
                  <span className={portfolioBadge.muted}>
                    {featuredProject.status}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
                  {featuredProject.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/64">
                  {featuredProject.proofStatement}
                </p>
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </section>
  );
}