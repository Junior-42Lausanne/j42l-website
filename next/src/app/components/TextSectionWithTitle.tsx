import ButtonLink from "./sub_components/Button"
import StrapiImage from "./sub_components/StrapiImage";
import { TextSectionProps } from "@/app/components/TextSection"
import SectionTitle from "./sub_components/SectionTitle";
import { ThemeColor } from "../utils/type";
// BlocksRenderer to render JSON Rich text
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

/*
* Text section
* Compose of side image, title, long text and a button
*/
export type TextSectionWithTitleProps = {
	blocks: Omit<TextSectionProps["blocks"], "title"> & {
		title: {
			title: string;
			color: ThemeColor;
		};
		imagePosition: string,
	};
};

export default function TextSectionWithTitle({ blocks }: TextSectionWithTitleProps) {
	const {title, text, image, button, textColor, backgroundColor, imagePosition} = blocks;

	const styles = {
		section: `flex flex-col bg-${backgroundColor} gap-[50px] py-[150px]`,
		contentWrap: `flex gap-[80px] items-center justify-center`,
		imageWrap: "w-1/3",
		image: {
			className: "relative h-full",
			style: { aspectRatio: `${image.width}/${image.height}` },
		},
		textWrap: "flex flex-col items-center w-2/5",
		text: `prose pt-[20px] mb-[60px] font-poppins text-${textColor} text-h5 whitespace-pre-wrap`,
	}

	return(
		<div className={styles.section}>
			<div>
				<SectionTitle color={title.color}>
					{title.title}
				</SectionTitle>
			</div>
			<div className={styles.contentWrap}>
				{ imagePosition === "left" && (
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
				)}
				<div className={styles.textWrap}>
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
				{ imagePosition === "right" && (
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
				)}
			</div>
		</div>
	)
}
