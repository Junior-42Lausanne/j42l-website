import Image from "next/image";

const POWERED_ARTWORK_SRC = "/textures/j42l-powered-artwork-overlay.png";
const DUST_TEXTURE_SRC = "/textures/j42l-amber-dust-overlay.png";
const GRAIN_TEXTURE_SRC = "/textures/j42l-grain-overlay.png";

export default function HeroProofArtwork() {
	return (
		<aside className="hidden lg:flex lg:min-h-[34rem] lg:items-center lg:justify-end">
			<div className="relative h-[38rem] w-full max-w-[39rem] overflow-visible xl:translate-x-2">
				{/* halo sombre local : aide l'image à ressortir sans créer de carré */}
				<div className="pointer-events-none absolute right-[2.2rem] top-[6.3rem] z-[1] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.42),rgba(0,0,0,0.16)_44%,transparent_76%)] blur-[34px]" />

				{/* glow orange doux derrière l’artwork */}
				<div className="pointer-events-none absolute right-[1.5rem] top-[3.5rem] z-[1] h-[29rem] w-[29rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,152,25,0.18),rgba(244,152,25,0.07)_34%,transparent_68%)] blur-2xl" />

				{/* poussière chaude autour du 42 */}
				{/* <TextureLayer
					src={DUST_TEXTURE_SRC}
					className="left-[1.2rem] top-[5.6rem] z-[2] h-[22rem] w-[25rem] opacity-[0.26]"
					backgroundSize="620px 620px"
					mask="radial-gradient(circle at 43% 43%, black 0%, rgba(0,0,0,0.72) 24%, rgba(0,0,0,0.28) 48%, transparent 74%)"
					blendMode="screen"
				/>

				<TextureLayer
					src={DUST_TEXTURE_SRC}
					className="left-[13.4rem] top-[21.6rem] z-[2] h-[12rem] w-[15rem] opacity-[0.18]"
					backgroundSize="560px 560px"
					mask="radial-gradient(circle at 42% 48%, black 0%, rgba(0,0,0,0.58) 22%, rgba(0,0,0,0.22) 46%, transparent 72%)"
					blendMode="screen"
				/>

				<TextureLayer
					src={GRAIN_TEXTURE_SRC}
					className="left-[2.4rem] top-[7.6rem] z-[2] h-[20rem] w-[22rem] opacity-[0.08]"
					backgroundSize="180px 180px"
					mask="radial-gradient(circle at 42% 44%, black 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.16) 52%, transparent 76%)"
					blendMode="soft-light"
				/> */}

				<Image
					src={POWERED_ARTWORK_SRC}
					alt="Powered by 42 Lausanne"
					width={798}
					height={755}
					priority
					className={[
						"pointer-events-none absolute z-[3]",
						"left-[-1.2rem] top-[-1.1rem]",
						"h-[38.5rem] w-auto max-w-none",
						"select-none object-contain",
						"opacity-[0.99]",
						"brightness-[1.08] contrast-[1.12] saturate-[1.06]",
						"drop-shadow-[0_34px_100px_rgba(0,0,0,0.44)]",
					].join(" ")}
				/>

				{/* micro-glow par-dessus, très subtil, pour faire ressortir les oranges */}
				<div className="pointer-events-none absolute left-[6rem] top-[10rem] z-[4] h-[13rem] w-[15rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,152,25,0.10),transparent_68%)] blur-[18px]" />
			</div>
		</aside>
	);
}

function TextureLayer({
	src,
	className,
	backgroundSize,
	mask,
	blendMode,
}: {
	src: string;
	className: string;
	backgroundSize: string;
	mask: string;
	blendMode: React.CSSProperties["mixBlendMode"];
}) {
	return (
		<div
			className={["pointer-events-none absolute bg-repeat", className].join(" ")}
			style={{
				backgroundImage: `url("${src}")`,
				backgroundSize,
				mixBlendMode: blendMode,
				filter: "blur(0.45px)",
				WebkitMaskImage: mask,
				maskImage: mask,
				WebkitMaskRepeat: "no-repeat",
				maskRepeat: "no-repeat",
				WebkitMaskSize: "100% 100%",
				maskSize: "100% 100%",
				WebkitMaskPosition: "center",
				maskPosition: "center",
			}}
		/>
	);
}