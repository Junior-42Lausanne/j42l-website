import TextSection from "./components/textSection"
import ServiceSection from "./components/serviceSection"
import HeroSection from "./components/heroSection"
import PortfolioSection from "./components/portfolioSection"
import FooterCTA from "./components/footerCTA"
import Footer from "./components/footer"
import getHero from "./logic/hero"
import getTextSection from "./logic/textSection"
import getfooterCTA from "./logic/footerCTA"
import {homeHeroDefault, homeTextSectionDefault, homeFooterCTADefault} from "./homeDefault"
import {getStrapiData, query} from "./utils/utils"

/*
* The logic:
* API call for corresponse page
* parse the data for each section object
* pass the object to corresponse component
*/
export default async function Home() {
  let strapiData: unknown;

  try {
    strapiData = await getStrapiData("/api/accueil", query);
  } catch (err) {
    console.error(`Strapi unreachable, using default value. Error: ${err}`);
  }

  const hero = getHero(strapiData, homeHeroDefault);
  const textSection1 = getTextSection(strapiData, homeTextSectionDefault);
  const footerCTA = getfooterCTA(strapiData, homeFooterCTADefault);
  
  return (
    <div>
      <HeroSection background={hero.heroBackground}
                    title={hero.heroHeading}
                    subTitle={hero.heroSubHeading}
                    haveSubtitle={true}
                    triangleColor='orange'
                    button={{...hero.heroButton, color: 'white'}} />
      <TextSection title={textSection1.textSectionTitle}
                    text={textSection1.textSectionText}
                    image={textSection1.textSectionImage}
                    button={{...textSection1.textSectionButton}} />

      <ServiceSection />
      <PortfolioSection />
      <div className="h-[700px] bg-black"></div>


      <FooterCTA  footerCTAText= {footerCTA.footerCTAText}
                  footerCTAButton={{...footerCTA.footerCTAButton}} />

      <Footer />
    </div>
  )
}

