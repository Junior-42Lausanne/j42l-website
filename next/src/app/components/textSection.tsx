import ButtonLink, { ButtonProps } from "./sub_components/button"
import { StrapiImage } from "./sub_components/strapiImage";
import { ThemeColor, StrapiImageType } from "@/app/utils/type"

/*
* Text section
* Compose of side image, title, long text and a button
*/
export type TextSectionProps = {
	title: string,
	text: string,
	image: StrapiImageType,
	button: ButtonProps,
	textColor: ThemeColor,
	backgroundColor: ThemeColor,
}

export default function TextSection({
	title,
	text,
	image,
	button,
	textColor,
	backgroundColor,
}: TextSectionProps) {
	return(
		<div className={`flex bg-${backgroundColor} pt-[100px] pb-[100px] gap-[150px] items-center justify-center`}>
			<div className="w-1/5">
				<div className="relative w-full"
								style={{ aspectRatio: `${image.width}/${image.height}` }}>
					<StrapiImage
						alt={image.alt}
						className=""
						height={image.height}
						source={image.source}
						width={image.width}
					/>
				</div>
			</div>
			<div className="flex flex-col items-center w-2/5">
				<div className={`font-poppins text-${textColor} text-h2 text-center`}>
					<h2>{title}</h2>
				</div>
				<div className={`pt-[20px] mb-[60px] font-poppins text-${textColor} text-h5 whitespace-pre-wrap`}>
					<p>{text}</p>
				</div>
				<ButtonLink {...button}/>
			</div>	
		</div>
	)
}
