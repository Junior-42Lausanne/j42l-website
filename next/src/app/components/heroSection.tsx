import CustomButton, {buttonProps} from "./customButton";

export interface HeroProps {
	background: string;
	title: string;
	subTitle: string;
	buttonText: string;
	buttonPath: string;
	haveSubtile: boolean;
	triangleColor: string;
}

export default function heroSection(content: HeroProps) {
	let trianglePath;
	if (content.triangleColor === "orange")
		trianglePath = "/graphic/elements/svg/triangle orange.svg";
	else
		trianglePath = "/graphic/elements/svg/triangle white.svg";
	return (
		<div className="flex flex-row h-[750px] bg-cover bg-center 
						pl-[150px] pr-[150px] pt-[100px] pb-[60px] gap-[80px] h-screen"
    					style={{backgroundImage:`url("${content.background}")`}}>
			<div className="flex flex-col items-start">
				<img className="w-[200px]" src={trianglePath} />
			</div>
			<div className="flex flex-col font-poppins text-white text-center justify-center gap-[80px]">
				<div className="place-items-center">
					<h1 className="text-h1 w-4/5">{content.title}</h1>
					<div className="text-h5 pt-[20px] w-1/2">{content.subTitle}</div>
				</div>
				<CustomButton text={content.buttonText} path={content.buttonPath} color="white" />
			</div>
			<div className="flex flex-col justify-end items-end">
				<img className="w-[200px] rotate-180" src={trianglePath} />
			</div>
		</div>
	)
}