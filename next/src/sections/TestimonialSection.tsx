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
	
	const styles = {
		section: `flex flex-col px-[1.25rem] py-[2.25rem] gap-[1rem] items-center justify-center \
				md:flex-row md:px-[2rem] md:gap-[2rem] md:pt-[4rem] \
				lg:px-[4.25rem] \
				xl:px-[10rem] xl:gap-[4rem]`,
		imageWrap: "w-[20rem] \
				md:w-[150rem] \
				lg:w-[150rem]",
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
		<section className={styles.section} style={{backgroundColor: `var(--color-${backgroundColor})`}}>
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
			<article className={styles.textWrap}>
				<p className={styles.text}>{text}</p>
				{ author ? (
					<p className={styles.author}>{author}</p>
				) : (null)
				}
			</article>
		</section>
	)
}