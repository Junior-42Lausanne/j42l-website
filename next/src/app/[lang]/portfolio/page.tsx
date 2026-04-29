import { BrowseCaseStudies } from "@/sections/portfolio/components/BrowseCaseStudies";
import { CapabilitiesSection } from "@/sections/portfolio/components/CapabilitiesSection";
import { FeaturedCaseStudies } from "@/sections/portfolio/components/FeaturedCaseStudies";
import { PortfolioCTA } from "@/sections/portfolio/components/PortfolioCTA";
import { PortfolioHero } from "@/sections/portfolio/components/PortfolioHero";
import { PortfolioServiceExplorer } from "@/sections/portfolio/components/PortfolioServiceExplorer";
import { ProofPhilosophy } from "@/sections/portfolio/components/ProofPhilosophy";
import { portfolioLayout } from "@/sections/portfolio/styles/portfolioStyles";
import type { PortfolioLocale } from "@/sections/portfolio/types/portfolio.types";
import type { LangParams } from "@/utils/type";

export default async function PortfolioPage({
  params,
}: {
  params: LangParams;
}) {
  const { lang } = await params;
  const locale = lang as PortfolioLocale;

  return (
    <main className={portfolioLayout.page}>
      <PortfolioHero />
      <PortfolioServiceExplorer />
      <FeaturedCaseStudies locale={locale} />
      <BrowseCaseStudies locale={locale} />
      <h1 className="w-400">In progress</h1>
      {/* <ProofPhilosophy /> */}
      {/* <CapabilitiesSection /> */}
      {/* <PortfolioCTA locale={locale} /> */}
    </main>
  );
}