import {Hero} from "../components/type"

export default function getHomeHero(strapiData: any): Hero {
	const heroArray = strapiData.data.hero;

	const heroDefault = {
		heroHeading: "Votre vision réalisée par les étudiants de 42 Lausanne",
		heroSubHeading: "Propulsant l'innovation en tant que plus grande Junior Entreprise du réseau 42 – où de jeunes consultants IT donnent vie à vos projets digitaux.",
		heroButtonText: "nos Services",
		heroButtonPath: "https://www.google.com",
		heroBackgroundImage: "/stock photo/home background.jpg"
	}

	if (heroArray && heroArray.length > 0) {
		return {
			heroHeading: heroArray[0].heading ?? heroDefault.heroHeading,
			heroSubHeading: heroArray[0].subheading ?? heroDefault.heroSubHeading,
			// heroButtonText: heroArray[0].button[0] ?? heroDefault.heroButtonText,
			// heroButtonPath: heroArray[0].button[1] ?? heroDefault.heroButtonPath,
			heroButtonText: heroDefault.heroButtonText,
			heroButtonPath: heroDefault.heroButtonPath,
			heroBackgroundImage: heroArray[0].backgroundImage ?? heroDefault.heroBackgroundImage
		}
	}
	  
	return heroDefault;
}