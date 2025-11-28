import Image from 'next/image';
import { getStrapiMedia } from '../../utils'; 
import {StrapiImageType} from "../type";

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
			height={height}
			width={width}
			className={className}
		/>
	)
}