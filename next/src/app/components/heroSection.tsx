import Button from "./sub_components/button";
import {Color, StrapiImageType, ButtonType} from "../utils/type";
import {StrapiImage} from "./sub_components/strapiImage"

export interface HeroProps {
	background: StrapiImageType,
	title: string,
	subTitle: string,
	haveSubtitle: boolean,
	triangleColor?: Color,
	button: ButtonType,
}

/*
* Component for hero section of every page
* background: background image
* title: Big H1 text
* subTitle: smaller H5 text
* haveSubtitle: have subtitle or not
* triangleColor: color of the triangles. Optional field, default is white
* button: button
*/
export default function HeroSection({
	background,
	title,
	subTitle,
	haveSubtitle,
	triangleColor = 'white',
	button
	}: HeroProps) {
	return (
		<div className="relative h-screen">
			<StrapiImage
					alt={background.alt}
					className="absolute inset-0 object-cover w-full h-full -z-10"
					height={1080}
					src={background.src}
					width={1920}
			/>
			<div className="flex flex-row bg-cover bg-center pl-[100px] pr-[100px] pt-[100px] pb-[60px] gap-[80px] h-full">
				<div className="flex flex-col justify-start items-start">
					<div className={`w-0 h-0 border-t-[6rem] border-r-[6rem] border-${triangleColor} border-r-transparent`}></div>
				</div>
				<div className="flex flex-col font-poppins text-white text-center justify-center items-center gap-[80px]">
					<div className="flex flex-col items-center">
						<h1 className="text-h1 leading-[1.1]">{title}</h1>
						{haveSubtitle && (
						<div className="text-h5 pt-[40px] w-4/5">{subTitle}</div>)}
					</div>
					<Button {...button}/>
				</div>
				<div className="flex flex-col justify-end items-end">
					<div className={`w-0 h-0 border-l-[6rem] border-b-[6rem] border-${triangleColor} border-l-transparent`}></div>
				</div>
			</div>
		</div>
	)
}