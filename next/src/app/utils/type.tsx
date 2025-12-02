export type Color = 'orange' | 'white' | 'black';

/*
* this is for Tailwind reference
* because eg:`border-{$color}` won't be expanded correctly without
*/
const tailwindColor = [
  "border-orange",
  "border-white",
  "border-black",
  "text-orange",
  "text-white",
  "text-black",
  "bg-orange",
  "bg-white",
  "bg-black",
];

/*
* yes, this is button
*/
export type ButtonType = {
	text: string,
	path: string,
	color: Color,
	fullWidth: boolean,
	external: boolean,
}

export type NavBarLinkType = {
	text: string,
	url: string,
	external: boolean,
}

export type logoType = {
	logo: StrapiImageType,
	url: string,
	external: boolean,
}

export type socialType = {
	icon: StrapiImageType,
	url: string,
	external: boolean,
}

export type NavBarType = {
	logo: logoType,
	navBarMenu: NavBarLinkType[],
	cta: ButtonType,
	social: socialType[],
}

/*
* Hero section (Landing section) for every page
*/
export type HeroType = {
	heroHeading: string,
	heroSubHeading: string,
	heroButton: ButtonType,
	heroBackground: StrapiImageType,
}

/*
* Text section
* Compose of side image, title, long text and a button
*/
export type TextSectionType = {
	textSectionTitle: string,
	textSectionText: string,
	textSectionImage: StrapiImageType,
	textSectionButton: ButtonType,
	textSectionTextColor: Color,
	textSectionBackgroundColor: Color,
}

export type FooterCTAType = {
	footerCTAText: string,
	footerCTAButton: ButtonType,
}

/*
* Strapi Image
*/
export type StrapiImageType = {
	source: string,
	alt: string,
	height?: number,
	width?: number,
	className?: string,
}

/*
* Strapi long text
*/
export type StrapiRawText = {
	type?: string,
	children?: {
		type?: string,
		text?: string,
	}[],
}[]