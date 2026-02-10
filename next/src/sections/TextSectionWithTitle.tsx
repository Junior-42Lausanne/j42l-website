import ButtonLink from "../components/ButtonLink"
import StrapiImage, { type StrapiImageProps } from "../components/StrapiImage";
import SectionTitle from "../components/SectionTitle";
import { type ThemeColor } from "../utils/type";
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
		section: `flex flex-col px-[1.25rem] gap-[2rem] py-[6rem] \
				md:px-[2rem] md:py-[6rem] md:gap-[2.125rem] \
				lg:px-[4.25rem] lg:gap-[3.125rem] lg:py-[10rem]\
				xl:px-[6.25rem]`,
		contentWrap: `flex flex-row flex-wrap gap-[3rem] items-center justify-center \
				md:gap-[1rem]`,
		contentWrapReverse: `flex flex-row flex-wrap-reverse gap-[3rem] items-center justify-center \
				md:gap-[1rem]`,
		imageWrap: "w-3/4 \
				md:w-1/3",
		image: {
			className: "relative h-full",
			style: { aspectRatio: `${image.width}/${image.height}` },
		},
		textWrap: "flex flex-col items-center \
				md:w-3/5",
		text: `prose pt-[1.25rem] mb-[3.75rem] font-poppins text-${textColor} text-h5 whitespace-pre-wrap \
				xl:text-h4`,
	}

	return(
		<div className={styles.section} style={{backgroundColor: `var(--color-${backgroundColor})`}}>
			<div>
				<SectionTitle color={title.color}>
					{title.title}
				</SectionTitle>
			</div>
			{ imagePosition === "left" && (
				<div className={styles.contentWrapReverse}>
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
			) }
			{ imagePosition === "right" && (
				<div className={styles.contentWrap}>
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
				</div>	
			) }
		</div>
	)
}
