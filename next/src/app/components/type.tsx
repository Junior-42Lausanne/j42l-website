export type Color = 'orange' | 'white' | 'black';

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

export type ButtonType = {
	text: string,
	path: string,
	color?: Color,
	fullWidth?: boolean,
}

export type Hero = {
	heroHeading: string,
	heroSubHeading: string,
	heroButton: ButtonType,
	heroBackground: StrapiImageType,
}

export type TextSectionType = {
	textSectionTitle: string,
	textSectionText: string,
	textSectionImage: StrapiImageType,
	textSectionButton: ButtonType,
}

export type StrapiImageType = {
	src: string | null,
	alt: string,
	height: number,
	width: number,
	className?: string,
}

export type StrapiRawText = {
	type?: string,
	children?: {
		type?: string,
		text?: string,
	}[],
}[]