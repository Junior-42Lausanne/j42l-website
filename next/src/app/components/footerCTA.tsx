import CustomButton, {buttonProps} from "./customButton"

export interface footerCtaProps {
	text: string;
	buttonText: string;
	buttonPath: string;
}

export default function footerCTA(content: footerCtaProps) {
	return (
		<div className="flex flex-row pt-[100px] pb-[100px] justify-center">
			<div className="flex flex-col h-[500px] items-start">
				<img className="w-[100px]" src="/graphic/elements/svg/triangle orange.svg" />
			</div>
			<div className="flex flex-col items-center justify-center gap-[80px]">
				<h1 className="font-poppins text-center text-black text-h2 place-items-center">{content.text}</h1>
				<CustomButton text={content.buttonText} path={content.buttonPath} color="orange" />
			</div>
			<div className="flex flex-col justify-end items-end">
				<img className="w-[100px] rotate-180" src="/graphic/elements/svg/triangle orange.svg" />
			</div>
		</div>
	)
}