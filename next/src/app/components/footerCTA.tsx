import Button from "./sub_components/button"
import {FooterCTAType} from "../utils/type"

/*
* Component for footerCTA of every page
* footerCTAText: text
* footerCTAButton: button
*/
export default function FooterCTA({
	footerCTAText, 
	footerCTAButton,
} : FooterCTAType) {
	return (
		<div className="flex flex-row pt-[100px] pb-[100px] justify-center">
			<div className="flex flex-col justify-start items-start">
				<div className={`w-0 h-0 border-t-[4rem] border-r-[4rem] border-orange border-r-transparent`}></div>
			</div>
			<div className="flex flex-col items-center justify-center gap-[80px] mt-[100px] mb-[100px]">
				<h1 className="font-poppins text-center text-black text-h2 place-items-center w-4/5">{footerCTAText}</h1>
				<Button {...footerCTAButton}/>
			</div>
			<div className="flex flex-col justify-end items-end">
				<div className={`w-0 h-0 border-l-[4rem] border-b-[4rem] border-orange border-l-transparent`}></div>
			</div>
		</div>
	)
}