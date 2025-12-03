import ButtonLink from "./sub_components/button";
import { ThemeColor } from "@/app/utils/type";
import StrapiImage, { StrapiImageProps } from "./sub_components/strapiImage"

export type HeroSectionProps = {
	hero: {
		heading: string,
		subheading: string,
		backgroundImage: StrapiImageProps,
		button: {
			url: string;
			color: ThemeColor;
			fullWidth?: boolean;
			external?: boolean;
			buttonText: string;
		},
		triangleColor: ThemeColor,
	},
}

/*
* Component for hero section of every page
*/
export default function HeroSection({ hero }: Readonly<HeroSectionProps> ) {
	const { heading, subheading, backgroundImage, button, triangleColor } = hero;
	return (
		<div className="relative h-screen">
			<StrapiImage
					alternativeText={backgroundImage.alternativeText}
					className="absolute inset-0 object-cover w-full h-full -z-10"
					height={1080}
					url={backgroundImage.url}
					width={1920}
			/>
			<div className="flex flex-row bg-cover bg-center pl-[100px] pr-[100px] pt-[100px] pb-[60px] gap-[80px] h-full">
				<div className="flex flex-col justify-start items-start">
					<div className={`w-0 h-0 border-t-[6rem] border-r-[6rem] border-${triangleColor} border-r-transparent`}></div>
				</div>
				<div className="flex flex-col font-poppins text-white text-center justify-center items-center gap-[80px]">
					<div className="flex flex-col items-center">
						<h1 className="text-h1 leading-[1.1]">{heading}</h1>
						{subheading && (
						<div className="text-h5 pt-[40px] w-4/5">{subheading}</div>)}
					</div>
					<ButtonLink {...button}>
						{button.buttonText}
					</ButtonLink>
				</div>
				<div className="flex flex-col justify-end items-end">
					<div className={`w-0 h-0 border-l-[6rem] border-b-[6rem] border-${triangleColor} border-l-transparent`}></div>
				</div>
			</div>
		</div>
	)
}