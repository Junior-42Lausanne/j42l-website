import Button, { buttonType } from "./sub_components/button";
import {Color, StrapiImageType} from "./type";
import Image from 'next/image';
import {StrapiImage} from "./sub_components/strapiImage"

export interface HeroProps {
	background: StrapiImageType;
	title: string;
	subTitle: string;
	triangleColor?: Color;
	haveSubtile?: boolean;
	button: buttonType;
}

export default function HeroSection({
	background,
	title,
	subTitle,
	triangleColor = 'white',
	haveSubtile = false,
	button
	}: HeroProps) {
	let trianglePath: string;
	if (triangleColor === 'orange')
		trianglePath = "/graphic/elements/svg/triangle orange.svg";
	else
		trianglePath = "/graphic/elements/svg/triangle white.svg";
	return (
		<div className="relative h-screen">
			<StrapiImage
					alt={background.alt}
					className="absolute inset-0 object-cover w-full h-full -z-10"
					height={1080}
					src={background.src}
					width={1920}
			/>
			<div className="flex flex-row bg-cover bg-center pl-[150px] pr-[150px] pt-[100px] pb-[60px] gap-[80px] h-full">
				<div className="flex flex-col items-start">
					<Image src={trianglePath} alt="triangle" width={200} height={200}/>
				</div>
				<div className="flex flex-col font-poppins text-white text-center justify-center gap-[80px]">
					<div className="place-items-center">
						<h1 className="text-h1 w-4/5">{title}</h1>
						{haveSubtile && (
						<div className="text-h5 pt-[20px] w-1/2">{subTitle}</div>)}
					</div>
					<Button {...button}/>
				</div>
				<div className="flex flex-col justify-end items-end">
					<Image className="rotate-180" src={trianglePath} alt="triangle" width={200} height={200}/>
				</div>
			</div>
		</div>
	)
}