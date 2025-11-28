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