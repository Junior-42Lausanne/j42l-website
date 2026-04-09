import SectionTitle from "../components/SectionTitle";
import Partner, { PartnerProps } from "../components/Partner";
import { ThemeColor } from "@/utils/type";

export type PartnerSectionProps = {
	id : number,
	__component : "layout.partner-carousel-section",
	sectionTitle : {
		color: ThemeColor,
		title: string,
	},
	partners : PartnerProps[],
	backgroundColor : ThemeColor,
}

export default function PartnerSection({
	sectionTitle,
	partners,
	backgroundColor
} : PartnerSectionProps) {
	const styles = {
		section : "flex flex-col px-[1.25rem] py-[2.25rem] gap-[1rem] items-center justify-center \
				md:px-[2rem] md:gap-[2rem] md:pt-[4rem] \
				xl:px-[6rem]",
		logosWrapper : "flex flex-row flex-wrap gap-[1rem] w-full items-center justify-center \
					md:gap-[2rem]"
	}
	
	return (
		<div className={styles.section} style={{backgroundColor: `var(--color-${backgroundColor})`}}>
			<SectionTitle color={sectionTitle.color}>{sectionTitle.title}</SectionTitle>
			<div className={styles.logosWrapper}>
				{
					partners.map((partner) => (
						<Partner key={partner.id} {...partner} />
					))
				}
			</div>
		</div>
	)
}