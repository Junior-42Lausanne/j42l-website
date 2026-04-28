import { PortfolioHero } from "@/sections/portfolio/components/PortfolioHero";
import { PortfolioServiceExplorer } from "@/sections/portfolio/components/PortfolioServiceExplorer";
import { portfolioLayout } from "@/sections/portfolio/styles/portfolioStyles";

export default function PortfolioPage() {
    return (
        <main className={portfolioLayout.page}>
            <PortfolioHero />
            <PortfolioServiceExplorer />
        </main>
    );
}