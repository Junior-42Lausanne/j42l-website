import Image from 'next/image';
import { getStrapiMedia } from '@/app/utils/utils'; 

/*
* Strapi Image
*/
export type StrapiImageProps = {
	id?: string,
	url: string,
	alternativeText: string,
	height?: number,
	width?: number,
	className?: string,
}

/*
* Component for image
* url: path to image
* alternativeText: alt text for image
* height: image height, currently not used, fill is used. Optional field
* width: image width, currently not used, fill is used. Optional field
* className: Tailwind. Optional field
*/
export default function StrapiImage({
	id,
	url,
	alternativeText,
	height,
	width,
	className
}: Readonly<StrapiImageProps>) {
	const isRemote = typeof url === "string" && url.startsWith("/uploads");
	const imageUrl = isRemote ? getStrapiMedia(url) : url;

	return (
		<Image
			src={imageUrl}
			alt={alternativeText}
			fill
			className={className}
			unoptimized
		/>
	)
}