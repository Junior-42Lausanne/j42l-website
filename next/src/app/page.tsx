import TextSection from "./components/textSection"
import HeroSection from "./components/heroSection"
import FooterCTA from "./components/footerCTA"
import getHero from "./logic/hero"
import getTextSection from "./logic/textSection"
import getfooterCTA from "./logic/footerCTASection"
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
							button={{...hero.heroButton}} />
			<TextSection textSectionTitle={textSection1.textSectionTitle}
							textSectionText={textSection1.textSectionText}
							textSectionImage={textSection1.textSectionImage}
							textSectionButton={{...textSection1.textSectionButton}}
							textSectionTextColor={textSection1.textSectionTextColor}
							textSectionBackgroundColor={textSection1.textSectionBackgroundColor} />
			<FooterCTA  footerCTAText= {footerCTA.footerCTAText}
						footerCTAButton={{...footerCTA.footerCTAButton}} />
		</div>
	)
}

