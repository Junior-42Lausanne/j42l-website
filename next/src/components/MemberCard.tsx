"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { type IconProps } from "@/sections/NavBar";
import StrapiImage, { type StrapiImageProps } from "@/components/StrapiImage";

export type MemberCardProps = {
	id: number;
	photo: StrapiImageProps;
	name: string;
	role: string;
	social?: IconProps[];
	biography?: string;
};

export default function MemberCard({
	photo,
	name,
	role,
	social,
	biography
}: MemberCardProps) {
	const [showBio, setShowBio] = useState(false);

	const styles = {
		section: "flex flex-col items-center w-[24rem] px-[1.25rem] py-[1.25rem] gap-[1rem] md:w-[20rem] lg:w-[24rem] overflow-hidden",
		photoWrap: "relative w-full h-[21rem] rounded overflow-hidden",
		photo: "object-cover w-full h-full",
		bioOverlay: "absolute inset-0 overflow-y-auto bg-pale_orange p-[1.25rem] font-poppins",
		bioText: "text-black text-h5 leading-relaxed",
		contentWrap: "flex flex-col gap-[0.625rem] font-poppins text-black text-left w-full px-[0.8rem]",
		textWrap: "flex flex-col w-full flex-grow",
		name: "text-h4 font-semibold",
		role: "text-h5",
		bottomWrap: "flex flex-row justify-between items-center",
		socialWrap: "flex flex-row gap-[0.625rem] justify-start items-center",
		icon: "relative w-[30px] h-[30px]",
		bioBtn: "relative text-h5 font-medium cursor-pointer shrink-0 text-orange",
	};

	return (
		<section className={styles.section}>
			<div className={styles.photoWrap}>
				<motion.div
					className="w-full h-full"
					whileHover={{ scale: 1.1 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					<StrapiImage
						alternativeText={photo.alternativeText}
						className={styles.photo}
						height={photo.height}
						url={photo.url}
						width={photo.width}
					/>
				</motion.div>
				<AnimatePresence>
				{showBio && (
					<motion.div
						className={styles.bioOverlay}
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						exit={{ y: "100%" }}
						transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
					>
						<motion.p
							className={styles.bioText}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, ease: "easeOut", delay: 0.25 }}
						>
							{biography}
						</motion.p>
					</motion.div>
				)}
				</AnimatePresence>
			</div>

			<div className={styles.contentWrap}>
				<div className={styles.textWrap}>
					<h4 className={styles.name}>{name}</h4>
					<h5 className={styles.role}>{role}</h5>
				</div>
				<div className={styles.bottomWrap}>
					<div className={styles.socialWrap}>
						{social?.map((item) => (
							<motion.div
								key={item.icon.id}
								className={styles.icon}
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								whileHover={{ scale: 1.2 }}
							>
								{item.external ? (
									<a href={item.url} target="_blank" rel="noopener noreferrer">
										<StrapiImage alternativeText={item.icon.alternativeText} className="object-contain" height={item.icon.height} url={item.icon.url} width={item.icon.width} />
									</a>
								) : (
									<Link href={item.url}>
										<StrapiImage alternativeText={item.icon.alternativeText} className="object-contain" height={item.icon.height} url={item.icon.url} width={item.icon.width} />
									</Link>
								)}
							</motion.div>
						))}
					</div>

					{biography && (
						<motion.button
							onClick={() => setShowBio((prev) => !prev)}
							className={styles.bioBtn}
							whileHover="hover"
						>
							<motion.span
								className="inline-block"
								variants={{ hover: { y: -2 } }}
								transition={{ duration: 0.22, ease: "easeOut" }}
							>
								{showBio ? "Photo" : "Biography"}
							</motion.span>
							<motion.div
								className="absolute bottom-0 left-0 h-[1.5px] bg-orange w-full"
								initial={{ scaleX: 0 }}
								variants={{ hover: { scaleX: 1 } }}
								style={{ originX: 0 }}
								transition={{ duration: 0.28, ease: "easeOut" }}
							/>
						</motion.button>
					)}
				</div>
			</div>
		</section>
	);
}