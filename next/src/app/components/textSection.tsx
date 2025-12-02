import Button from "./sub_components/button"
import {TextSectionType} from "../utils/type"; 
import {StrapiImage} from "./sub_components/strapiImage";


export default function TextSection({
	textSectionTitle,
	textSectionText,
	textSectionImage,
	textSectionButton,
	textSectionTextColor,
	textSectionBackgroundColor
}: TextSectionType) {
  return(
	<div className={`flex bg-${textSectionBackgroundColor} pt-[100px] pb-[100px] gap-[150px] items-center justify-center`}>
		<div className="w-1/5">
			<div className="relative w-full"
							style={{ aspectRatio: `${textSectionImage.width}/${textSectionImage.height}` }}>
				<StrapiImage
					alt={textSectionImage.alt}
					className=""
					height={textSectionImage.height}
					src={textSectionImage.src}
					width={textSectionImage.width}
				/>
			</div>
		</div>
		<div className="flex flex-col items-center w-2/5">
			<div className={`font-poppins text-${textSectionTextColor} text-h2 text-center`}>
				<h2>{textSectionTitle}</h2>
			</div>
			<div className={`pt-[20px] mb-[60px] font-poppins text-${textSectionTextColor} text-h5 whitespace-pre-wrap`}>
				<p>{textSectionText}</p>
			</div>
			<Button {...textSectionButton}/>
		</div>	
	</div>
  )
}
