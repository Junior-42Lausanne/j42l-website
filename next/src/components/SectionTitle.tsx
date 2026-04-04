"use client";

import { type ThemeColor } from "../utils/type";
import { useRef, useState, useLayoutEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

export type SectionTitleProps = {
	color: ThemeColor;
	children: React.ReactNode;
};

export default function SectionTitle({ color, children }: SectionTitleProps) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLHeadingElement>(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
	const [offset, setOffset] = useState(180);

	useLayoutEffect(() => {
	if (textRef.current && sectionRef.current) {
		const textWidth = textRef.current.offsetWidth;
		const containerWidth = sectionRef.current.offsetWidth;

		const maxOffset = containerWidth / 2 - 20; // keep inside padding
		const desiredOffset = textWidth / 2 + 20;

		setOffset(Math.min(desiredOffset, maxOffset));
	}
}, [children]);
	
	const styles = {
		wrap: `relative flex flex-row justify-center py-2
			md:flex-row `,
		leftTriangleWrap: "absolute left-1/2 top-0 -translate-x-1/2 flex justify-start items-start pointer-events-none",
		leftTriangle: `w-0 h-0 border-t-[2rem] border-r-[2rem] border-${color} border-r-transparent
			md:border-t-[3rem] md:border-r-[3rem]
			lg:border-t-[4rem] lg:border-r-[4rem]`,
		text: `font-poppins text-${color} text-h3 font-bold text-center px-[1rem]
			md:text-h2 md:px-[3.125rem]
			xl:px-[10rem]`,
		rightTriangleWrap: "absolute left-1/2 bottom-0 -translate-x-1/2 flex justify-end items-end pointer-events-none",
		rightTriangle: `w-0 h-0 border-b-[2rem] border-l-[2rem] border-${color} border-l-transparent
			md:border-b-[3rem] md:border-l-[3rem]
			lg:border-b-[4rem] lg:border-l-[4rem]`,
	};

	return (
		<div ref={sectionRef} className={styles.wrap}>
			<motion.div
				className={styles.leftTriangleWrap}
				initial={{ x: 0 }}
				animate={isInView ? { x: -offset } : { x: 0 }}
				transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
			>
				<div className={styles.leftTriangle}></div>
			</motion.div>
			<motion.h2
				ref={textRef}
				className={styles.text}
				initial={{ clipPath: "inset(0 50% 0 50%)" }}
				animate={isInView ? { clipPath: "inset(0 0% 0 0%)" } : {}}
				transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
			>
				{children}
			</motion.h2>
			<motion.div
				className={styles.rightTriangleWrap}
				initial={{ x: 0 }}
				animate={isInView ? { x: offset } : { x: 0 }}
				transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
			>
				<div className={styles.rightTriangle}></div>
			</motion.div>
		</div>
	);
}
