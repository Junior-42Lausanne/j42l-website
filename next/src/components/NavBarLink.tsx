"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

import { type Mode } from "../utils/type";

export type NavBarLinkProps = {
	id: number;
	__component: "composants.link";
	linkText: string;
	url: string;
	external: boolean;
	mode: Mode;

	isHovered?: boolean;
	isAdjacentToHovered?: boolean;
	onHoverStart?: () => void;
	onHoverEnd?: () => void;
};

// const HOVER_LABELS: Record<string, string> = {
//   Home: "Start here",
//   Services: "What we do",
//   "About us": "Meet J42L",
//   Student: "Join the team",
//   Jobs: "Open roles",
//   "Game Jam": "Play with us",
//   Portfolio: "Explore proofs",

//   Accueil: "Commencer ici",
//   "À propos": "Meet J42L",
// };

const HOVER_LABELS: Record<string, string> = {
	Home: "Start here",
	Services: "What we do",
	"About us": "Meet J42L",
	Student: "Join the team",
	Jobs: "Open roles",
	"Game Jam": "Play with us",
	Portfolio: "Explore proofs",

	Accueil: "Commencer ici",
	"À propos": "Meet J42L",
	Étudiants: "Join the team",
	Étudiant: "Join the team",
	Emplois: "Open roles",
};

function getTextWidth(label: string) {
	return Math.max(72, label.length * 9.2 + 28);
}

function getHoverWidth(label: string) {
	return Math.max(104, label.length * 9.4 + 34);
}

export default function NavBarLink({
	linkText,
	url,
	external,
	mode,
	isHovered = false,
	isAdjacentToHovered = false,
	onHoverStart,
	onHoverEnd,
}: Readonly<NavBarLinkProps>) {
	const pathName = usePathname();
	const onCurrentPage = pathName === url;
	const hoverLabel = HOVER_LABELS[linkText] ?? linkText;

	if (mode === "desktop") {
		const baseWidth = getTextWidth(linkText);
		const hoverWidth = Math.max(baseWidth, getHoverWidth(hoverLabel));

		const targetWidth = isHovered
			? hoverWidth
			: isAdjacentToHovered
				? baseWidth + 6
				: baseWidth;

		const className = [
			"group relative inline-flex h-10 w-full items-center justify-center overflow-hidden rounded-full px-2",
			"font-poppins text-sm font-semibold",
			"transition-colors duration-300 ease-out",
			"focus:outline-none focus:ring-2 focus:ring-orange/70 focus:ring-offset-2 focus:ring-offset-[#181612]",
			onCurrentPage ? "text-orange" : "text-white/74 hover:text-white",
		].join(" ");

		const content = (
			<span className="relative block h-5 w-full overflow-hidden whitespace-nowrap text-center">
				<span
					className={[
						"block transition duration-300 ease-out",
						isHovered ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
					].join(" ")}
				>
					{linkText}
				</span>

				<span
					className={[
						"absolute inset-0 text-orange transition duration-300 ease-out",
						isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
					].join(" ")}
				>
					{hoverLabel}
				</span>
			</span>
		);

		if (external) {
			return (
				<motion.a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex shrink-0"
					initial={false}
					animate={{
						width: targetWidth,
						x: isAdjacentToHovered ? 1 : 0,
						opacity: 1,
					}}
					transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
					onMouseEnter={onHoverStart}
					onMouseLeave={onHoverEnd}
				>
					<span className={className}>{content}</span>
				</motion.a>
			);
		}

		return (
			<motion.div
				className="inline-flex shrink-0"
				initial={false}
				animate={{
					width: targetWidth,
					x: isAdjacentToHovered ? 1 : 0,
					opacity: 1,
				}}
				transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
				onMouseEnter={onHoverStart}
				onMouseLeave={onHoverEnd}
			>
				<Link href={url} className={className}>
					{content}
				</Link>
			</motion.div>
		);
	}

	if (mode === "mobile") {
		const className = [
			"group relative inline-flex w-full justify-end rounded-2xl px-4 py-3",
			"font-poppins text-xl font-medium text-white transition duration-300",
			onCurrentPage ? "text-orange" : "active:text-orange",
		].join(" ");

		if (external) {
			return (
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className={className}
				>
					{linkText}
				</a>
			);
		}

		return (
			<Link href={url} className={className}>
				{linkText}
			</Link>
		);
	}

	return null;
}