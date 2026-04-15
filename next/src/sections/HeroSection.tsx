import ButtonLink from "../components/ButtonLink";
import { type ThemeColor } from "../utils/type";
import StrapiImage, { type StrapiImageProps } from "../components/StrapiImage"

export type HeroSectionProps = {
	id: number,
	__component: "layout.hero",
	heading: string,
	subheading?: string,
	backgroundImage: StrapiImageProps,
	button?: {
		url: string;
		color: ThemeColor;
		fullWidth?: boolean;
		external?: boolean;
		buttonText: string;
	},
	triangleColor: ThemeColor,
}

export default function HeroSection({
	heading,
	subheading,
	backgroundImage,
	button,
	triangleColor,
}: Readonly<HeroSectionProps> ) {
	if (!heading || !backgroundImage || !triangleColor) {
		return null;
	}

	const styles = {
		section: "relative h-screen overflow-hidden",
		overlay: "absolute inset-0 bg-black/75 z-0",
		backgroundWrapper: "absolute inset-0 -z-10",
		background: "object-cover w-full h-full",
		centerDiv: "flex flex-col bg-cover bg-center px-[1.25rem] pt-[6.25rem] pb-[3.75rem] gap-[1rem] h-full relative z-5\
					md:px-[2.25rem] \
					lg:px-[4.25rem] \
					xl:px-[6.25rem]",
		leftTriangleDiv: "flex flex-col justify-start items-start",
		leftTriangle: `w-0 h-0 border-t-[4.5rem] border-r-[4.5rem] border-${triangleColor} border-r-transparent \
					md:border-t-[6rem] md:border-r-[6rem]`,
		contentWrap: "flex flex-col flex-grow font-poppins text-white items-center gap-[4rem] w-full whitespace-pre-wrap wrap-anywhere \
					md:text-center md:justify-center",
		textWrap: "flex flex-col items-center pr-[2rem] pl-[2rem] w-full",
		heading: "text-h2 leading-[1.1] \
					md:text-h1 \
					xl:w-2/3",
		subheading: "text-h5 pt-[1rem] w-full \
					md:text-h4 md:pt-[2rem] md:w-4/5 \
					xl:w-2/5",
		rightTriangleDiv: "flex flex-col justify-end items-end",
		rightTriangle: `w-0 h-0 border-b-[4.5rem] border-l-[4.5rem] border-${triangleColor} border-l-transparent \
					md:border-b-[6rem] md:border-l-[6rem]`,
	}
	
	return (
		<section className={styles.section}>
			<div className={styles.backgroundWrapper}>
				<StrapiImage
				alternativeText={backgroundImage.alternativeText}
				className={styles.background}
				height={1080}
				url={backgroundImage.url}
				width={1920}
				/>
			</div>
			<div className={styles.overlay}></div>
			<div className={styles.centerDiv}>
				<div className={styles.leftTriangleDiv}>
					<div className={styles.leftTriangle}></div>
				</div>
				<div className={styles.contentWrap}>
					<header className={styles.textWrap}>
						<h1 className={styles.heading}>{heading}</h1>
						{subheading
							? (<div className={styles.subheading}>{subheading}</div>)
							: null
						}
					</header>
					{button
						? (<ButtonLink {...button}>
							{button.buttonText}
							</ButtonLink>
						) : null
					}
				</div>
				<div className={styles.rightTriangleDiv}>
					<div className={styles.rightTriangle}></div>
				</div>
			</div>
		</section>
	)
}