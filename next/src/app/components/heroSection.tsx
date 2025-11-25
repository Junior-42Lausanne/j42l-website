import CustomButton from "./customButton";
import {Color} from "./type";
import Image from 'next/image';

export interface HeroProps {
	background: string;
	title: string;
	subTitle: string;
	buttonText: string;
	buttonPath: string;
	triangleColor: Color;
	haveSubtile?: boolean;
}

export default function HeroSection({
	background,
	title,
	subTitle,
	buttonText,
	buttonPath,
	triangleColor,
	haveSubtile = false
	}: HeroProps) {
	let trianglePath: string;
	if (triangleColor === Color.orange)
		trianglePath = "/graphic/elements/svg/triangle orange.svg";
	else
		trianglePath = "/graphic/elements/svg/triangle white.svg";
	return (
		<div className="flex flex-row bg-cover bg-center 
						pl-[150px] pr-[150px] pt-[100px] pb-[60px] gap-[80px] h-screen"
    					style={{backgroundImage:`url("${background}")`}}>
			<div className="flex flex-col items-start">
				<Image src={trianglePath} alt="triangle" width={200} height={200}/>
			</div>
			<div className="flex flex-col font-poppins text-white text-center justify-center gap-[80px]">
				<div className="place-items-center">
					<h1 className="text-h1 w-4/5">{title}</h1>
					<div className="text-h5 pt-[20px] w-1/2">{subTitle}</div>
				</div>
				<CustomButton text={buttonText} path={buttonPath} color={Color.white}/>
			</div>
			<div className="flex flex-col justify-end items-end">
				<Image className="rotate-180" src={trianglePath} alt="triangle" width={200} height={200}/>
			</div>
		</div>
	)
}