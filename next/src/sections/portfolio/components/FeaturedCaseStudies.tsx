import { ProjectCard } from "@/sections/portfolio/components/ProjectCard";
import { portfolioData } from "@/sections/portfolio/data/portfolio.mock";
import type {
  PortfolioLocale,
  PortfolioProject,
  PortfolioServiceId,
} from "@/sections/portfolio/types/portfolio.types";
import { portfolioLayout, portfolioText } from "@/sections/portfolio/styles/portfolioStyles";

type FeaturedCaseStudiesProps = {
  locale?: PortfolioLocale;
};

export function FeaturedCaseStudies({
  locale = "en",
}: FeaturedCaseStudiesProps) {
  const featuredProjects = portfolioData.projects
    .filter((project) => project.isFeatured)
    .sort(sortFeaturedProjects)
    .slice(0, 3);

  return (
    <section
      id="featured-case-studies"
      className={portfolioLayout.section}
    >
      <div className="mb-10 grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
        <div>
          <span className={portfolioText.eyebrow}>
            Featured case studies
          </span>

          <h2 className={`${portfolioText.h2} mt-4`}>
            Selected proofs, not decorative projects.
          </h2>
        </div>

        <p className={`${portfolioText.body} max-w-2xl lg:justify-self-end`}>
          These case studies are selected because they demonstrate a concrete
          service capability: strategy, interface design, technical execution or
          operational impact.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            serviceLabel={getServiceLabel(project.serviceId)}
            locale={locale}
            index={index}
            variant="featured"
          />
        ))}
      </div>
    </section>
  );
}

function sortFeaturedProjects(
  firstProject: PortfolioProject,
  secondProject: PortfolioProject,
) {
  return (firstProject.featuredOrder ?? 999) - (secondProject.featuredOrder ?? 999);
}

function getServiceLabel(serviceId: PortfolioServiceId) {
  const service = portfolioData.services.find(
    (currentService) => currentService.id === serviceId,
  );

  if (!service) {
    return "Service";
  }

  if (service.label.length > 22) {
    return service.shortLabel;
  }

  return service.label;
}