import {HeroType, TextSectionType, FooterCTAType, NavBarType} from "./utils/type";


export const navBarDefault: NavBarType = {
	logo: {
		logo: {
			source: '/graphic/logo/svg/j42_orange_svg.svg',
			alt: 'j42l logo',
			height: 413,
			width: 976,
		},
		url: '/',
		external: false,
	},
	navBarMenu: [
		{
			text: 'Accueil',
			url: '/',
			external: false,
		},
		{
			text: 'Services',
			url: 'api/services',
			external: false,
		},
		{
			text: 'À propos',
			url: 'api/about',
			external: false,
		},
		{
			text: 'Étudiants',
			url: 'api/student',
			external: false,
		},
		{
			text: 'Jobs',
			url: 'https://www.google.com',
			external: true,
		},
		{
			text: 'Game Jam',
			url: 'https://42lsjam.ch/',
			external: true,
		},
	],
	cta: {
		text: 'Contactez-nous',
		path: 'api/contact',
		color: 'white',
		fullWidth: false,
		external: false,
	},
	social: [
		{
			icon: {
				source: '/graphic/icon/svg/Linkedin_White.svg',
				alt: 'Linkedin icon',
				height: 135,
				width: 135,
			},
			url: 'https://www.linkedin.com/company/j42l',
			external: true,
		}
	],
}

/*
* default options for Home Hero section
*/
export const homeHeroDefault: HeroType = {
	heroHeading: "Votre vision réalisée par les étudiants de 42 Lausanne",
	heroSubHeading: "Propulsant l'innovation en tant que plus grande Junior Entreprise du réseau 42 – où de jeunes consultants IT donnent vie à vos projets digitaux.",
	heroButton: {
		text: "Nos Services",
		path: "https://www.bing.com",
		color: 'white',
		fullWidth: false,
		external: false,
	},
	heroBackground: {
		source: "/stock_photo/home_background.jpg",
		alt: "Orange dot connection background",
		height: 5000,
		width: 4000,
	}
}

/*
* default options for Home Text + Photo section
*/
export const homeTextSectionDefault : TextSectionType = {
	textSectionTitle: "Bienvenue",
	textSectionText: `La Junior 42 Lausanne (J42L) est une association étudiante affiliée au réseau Junior Enterprises Switzerland.

Composée d’étudiants passionnés de 42 Lausanne, et étant la plus grande Junior Entreprise du réseau mondial 42, notre mission est d’offrir des solutions informatiques de qualité, allant de la conceptualisation à des développements sur mesure. 
En étroite collaboration avec 42 Lausanne, nous donnons vie à des projets innovants, reliant éducation et industrie au sein de l’écosystème 42.`,
	textSectionImage: {
		source: "/graphic/elements/svg/J_Orange.svg",
		alt: "J42l Symbol",
		height: 188,
		width: 123,
	},
	textSectionButton: {
		text: "Notre Histoire",
		path: "https://www.bing.com",
		color: 'orange',
		fullWidth: false,
		external: false,
	},
	textSectionTextColor: 'black',
	textSectionBackgroundColor: 'white',
}

export const homeFooterCTADefault : FooterCTAType = {
	footerCTAText: 'Réalisez votre projet de rêve avec nous!',
	footerCTAButton: {
		text: 'Contactez-nous',
		path: 'https://www.bing.com',
		color: 'orange',
		fullWidth: false,
		external: false,
	}
}