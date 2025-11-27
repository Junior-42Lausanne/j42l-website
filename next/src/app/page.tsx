import TextSection from "./components/textSection"
import ServiceSection from "./components/serviceSection"
import HeroSection from "./components/heroSection"
import PortfolioSection from "./components/portfolioSection"
import FooterCTA from "./components/footerCTA"
import Footer from "./components/footer"
import {Hero} from "./components/type"
import getHomeHero from "./home/homeHero"
import getStrapiData from "./utils"

export async function Home() {
  let strapiData: any;
  let hero: Hero;

  try {
    strapiData = await getStrapiData("/api/accueil?populate=*");
  } catch (err) {
    console.error("Strapi unreachable during build, using default value");
  }

  hero = getHomeHero(strapiData);

  return (
    <div>
      <HeroSection background={hero.heroBackgroundImage}
                    title={hero.heroHeading}
                    subTitle={hero.heroSubHeading}
                    triangleColor='orange'
                    haveSubtile={true}
                    button={{
                      text: hero.heroButtonText,
                      path: hero.heroButtonPath,
                      color:'white'
                    }} />
      <TextSection />
      <ServiceSection />
      <PortfolioSection />
      <div className="h-[700px] bg-black"></div>
      <FooterCTA  text= "Réalisez votre projet de rêve avec nous!" 
                  button={{
                    text: "Contactez-Nous",
                    path: "https://www.google.com",
                    color: 'orange'
                   }} />
      <Footer />
    </div>
  )
}

