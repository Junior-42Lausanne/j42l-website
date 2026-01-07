import ButtonLink from "./sub_components/Button"
import StrapiImage, { StrapiImageProps } from "./sub_components/StrapiImage";
import SectionTitle from "./sub_components/SectionTitle";
import { ThemeColor } from "../utils/type";
// BlocksRenderer to render JSON Rich text
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

export type TextSectionWithTitleProps = {
	id: number,
	__component: "layout.text-section-with-title",
	title: {
		title: string;
		color: ThemeColor;
	};
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
	imagePosition: string,
}

export default function TextSectionWithTitle({
	title,
	text,
	image,
	button,
	textColor,
	backgroundColor,
	imagePosition,
}: TextSectionWithTitleProps) {

	const styles = {
		section: `flex flex-col bg-${backgroundColor} gap-[3.125rem] py-[9.375rem]`,
		contentWrap: `flex gap-[5rem] items-center justify-center`,
		imageWrap: "w-1/3",
		image: {
			className: "relative h-full",
			style: { aspectRatio: `${image.width}/${image.height}` },
		},
		textWrap: "flex flex-col items-center w-2/5",
		text: `prose pt-[1.25rem] mb-[3.75rem] font-poppins text-${textColor} text-h5 whitespace-pre-wrap`,
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
