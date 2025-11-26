import Button, {buttonProps} from "./button"
import Image from 'next/image'

export interface footerCtaProps {
	text: string;
	button: buttonProps;
}

export default function FooterCTA({
	text, 
	button
	} : footerCtaProps) {
	return (
		<div className="flex flex-row pt-[100px] pb-[100px] justify-center">
			<div className="flex flex-col h-[500px] items-start">
				<Image src="/graphic/elements/svg/triangle orange.svg" alt="triangle" width={100} height={100}/>
			</div>
			<div className="flex flex-col items-center justify-center gap-[80px]">
				<h1 className="font-poppins text-center text-black text-h2 place-items-center">{text}</h1>
				<Button {...button}/>
			</div>
			<div className="flex flex-col justify-end items-end">
				<Image className="rotate-180" src="/graphic/elements/svg/triangle orange.svg" alt="triangle" width={100} height={100}/>
			</div>
		</div>
	)
}