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
	const imageUrl = src ? getStrapiMedia(src) : null;
	const fallback = "/stock photo/home background.jpg";

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