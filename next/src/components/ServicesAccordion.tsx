import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import ButtonLink from "./ButtonLink"
import StrapiImage, { StrapiImageProps } from "./StrapiImage";
import { type ThemeColor } from "../utils/type"
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

export type ServicesAccordionProps = {
	id: number,
  triggerbg: StrapiImageProps,
	title: string,
	text: BlocksContent,
	image: StrapiImageProps,
	ctaButton?: {
		url: string;
		color: ThemeColor;
		fullWidth?: boolean;
		external?: boolean;
		buttonText: string;
	},
}

export default function ServicesAccordion({
  triggerbg,
  title,
  text,
  image,
  ctaButton
}: ServicesAccordionProps) {

  const styles = {
		section: "w-full md:w-[47.5rem] lg:w-[60rem] xl:w-[70.625rem] mx-auto mb-4 font-poppins",
		accordionContainer: "space-y-6 sm:space-y-12",
		accordionItem: "border-0 rounded-none",
		accordionTrigger: "relative overflow-hidden h-[7.5rem] sm:h-[9.375rem] lg:h-[12.5rem] px-6 sm:px-12 lg:px-16 py-6 sm:py-8 hover:no-underline group transition-all duration-300 hover:shadow-md/30",
    accordionTriggerBgOverlay : "absolute h-full w-full top-0 inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/10",
    triggerBgWrapper: "absolute inset-0 z-0",
    triggerBgImg: "absolute inset-0 w-full h-full object-cover pointer-events-none",
    triggerContainer: "relative flex h-full w-full items-start",
    triggerHeader: "text-white font-bold text-h4 xl:text-h2 leading-tight text-left pr-4",
    triggerChevron: "pointer-events-none absolute",
    triggerChevronSvg: "text-white w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 transition-transform duration-300 [transform-box:fill-box] [transform-origin:25%] group-data-[state=open]:rotate-90",
    triggerChevronPath: "",
    accordionContent: "bg-[#FFE6C433] p-6 flex flex-col gap-12 sm:gap-16 lg:gap-20 items-center",
    accordionContentContainer: "flex flex-col lg:flex-row gap-8 lg:gap-10 items-start w-full",
    accordionContentBlock: "prose flex-1 flex flex-col gap-8 lg:gap-10 text-h5 xl:text-h4",
    accordionContentImage: "w-full h-[18.75rem] lg:w-md  sm:h-[21.875rem] lg:h-[26.7rem] shrink-0 relative overflow-hidden",
	};

  return (
    <section className={styles.section}>
      <Accordion type="single" collapsible className={styles.accordionContainer}>
          <AccordionItem value={title} className={styles.accordionItem}>
            <AccordionTrigger className={styles.accordionTrigger}>
              <div className={styles.triggerBgWrapper}>
                <StrapiImage
                  alternativeText={triggerbg?.alternativeText || ''}
                  className={styles.triggerBgImg}
                  height={triggerbg.height}
                  url={triggerbg.url}
                  width={triggerbg.width}
                />
              </div>
              <div className={styles.accordionTriggerBgOverlay} />
              <div className={styles.triggerContainer}>
                <h3 className={styles.triggerHeader}>{title}</h3>
                <div className={styles.triggerChevron} style={{bottom: 0, right: 0}}>
                  <svg
                    className={styles.triggerChevronSvg}
                    viewBox="0 0 30 45"
                    fill="currentColor"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      className={styles.triggerChevronPath}
                      d="M3.07324e-05 42.2632L21.2132 21.05L0.163208 0L3.07324e-05 42.2632Z" />
                  </svg>
                </div>
               </div>
            </AccordionTrigger>

            <AccordionContent className={styles.accordionContent}>
              <div className={styles.accordionContentContainer}>
                <article className={styles.accordionContentBlock}>
                  <BlocksRenderer content={text} />
                </article>
                <div className={styles.accordionContentImage}>
                  <StrapiImage
                    alternativeText={image?.alternativeText || ''}
                    className=""
                    height={image.height}
                    url={image.url}
                    width={image.width} />
                </div>
              </div>
              { ctaButton
                ? (<ButtonLink {...ctaButton}>
                  {ctaButton.buttonText}
                  </ButtonLink>
                ) : (
                  null
                )
              }
            </AccordionContent>
          </AccordionItem>
      </Accordion>
    </section>
  );
}