import ButtonLink from "./sub_components/Button"
import StrapiImage, { StrapiImageProps } from "./sub_components/StrapiImage";
import { ThemeColor } from "@/app/utils/type"
// BlocksRenderer to render JSON Rich text
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

/*
* Text section
* Compose of side image, title, long text and a button
*/
export type TextSectionProps = {
	id: number,
	__component: "layout.text-section",
	title: string,
	text: BlocksContent,
	image: StrapiImageProps,
	button?: {
		url: string;
		color: ThemeColor;
		fullWidth?: boolean;
		external?: boolean;
		buttonText: string;
	},
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
	const styles = {
		section: `flex bg-${backgroundColor} pt-[6.25rem] pb-[6.25rem] gap-[9.375rem] items-center justify-center`,
		imageWrap: "w-1/5",
		image: {
			className: "relative w-full",
			style: { aspectRatio: `${image.width}/${image.height}` },
		},
		textWrap: "flex flex-col items-center w-2/5",
		title: `font-poppins text-${textColor} text-h2 text-center`,
		text: `prose pt-[1.25rem] mb-[3.75rem] font-poppins text-${textColor} text-h5 whitespace-pre-wrap`,
	}

	return(
		<div className={styles.section}>
			<div className={styles.imageWrap}>
				<div className={styles.image.className} style={styles.image.style}>
					<StrapiImage
						alternativeText={image.alternativeText}
						className=""
						height={image.height}
						url={image.url}
						width={image.width} />
				</div>
			</div>
			<div className={styles.textWrap}>
				<div className={styles.title}>
					<h2>{title}</h2>
				</div>
				<div className={styles.text}>
					<BlocksRenderer content={text} />
				</div>
				{ button
					? (<ButtonLink {...button}>
						{button.buttonText}
						</ButtonLink>
					) : (
						null
					)
				}
			</div>	
		</div>
	)
}
