import MemberCard, { MemberCardProps } from "./sub_components/MemberCard";
import SectionTitle from "./sub_components/SectionTitle";
import { ThemeColor } from "../utils/type";

export type MemberSectionProps = {
	blocks: {
		title: {
			title: string,
			color: ThemeColor,
		},
		members: MemberCardProps[],
	}
}

export default function MemberSection( {blocks} : MemberSectionProps) {
	const {title, members} = blocks;

	const styles = {
		section: "flex flex-col gap-[3.75rem] py-[9.375rem] mx-[6.25rem] items-center",
		cardWrap: "flex flex-row flex-wrap justify-center gap-[1.25rem]",
	}

	return (
		<div className={styles.section}>
			<div>
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