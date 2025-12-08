import TextSection from "./components/textSection"
import ServiceSection from "./components/serviceSection"
import HeroSection from "./components/heroSection"
import PortfolioSection from "./components/portfolioSection"
import ContactSection from "./components/ContactSection"
import getHero from "./logic/hero"
import getTextSection from "./logic/textSection"
import {homeHeroDefault, textSectionDefault} from "./homeDefault"
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
  const textSection1 = getTextSection(strapiData, textSectionDefault);

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
      <ContactSection
				text= "Réalisez votre projet de rêve avec nous!"
				button={{
					text: "Contactez-Nous",
					path: "https://www.google.com",
					color: 'orange'
				}}
			/>
    </div>
  )
}

