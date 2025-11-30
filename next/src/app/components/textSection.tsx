import Button from "./sub_components/button"
import {StrapiImageType, ButtonType} from "../components/type"; 
import {StrapiImage} from "./sub_components/strapiImage";

export interface TextSectionProps {
	title: string,
	text: string,
	image:StrapiImageType,
	button:ButtonType,
}

export default function TextSection({
	title,
	text,
	image,
	button,
}: TextSectionProps) {
  return(
	<div className="flex pt-[100px] pb-[100px] gap-[150px] items-center justify-center">
		<div className="w-1/5">
			<div className="relative w-full"
							style={{ aspectRatio: `${image.width}/${image.height}` }}>
				<StrapiImage
					alt={image.alt}
					className=""
					height={image.height}
					src={image.src}
					width={image.width}
				/>
			</div>
		</div>
		<div className="flex flex-col items-center w-2/5">
			<div className="font-poppins text-black text-h2 text-center">
				<h2>{title}</h2>
			</div>
			<div className="pt-[20px] font-poppins text-black text-h5 whitespace-pre-wrap">
				<p>{text}</p>
			</div>
			<div className="pt-[60px]">
				<Button {...button}/>
			</div>
		</div>	
	</div>
  )
}
