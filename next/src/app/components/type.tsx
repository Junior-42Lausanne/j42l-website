export type Color = 'orange' | 'white';

export type Hero = {
	heroHeading: string,
	heroSubHeading: string,
	heroButtonText: string,
	heroButtonPath: string,
	heroBackground: StrapiImageType
}

export type StrapiImageType = {
	src: string | null;
	alt: string;
	height: number;
	width: number;
	className?: string;
}