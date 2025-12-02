import Image from 'next/image';
import {getStrapiMedia} from '@/app/utils/utils'; 
import {StrapiImageType} from "@/app//utils/type";

/*
* Component for image
* src: path to image
* alt: alt text for image
* height: image height, currently not used, fill is used. Optional field
* width: image width, currently not used, fill is used. Optional field
* className: Tailwind. Optional field
*/
export function StrapiImage({
	source,
	alt,
	height,
	width,
	className
}: Readonly<StrapiImageType>) {
	const isRemote = typeof source === "string" && source.startsWith("/uploads");
	const imageUrl = isRemote ? getStrapiMedia(source) : source;

	return (
		<Image
			src={imageUrl}
			alt={alt}
			fill
			className={className}
			unoptimized
		/>
	)

}