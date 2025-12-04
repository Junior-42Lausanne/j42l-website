import Image from 'next/image';
import { ComponentProps } from "react";
import { getStrapiMedia } from '@/app/utils/utils'; 

/*
* Strapi Image
*/
export type StrapiImageProps = {
	id?: string,
	url: string,
	alternativeText: string | null,
} & Omit<ComponentProps<typeof Image>, "src" | "alt">;

/*
* Component for image
* id: use as key for map()
* url: path to image
* alternativeText: alt text for image
* className: Tailwind. Optional field
*/
export default function StrapiImage({
	url,
	alternativeText,
	className,
}: Readonly<StrapiImageProps>) {
	const isRemote = typeof url === "string" && url.startsWith("/uploads");
	const imageUrl = isRemote ? getStrapiMedia(url) : url;

	return (
		<Image
			src={imageUrl}
			alt={alternativeText ?? "No alternative text provided"}
			fill
			className={className}
			unoptimized
		/>
	)
}