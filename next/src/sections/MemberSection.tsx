"use client"

import { useEffect, useRef } from "react";
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
	useEffect(() => {
		const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("ms-visible");
				observer.unobserve(entry.target);
			}
			});
		},
		{ threshold: 0.1 }
		);
	
		if (sectionRef.current) observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, []);


	const styles = {
		section: "flex flex-col gap-[3.75rem] py-[9.375rem] px-[1.25rem] items-center \
					lg:px-[4.25rem] \
					xl:px-[6.25rem]",
		titleWrap: "w-full",
		cardWrap: "flex flex-row flex-wrap justify-center gap-[0.7rem]",
	}

	return (
		<div>
			<style>{`
				.ms-visible{
					opacity: 1;
					transform: translateX(0);
				}
				.ms-card {
					opacity: 0;
					transform: translateY(32px);
					transition: opacity 0.5s ease, transform 0.5s ease;
				}
				.ms-visible .ms-card {
					opacity: 1;
					transform: translateY(0);
				}
			`}</style>
	
			<section ref={sectionRef} className={styles.section}>
				<header className={styles.titleWrap}>
					<SectionTitle color={title.color}>
						{title.title}
					</SectionTitle>
				</header>
				<div className={styles.cardWrap}>
					{
						members.map((member, index) => 
							<div key={member.id} className="ms-card" style={{ transitionDelay: `${(index + 1) * 0.2}s` }}>
								<MemberCard {...member} />
							</div>)
					}
				</div>
			</section>
		</div>
	)
}