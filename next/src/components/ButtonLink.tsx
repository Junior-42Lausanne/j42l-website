"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { siteButton } from "@/styles/siteStyles";
import type { ThemeColor } from "@/utils/type";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonLinkProps = {
	url: string;
	color: ThemeColor;
	fullWidth?: boolean;
	external?: boolean;
	children: React.ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	ariaLabel?: string;
};

type Ripple = {
	id: number;
	x: number;
	y: number;
};

const sizeStyles: Record<ButtonSize, string> = {
	sm: "h-10 px-4 text-sm",
	md: "h-11 px-5 text-sm",
	lg: "h-12 px-6 text-base",
};

const rippleStyles: Record<ButtonVariant, string> = {
	primary: "bg-white/45",
	secondary: "bg-orange/25",
	ghost: "bg-white/18",
};

function cn(...classes: Array<string | false | null | undefined>) {
	return classes.filter(Boolean).join(" ");
}

function getFallbackVariant(color: ThemeColor): ButtonVariant {
	if (color === "black") {
		return "primary";
	}

	if (color === "white" || color === "pale_orange" || color === "orange") {
		return "secondary";
	}

	return "primary";
}

export default function ButtonLink({
	url,
	color,
	fullWidth = false,
	external = false,
	children,
	variant,
	size = "md",
	ariaLabel,
}: Readonly<ButtonLinkProps>) {
	const [ripples, setRipples] = useState<Ripple[]>([]);
	const resolvedVariant = variant ?? getFallbackVariant(color);

	function createRipple(event: React.MouseEvent<HTMLAnchorElement>) {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const id = Date.now();

		setRipples((previousRipples) => [
			...previousRipples,
			{ id, x, y },
		]);

		window.setTimeout(() => {
			setRipples((previousRipples) =>
				previousRipples.filter((ripple) => ripple.id !== id)
			);
		}, 600);
	}

	const className = cn(
		siteButton[resolvedVariant],
		sizeStyles[size],
		fullWidth && siteButton.fullWidth,
		"relative overflow-hidden font-poppins"
	);

	const content = (
		<>
			<span className="relative z-10 inline-flex items-center justify-center gap-2">
				{children}
			</span>

			<AnimatePresence>
				{ripples.map((ripple) => (
					<motion.span
						key={ripple.id}
						aria-hidden="true"
						className={cn(
							"pointer-events-none absolute rounded-full",
							rippleStyles[resolvedVariant]
						)}
						style={{
							left: ripple.x,
							top: ripple.y,
							translateX: "-50%",
							translateY: "-50%",
						}}
						initial={{ width: 0, height: 0, opacity: 0.65 }}
						animate={{ width: 280, height: 280, opacity: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
					/>
				))}
			</AnimatePresence>
		</>
	);

	if (external) {
		return (
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={ariaLabel}
				className={className}
				onClick={createRipple}
			>
				{content}
			</a>
		);
	}

	return (
		<Link
			href={url}
			aria-label={ariaLabel}
			className={className}
			onClick={createRipple}
		>
			{content}
		</Link>
	);
}