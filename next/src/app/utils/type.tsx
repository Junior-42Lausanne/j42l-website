export type ThemeColor = 'orange' | 'white' | 'black';

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