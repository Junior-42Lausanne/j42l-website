"use client"

import { type ThemeColor } from '@/utils/type';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from "react";
import { useRouter } from 'next/navigation';

export type ButtonLinkProps = {
	url: string,
	color: ThemeColor,
	fullWidth?: boolean,
	external?: boolean,
	children: React.ReactNode,
}

type Ripple = {
	id: number,
	x: number,
	y: number,
}

/*
* Component for button
* url: where the button point to
* color: color of the text.
* fullwidth: button width fill the container or not.
* external: external link or not
* children: text
*/
export default function ButtonLink({
	url,
	color,
	fullWidth = false,
	external = false,
	children,
}: Readonly<ButtonLinkProps>) {
	const router = useRouter();
	const [ripples, setRipples] = useState<Ripple[]>([]);
	const createRipple = async (event: React.MouseEvent<HTMLDivElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const id = Date.now();

		setRipples((prev) => [...prev, { x, y, id }]);

		if (!external) {
			event.preventDefault();
			await new Promise((resolve) => setTimeout(resolve, 300));
			router.push(url);
		}

		setTimeout(() => {
		setRipples((prev) => prev.filter((r) => r.id !== id));
		}, 600);
	};


	const linkStyles = `block font-poppins text-h5 font-semibold text-center text-${color}
			pt-[0.625rem] pb-[0.625rem] pl-[1.25rem] pr-[1.25rem]
			hover:text-black active:text-black`;

	const wrapperStyles = `border-2 border-orange relative overflow-hidden
			${fullWidth ? "w-full" : "inline-block"}
			hover:bg-orange active:bg-orange`;

	const inner = external ? (
		<a href={url} target="_blank" rel="noopener noreferrer" className={linkStyles}>
		{children}
		</a>
	) : (
		<a href={url} className={linkStyles}>
			{children}
		</a>
	);

	return (
		<motion.div
		className={wrapperStyles}
		whileHover={{ scale: 1.1 }}
		onClick={createRipple}
		>
		{inner}
		<AnimatePresence>
			{ripples.map((ripple) => (
				<motion.span
					key={ripple.id}
					className="absolute rounded-full bg-white pointer-events-none"
					style={{ left: ripple.x, top: ripple.y, translateX: "-50%", translateY: "-50%" }}
					initial={{ width: 0, height: 0, opacity: 0.6 }}
					animate={{ width: 300, height: 300, opacity: 0 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				/>
			))}
		</AnimatePresence>
		</motion.div>
	);
}
