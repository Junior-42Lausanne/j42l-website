import StrapiImage, { StrapiImageProps } from "@/components/StrapiImage";

export type PartnerProps = {
	id : number,
	partnerLogo : StrapiImageProps,
	partnerLink? : string,
}

export default function Partner({
	partnerLogo,
	partnerLink,
} : PartnerProps) {
	return (
		<div className="relative grayscale w-[10rem] \
						md:w-[7rem] \
						lg:w-[10rem] \
						hover:grayscale-0 transition duration-200 transform hover:scale-120 ease-out"
				style={{ aspectRatio: `${partnerLogo.width}/${partnerLogo.height}` }}>
			{
				partnerLink ? (
					<a href={partnerLink} target="_blank">
						<StrapiImage
							alternativeText={partnerLogo.alternativeText}
							className=""
							height={partnerLogo.height}
							url={partnerLogo.url}
							width={partnerLogo.width} />
					</a>
				) : (
					<StrapiImage
						alternativeText={partnerLogo.alternativeText}
						className=""
						height={partnerLogo.height}
						url={partnerLogo.url}
						width={partnerLogo.width} />
				)
			}
		</div>
	)
}