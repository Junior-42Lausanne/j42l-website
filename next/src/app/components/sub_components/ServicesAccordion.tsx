"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import ButtonLink from "./ButtonLink"
import StrapiImage, { StrapiImageProps } from "./StrapiImage";
import { ThemeColor } from "@/app/utils/type"
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
		section: "w-full md:w-[760px] lg:w-[960px] xl:w-[1130px] mx-auto",
		accordionContainer: "space-y-6 sm:space-y-12",
		accordionItem: "border-0 rounded-none",
		accordionTrigger: "relative h-[120px] sm:h-[150px] lg:h-[200px] px-6 sm:px-12 lg:px-[75px] py-6 sm:py-8 lg:py-[25px] hover:no-underline group transition-all duration-200 shadow-black hover:shadow-md",
    triggerBgImg: "absolute inset-0 w-full h-full object-cover pointer-events-none",
    triggerContainer: "relative flex h-full w-full items-start",
    triggerHeader: "text-white font-bold text-[24px] md:text-[36px] lg:text-[48px] leading-tight text-left pr-4",
    triggerChevron: "pointer-events-none absolute",
    triggerChevronSvg: "text-white w-8 h-8 sm:w-10 sm:h-10 lg:w-[42px] lg:h-[42px] transition-transform duration-300 [transform-box:fill-box] [transform-origin:25%] group-data-[state=open]:rotate-90",
    triggerChevronPath: "",
    accordionContent: "bg-white p-[2em] flex flex-col gap-12 sm:gap-16 lg:gap-20 items-center",
    accordionContentContainer: "flex flex-col lg:flex-row gap-8 lg:gap-[81px] items-start w-full",
    accordionContentBlock: "flex-1 flex flex-col gap-8 lg:gap-[50px]",
    accordionContentImage: "w-full h-[300px] lg:w-[474px]  sm:h-[350px] lg:h-[427px] shrink-0 relative overflow-hidden",
	};

  return (
    <div className={styles.section}>
      <Accordion type="single" collapsible className={styles.accordionContainer}>
          <AccordionItem value={title} className={styles.accordionItem}>
            <AccordionTrigger className={styles.accordionTrigger}>
              <StrapiImage
                alternativeText={triggerbg?.alternativeText || ''}
                className={styles.triggerBgImg}
                height={triggerbg.height}
                url={triggerbg.url}
                width={triggerbg.width} />
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
                <div className={styles.accordionContentBlock}>
                  <BlocksRenderer content={text} />
                </div>
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
    </div>
  );
}