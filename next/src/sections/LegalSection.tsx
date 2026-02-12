import { type ThemeColor } from "../utils/type"
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

export type LegalSectionProps = {
    id: number,
    __component: "layout.legal-section",
    title: string,
    text: BlocksContent,
    textColor: ThemeColor,
    backgroundColor: ThemeColor,
}

export default async function LegalSection({
    title,
    text,
    textColor,
    backgroundColor
    } : LegalSectionProps) {
        const styles = {
            section: `flex flex-col px-[1.25rem] gap-[4rem] py-[6rem] font-poppins
                        md:px-[2rem] md:py-[8rem] md:gap-[2rem]
                        lg:px-[8rem] lg:gap-[3.125rem]
                        xl:px-[16rem]`,
            title: `text-h2 leading-[1.1]
                    md:text-h1`,
            text: `prose text-${textColor}`
        }
        return (
           <section className={styles.section} style={{backgroundColor: `var(--color-${backgroundColor})`}}>
                <div className={styles.title}>{title}</div>
                <div className={styles.text}>
                    <BlocksRenderer content={text}/>
                </div>
           </section>
        )
}