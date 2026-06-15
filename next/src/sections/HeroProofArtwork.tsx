import Image from "next/image";

export default function HeroProofArtwork() {
	return (
		<aside className="hidden lg:flex lg:min-h-[34rem] lg:items-center lg:justify-end">
			<div className="relative h-[38rem] w-full max-w-[39rem] overflow-visible xl:translate-x-2">
				{/* halo orange subtil */}
				<div className="pointer-events-none absolute right-[1.5rem] top-[3.5rem] z-[1] h-[29rem] w-[29rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,152,25,0.18),rgba(244,152,25,0.07)_34%,transparent_68%)] blur-2xl" />

				{/* contraste local sombre derrière l’artwork */}
				<div className="pointer-events-none absolute right-[2.2rem] top-[6.3rem] z-[1] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.42),rgba(0,0,0,0.16)_44%,transparent_76%)] blur-[34px]" />

				<Image
					src="/textures/j42l-powered-artwork-overlay.png"
					alt="Powered by 42 Lausanne"
					width={798}
					height={755}
					priority
					className={[
						"pointer-events-none absolute z-[2]",
						"left-[-1.2rem] top-[-1.1rem]",
						"h-[38.5rem] w-auto max-w-none",
						"select-none object-contain",
						"opacity-[0.98]",
						"brightness-[1.06] contrast-[1.08] saturate-[1.04]",
						"drop-shadow-[0_30px_90px_rgba(0,0,0,0.40)]",
					].join(" ")}
				/>
			</div>
		</aside>
	);
}