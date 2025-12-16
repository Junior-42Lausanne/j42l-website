import ButtonLink from "./sub_components/Button";
import { ThemeColor } from "@/app/utils/type";
import StrapiImage, { StrapiImageProps } from "./sub_components/StrapiImage"

export type HeroSectionProps = {
	blocks: {
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
	},
}

export default function HeroSection({ blocks }: Readonly<HeroSectionProps> ) {
	const { heading, subheading, backgroundImage, button, triangleColor } = blocks;
	if (!heading || !subheading || !backgroundImage || !triangleColor) {
		return null;
	}

	const styles = {
		section: "relative h-screen overflow-hidden",
		background: "absolute inset-0 object-cover w-full h-full -z-10",
		centerDiv: "flex flex-row bg-cover bg-center pl-[6.25rem] pr-[6.25rem] pt-[6.25rem] pb-[3.75rem] gap-[5rem] h-full",
		leftTriangleDiv: "flex flex-col justify-start items-start",
		contentWrap: "flex flex-col font-poppins text-white text-center justify-center items-center gap-[5rem]",
		textWrap: "flex flex-col items-center",
		heading: "text-h1 leading-[1.1]",
		subheading: "text-h5 pt-[2.5rem] w-4/5",
		rightTriangleDiv: "flex flex-col justify-end items-end",
	}
	
	return (
		<div className={styles.section}>
			<StrapiImage
					alternativeText={backgroundImage.alternativeText}
					className={styles.background}
					height={1080}
					url={backgroundImage.url}
					width={1920}
			/>
			<div className={styles.centerDiv}>
				<div className={styles.leftTriangleDiv}>
					<div className={`w-0 h-0 border-t-[6rem] border-r-[6rem] border-${triangleColor} border-r-transparent`}></div>
				</div>
				<div className={styles.contentWrap}>
					<div className={styles.textWrap}>
						<h1 className={styles.heading}>{heading}</h1>
						{subheading
							? (<div className={styles.subheading}>{subheading}</div>)
							: null
						}
					</div>
					{button
						? (<ButtonLink {...button}>
							{button.buttonText}
							</ButtonLink>
						) : null
					}
				</div>
				<div className={styles.rightTriangleDiv}>
					<div className={`w-0 h-0 border-l-[6rem] border-b-[6rem] border-${triangleColor} border-l-transparent`}></div>
				</div>
			</div>
		</div>
	)
}