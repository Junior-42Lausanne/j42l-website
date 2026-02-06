"use client";

import { type ThemeColor } from "../utils/type";
import { useState, useEffect, useRef } from "react";

export type SectionTitleProps = {
	color: ThemeColor;
	children: React.ReactNode;
};

export default function SectionTitle({ color, children }: SectionTitleProps) {
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const currentRef = sectionRef.current;
		const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				setIsVisible(true);
				observer.unobserve(entry.target);
			}
		},
		{
			threshold: 0.33,
		});

		if (currentRef) {
			observer.observe(currentRef);
		}
		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, []);

	const styles = {
		wrap: `flex flex-col justify-center transition-all duration-1000 ${isVisible ? "" : "opacity-0"}
			md:flex-row `,
		leftTriangleWrap: "flex flex-col justify-start items-start transition-all duration-1000",
		leftTriangle: `w-0 h-0 border-t-[2rem] border-r-[2rem] border-${color} border-r-transparent
			md:border-t-[3rem] md:border-r-[3rem]
			lg:border-t-[4rem] lg:border-r-[4rem]
			transition-all duration-1000 ${isVisible ? "" : "translate-x-[50%] opacity-0"}`,
		text: `font-poppins text-${color} text-h3 font-bold text-center px-[0rem]
			md:text-h2 md:px-[3.125rem]
			xl:px-[10rem]
			transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`,
		rightTriangleWrap: "flex flex-col justify-end items-end transition-all duration-1000",
		rightTriangle: `w-0 h-0 border-b-[2rem] border-l-[2rem] border-${color} border-l-transparent
			md:border-b-[3rem] md:border-l-[3rem]
			lg:border-b-[4rem] lg:border-l-[4rem]
			transition-all duration-1000 ${isVisible ? "" : "-translate-x-[50%] opacity-0"}`,
	};

	return (
		<div ref={sectionRef} className={styles.wrap}>
		<div className={styles.leftTriangleWrap}>
			<div className={styles.leftTriangle}></div>
		</div>
		<h2 className={styles.text}>{children}</h2>
		<div className={styles.rightTriangleWrap}>
			<div className={styles.rightTriangle}></div>
		</div>
		</div>
	);
}
