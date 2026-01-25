import MemberCard, { MemberCardProps } from "./sub_components/MemberCard";
import SectionTitle from "./sub_components/SectionTitle";
import { ThemeColor } from "../utils/type";

export type MemberSectionProps = {
	id: number,
	__component: "layout.member-section",
	title: {
		title: string,
		color: ThemeColor,
	},
	members: MemberCardProps[],
}

export default function MemberSection( {
	title,
	members,
} : MemberSectionProps) {

	const styles = {
		section: "flex flex-col gap-[3.75rem] py-[9.375rem] px-[1.25rem] items-center \
					md:px-[2.25rem] \
					lg:px-[4.25rem] \
					xl:px-[6.25rem]",
		titleWrap: "w-full",
		cardWrap: "flex flex-row flex-wrap justify-center gap-[1.25rem]",
	}

	return (
		<div className={styles.section}>
			<div className={styles.titleWrap}>
				<SectionTitle color={title.color}>
					{title.title}
				</SectionTitle>
			</div>
			<div className={styles.cardWrap}>
				{
					members.map((member) => 
						<MemberCard key={member.id} {...member}></MemberCard>)
				}
			</div>
		</div>
	)
}