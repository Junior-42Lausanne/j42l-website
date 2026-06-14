"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

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
	showArrow?: boolean;
	ariaLabel?: string;
	className?: string;
};

type Ripple = {
	id: number;
	x: number;
	y: number;
};

const baseStyles = [
	"group/button relative inline-flex items-center justify-center overflow-hidden",
	"font-poppins font-semibold leading-none",
	"transition-all duration-300 ease-out",
	"outline-none",
	"focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#181612]",
	"disabled:pointer-events-none disabled:opacity-50",
].join(" ");

const sizeStyles: Record<ButtonSize, string> = {
	sm: "h-10 rounded-full px-4 text-sm",
	md: "h-11 rounded-full px-5 text-sm",
	lg: "h-12 rounded-full px-6 text-base",
};

const variantStyles: Record<ButtonVariant, string> = {
	primary: [
		"border border-orange/80 bg-orange text-[#14120e]",
		"shadow-[0_18px_60px_rgba(244,152,25,0.18)]",
		"hover:-translate-y-0.5 hover:border-[#ffad3d] hover:bg-[#ffad3d]",
		"hover:shadow-[0_24px_80px_rgba(244,152,25,0.24)]",
		"active:translate-y-0 active:shadow-[0_12px_40px_rgba(244,152,25,0.16)]",
	].join(" "),

	secondary: [
		"border border-white/12 bg-white/[0.045] text-white",
		"shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl",
		"hover:-translate-y-0.5 hover:border-orange/35 hover:bg-white/[0.075]",
		"hover:shadow-[0_24px_80px_rgba(244,152,25,0.08)]",
		"active:translate-y-0 active:bg-white/[0.06]",
	].join(" "),

	ghost: [
		"border border-transparent bg-transparent text-white/72",
		"hover:bg-white/[0.06] hover:text-white",
		"active:bg-white/[0.045]",
	].join(" "),
};

const rippleStyles: Record<ButtonVariant, string> = {
	primary: "bg-white/45",
	secondary: "bg-orange/25",
	ghost: "bg-white/18",
};

function cn(...classes: Array<string | false | null | undefined>) {
	return classes.filter(Boolean).join(" ");
}

/**
 * Temporary bridge for legacy Strapi data.
 *
 * Existing Strapi buttons still send a `color` field that originally controlled
 * the text color. The new design system should be driven by `variant`, but this
 * fallback keeps every existing CMS button working until Strapi is updated.
 */
function getFallbackVariant(color: ThemeColor): ButtonVariant {
	if (color === "black" || color === "orange") {
		return "primary";
	}

	return "secondary";
}

export default function ButtonLink({
	url,
	color,
	fullWidth = false,
	external = false,
	children,
	variant,
	size = "md",
	showArrow = false,
	ariaLabel,
	className,
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
		}, 650);
	}

	const buttonClassName = cn(
		baseStyles,
		sizeStyles[size],
		variantStyles[resolvedVariant],
		fullWidth && "w-full",
		className
	);

	const content = (
		<>
			<span
				className={[
					"pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
					resolvedVariant === "primary"
						? "bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.34),transparent)] group-hover/button:opacity-100"
						: "bg-[radial-gradient(circle_at_30%_0%,rgba(244,152,25,0.16),transparent_42%)] group-hover/button:opacity-100",
				].join(" ")}
				aria-hidden="true"
			/>

			<span className="relative z-10 inline-flex items-center justify-center gap-2">
				<span>{children}</span>

				{showArrow ? (
					<ArrowUpRight
						className="h-4 w-4 transition-transform duration-300 ease-out group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
						aria-hidden="true"
					/>
				) : null}
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
						animate={{ width: 300, height: 300, opacity: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.65, ease: "easeOut" }}
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
				className={buttonClassName}
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
			className={buttonClassName}
			onClick={createRipple}
		>
			{content}
		</Link>
	);
}