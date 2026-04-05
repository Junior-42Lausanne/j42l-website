"use client"

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import MemberCard, { type MemberCardProps } from "@/components/MemberCard";
import SectionTitle from "@/components/SectionTitle";
import { type ThemeColor } from "@/utils/type";

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
	const sectionRef = useRef<HTMLElement>(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

	const styles = {
		section: "flex flex-col gap-[3.75rem] py-[9.375rem] px-[1.25rem] items-center \
					lg:px-[4.25rem] \
					xl:px-[6.25rem]",
		titleWrap: "w-full",
		cardWrap: "flex flex-row flex-wrap justify-center gap-[0.7rem] w-full",
	}

	return (
		<section ref={sectionRef} className={styles.section}>
			<header className={styles.titleWrap}>
				<SectionTitle color={title.color}>
					{title.title}
				</SectionTitle>
			</header>
			<div className={styles.cardWrap}>
				{
					members.map((member, index) => (
						<motion.div
							key={member.id}
							initial={{ opacity: 0, y: 32 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{
								duration: 0.5,
								ease: "easeOut",
								delay: (index + 1) * 0.2,
							}}
						>
							<MemberCard {...member} />
						</motion.div>)
					)
				}
			</div>
		</section>
	)
}