
import { PortfolioHero } from "@/sections/portfolio/components/PortfolioHero";
import { portfolioLayout } from "@/sections/portfolio/styles/portfolioStyles";

export default function PortfolioPage() {
  return (
    <main className={portfolioLayout.page}>
      <PortfolioHero />
    </main>
  );
}