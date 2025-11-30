import TextSection from "./components/textSection"
import ServiceSection from "./components/serviceSection"
import HeroSection from "./components/heroSection"
import PortfolioSection from "./components/portfolioSection"
import FooterCTA from "./components/footerCTA"
import Footer from "./components/footer"
import getHomeHero from "./home/homeHero"
import getHomeTextSection from "./home/homeTextSection"
import {getStrapiData} from "./utils"
import qs from "qs"

const homePageQuery = qs.stringify({
  populate: {
    hero: {
      fields: ["heading", "subheading"],
      populate: {
        backgroundImage: {
          fields: ["url", "alternativeText", "width", "height"]
        },
        button: {
          fields: ["buttonText", "url"],
        }
      }
    },
    blocks: {
      populate: "*",
    }
  }
})

export default async function Home() {
  let strapiData: unknown;

  try {
    strapiData = await getStrapiData("/api/accueil", homePageQuery);
  } catch (err) {
    console.error(`Strapi unreachable, using default value. Error: ${err}`);
  }

  const hero = getHomeHero(strapiData);
  const textSection1 = getHomeTextSection(strapiData);
  
  return (
    <div>
      <HeroSection background={hero.heroBackground}
                    title={hero.heroHeading}
                    subTitle={hero.heroSubHeading}
                    triangleColor='orange'
                    haveSubtile={true}
                    button={{...hero.heroButton, color: 'white'}} />
      <TextSection title={textSection1.textSectionTitle}
                    text={textSection1.textSectionText}
                    image={textSection1.textSectionImage}
                    button={{...textSection1.textSectionButton}} />
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

