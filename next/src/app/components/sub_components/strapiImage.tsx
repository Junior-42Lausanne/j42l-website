import Image from 'next/image';
import {getStrapiMedia} from '../../utils/utils'; 
import {StrapiImageType} from "../../utils/type";

/*
* Component for image
* src: path to image
* alt: alt text for image
* height: image height, currently not used, fill is used. Optional field
* width: image width, currently not used, fill is used. Optional field
* className: Tailwind. Optional field
*/
export function StrapiImage({
	src,
	alt,
	height,
	width,
	className
}: Readonly<StrapiImageType>) {
	const fallback = "/stock_photo/home_background.jpg";
	const isRemote = typeof src === "string" && src.startsWith("/uploads");
	const imageUrl = isRemote ? getStrapiMedia(src) : null;

	return (
		<Image
			src={imageUrl ?? fallback}
			alt={alt}
			fill
			className={className}
			unoptimized
		/>
	)

}