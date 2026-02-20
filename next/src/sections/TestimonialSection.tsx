import { ThemeColor } from "@/utils/type";
import StrapiImage, { StrapiImageProps } from "@/components/StrapiImage";

export type TestimonialSectionProps = {
	id: number,
	__component: "layout.testimonial-section",
	clientLogo: StrapiImageProps,
	clientLink?: string,
	text: string,
	author?: string,
	backgroundColor: ThemeColor,
	textColor: ThemeColor,
}

export default function TestimonialSection( {
	clientLogo,
	clientLink,
	text,
	author,
	backgroundColor,
	textColor,
} : TestimonialSectionProps){
	const width : number = Number(clientLogo.width) * 1.5;
	const height : number = Number(clientLogo.height) * 1.5;
	
	const styles = {
		section: `flex flex-col px-[1.25rem] py-[2.25rem] gap-[1rem] items-center justify-center \
				md:flex-row md:px-[2rem] md:gap-[2rem] md:pt-[4rem] \
				lg:px-[4.25rem] lg:pt-[6rem] \
				xl:px-[6.25rem]`,
		imageWrap: "w-2/3 \
				md:w-full",
		image: {
			className: "relative w-full",
			style: { aspectRatio: `${clientLogo.width}/${clientLogo.height}` },
		},
		textWrap: `flex flex-col gap-[1rem] font-poppins text-${textColor} items-end text-justify`,
		text: "text-h5 \
			xl:text-h4",
		author: "text-h6 italic\
			xl:text-h5",
	}

	return (
		<div className={styles.section} style={{backgroundColor: `var(--color-${backgroundColor})`}}>
			<div className={styles.imageWrap}>
				<div className={styles.image.className} style={styles.image.style}>
					{clientLink ? (
						<a href={clientLink} target="_blank">
						<StrapiImage
							alternativeText={clientLogo.alternativeText}
							className=""
							height={clientLogo.height}
							url={clientLogo.url}
							width={clientLogo.width} />
						</a>
					) : (
						<StrapiImage
							alternativeText={clientLogo.alternativeText}
							className=""
							height={clientLogo.height}
							url={clientLogo.url}
							width={clientLogo.width} />
					)}
				</div>
			</div>
			<div className={styles.textWrap}>
				<p className={styles.text}>{text}</p>
				<p className={styles.author}>{author}</p>
			</div>
		</div>
	)
}