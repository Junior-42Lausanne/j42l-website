import Image from 'next/image';
import { type ComponentProps } from "react";
import { getStrapiMedia } from '../utils/utils'; 

export type StrapiImageProps = {
	id?: number,
	url: string,
	alternativeText: string | null,
	wrapperClassName?: string,
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
	wrapperClassName,
}: Readonly<StrapiImageProps>) {
	const isRemote = typeof url === "string" && url.startsWith("/uploads");
	const imageUrl = isRemote ? getStrapiMedia(url) : url;

	return (
    <figure className={`relative w-full h-full ${wrapperClassName ?? ""}`} aria-label={alternativeText || ""}>
      <Image
        src={imageUrl}
        alt={alternativeText ?? ""}
        fill
        className={className}
        unoptimized
      />
    </figure>
	)
}