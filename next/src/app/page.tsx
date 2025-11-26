import {Color} from "./components/type"
import WelcomeSection from "./components/home/welcomeSection"
import ServiceSection from "./components//home/serviceSection"
import HeroSection from "./components/home/heroSection"
import PortfolioSection from "./components/home/portfolioSection"
import FooterCTA from "./components/footerCTA"
import Footer from "./components/footer"
import getStrapiData from "./utils"

export default async function Home() {
  let heroTitle = "";
  let subtitle = "";

  try {
    const strapiHero = await getStrapiData("/api/accueil?populate=*");
    const heroArray = strapiHero.data.hero;

    if (heroArray && heroArray.length > 0) {
      heroTitle = heroArray[0].title;
      subtitle = heroArray[0].text;
    }
  } catch (err) {
    console.error("Strapi unreachable: " + err);
    heroTitle = "Titre indisponible car fetch fail";
  }

  return (
    <div>
      <HeroSection background="/stock photo/home background.jpg" 
                    title={heroTitle}
                    subTitle={subtitle}
                    buttonText="Nos Services"
                    buttonPath="https://www.google.com" 
                    triangleColor={Color.orange}
                    haveSubtile />
      <WelcomeSection />
      <ServiceSection />
      <PortfolioSection />
      <div className="h-[700px] bg-black"></div>
      <FooterCTA text="Réalisez votre projet de rêve avec nous!"
                buttonText="Contactez-Nous"
                buttonPath="https://www.google.com" />
      <Footer />
    </div>
  )
}

