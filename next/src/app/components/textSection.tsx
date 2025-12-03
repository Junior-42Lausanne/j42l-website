import ButtonLink from "./sub_components/button"
import StrapiImage, { StrapiImageProps } from "./sub_components/strapiImage";
import { ThemeColor } from "@/app/utils/type"
import { convertStrapiText } from "@/app/utils/utils";


export type StrapiLongTextProps = {
	type?: string,
	children?: {
		type?: string,
		text?: string,
	}[],
}[];

/*
* Text section
* Compose of side image, title, long text and a button
*/
export type TextSectionProps = {
	blocks: {
		title: string,
		text: StrapiLongTextProps,
		image: StrapiImageProps,
		button: {
			url: string;
			color: ThemeColor;
			fullWidth?: boolean;
			external?: boolean;
			buttonText: string;
		},
		textColor: ThemeColor,
		backgroundColor: ThemeColor,
	};
}

export default function TextSection({ blocks }: TextSectionProps) {
	const {title, text, image, button, textColor, backgroundColor} = blocks;
	const parsedText = convertStrapiText(text);
	return(
		<div className={`flex bg-${backgroundColor} pt-[100px] pb-[100px] gap-[150px] items-center justify-center`}>
			<div className="w-1/5">
				<div className="relative w-full"
								style={{ aspectRatio: `${image.width}/${image.height}` }}>
					<StrapiImage
						alternativeText={image.alternativeText}
						className=""
						height={image.height}
						url={image.url}
						width={image.width}
					/>
				</div>
			</div>
			<div className="flex flex-col items-center w-2/5">
				<div className={`font-poppins text-${textColor} text-h2 text-center`}>
					<h2>{title}</h2>
				</div>
				<div className={`pt-[20px] mb-[60px] font-poppins text-${textColor} text-h5 whitespace-pre-wrap`}>
					<p>{parsedText}</p>
				</div>
				<ButtonLink {...button}>
					{button.buttonText}
				</ButtonLink>
			</div>	
		</div>
	)
}
