import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import StrapiImage, {
	type StrapiImageProps,
} from "@/components/StrapiImage";
import HeroProofArtwork from "@/sections/HeroProofArtwork";
import HeroRisingParticles from "@/sections/HeroRisingParticles";
import { type ThemeColor } from "@/utils/type";

type HeroBackgroundImage = StrapiImageProps & {
	data?: {
		attributes?: Partial<StrapiImageProps> | null;
	} | null;
	attributes?: Partial<StrapiImageProps> | null;
};

export type HeroSectionProps = {
	id: number;
	__component: "layout.hero";
	heading: string;
	subheading?: string;
	backgroundImage?: HeroBackgroundImage;
	button?: {
		url: string;
		color: ThemeColor;
		fullWidth?: boolean;
		external?: boolean;
		buttonText: string;
	};
	triangleColor?: ThemeColor;
};

function normalizeStrapiImage(image?: HeroBackgroundImage | null) {
	if (!image) {
		return null;
	}

	const candidate = image.url
		? image
		: image.data?.attributes
			? image.data.attributes
			: image.attributes
				? image.attributes
				: null;

	if (!candidate?.url) {
		return null;
	}

	return {
		url: candidate.url,
		alternativeText: candidate.alternativeText ?? "",
		width: candidate.width ?? 1920,
		height: candidate.height ?? 1080,
	};
}

export default function HeroSection({
	heading,
	subheading,
	backgroundImage,
	button,
}: Readonly<HeroSectionProps>) {
	if (!heading) {
		return null;
	}

	return (
		<section className="relative min-h-[100svh] overflow-hidden bg-[#181612] text-white">
			<HeroImage backgroundImage={backgroundImage} />

			{/* Assombrissement principal du fond */}
			<div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(15,14,11,0.98)_0%,rgba(15,14,11,0.90)_26%,rgba(15,14,11,0.46)_60%,rgba(15,14,11,0.76)_100%)]" />

			{/* Protection locale de la lisibilité à gauche */}
			<div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-full bg-[linear-gradient(90deg,rgba(0,0,0,0.38),rgba(0,0,0,0.14)_64%,transparent)] sm:w-[78vw] lg:w-[48vw]" />

			<div className="pointer-events-none absolute -left-[12rem] top-[7rem] z-[2] h-[42rem] w-[55rem] rounded-full bg-[radial-gradient(circle_at_44%_42%,rgba(0,0,0,0.34),rgba(0,0,0,0.12)_48%,transparent_74%)] blur-[24px]" />

			<div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-px bg-white/10" />

			{/* Désactivé sur les très petits écrans pour limiter le coût visuel */}
			<div className="hidden sm:block">
				<HeroRisingParticles />
			</div>

			<div
				className={[
					"relative z-10 flex min-h-[100svh]",
					"px-5 pb-14 pt-28",
					"sm:px-6 sm:pb-16 sm:pt-32",
					"lg:px-8 lg:pb-10 lg:pt-24",
					"xl:pt-28",
				].join(" ")}
			>
				<div
					className={[
						"mx-auto grid w-full max-w-[105rem] grid-cols-1 items-center",
						"gap-12",
						"lg:grid-cols-[minmax(0,1.03fr)_minmax(27rem,0.82fr)]",
						"lg:gap-8",
						"xl:grid-cols-[minmax(0,0.96fr)_minmax(31rem,0.82fr)]",
						"xl:gap-12",
						"2xl:gap-16",
					].join(" ")}
				>
					<header className="relative z-10 w-full max-w-[50rem] lg:pl-4 xl:pl-16 2xl:pl-20">
						<p
							className={[
								"mb-6 font-poppins font-semibold uppercase text-orange",
								"text-[0.65rem] tracking-[0.28em]",
								"sm:mb-8 sm:text-xs sm:tracking-[0.34em]",
							].join(" ")}
						>
							Junior Entreprise 42 Lausanne
						</p>

						<h1
							className={[
								"max-w-[48rem] whitespace-pre-line font-semibold text-white",
								"text-[clamp(2.8rem,13vw,4.8rem)]",
								"leading-[0.92] tracking-[-0.065em]",
								"drop-shadow-[0_18px_52px_rgba(0,0,0,0.48)]",
								"sm:text-[clamp(4rem,9vw,5.8rem)] sm:leading-[0.9]",
								"lg:text-[clamp(4.5rem,6.15vw,6.7rem)] lg:tracking-[-0.07em]",
							].join(" ")}
						>
							{heading}
						</h1>

						<div className="mt-8 max-w-[39rem] sm:mt-10">
							{subheading ? (
								<p
									className={[
										"max-w-[38rem] text-[0.95rem] leading-[1.75] text-white/76",
										"sm:text-[1.05rem] sm:leading-[1.8]",
										"lg:text-[1.08rem]",
									].join(" ")}
								>
									{subheading}
								</p>
							) : null}

							{button ? (
								<div className="mt-8 sm:mt-9">
									<HeroCta
										url={button.url}
										external={button.external}
									>
										{button.buttonText}
									</HeroCta>
								</div>
							) : null}
						</div>
					</header>

					<HeroProofArtwork />
				</div>
			</div>
		</section>
	);
}

function HeroImage({
	backgroundImage,
}: {
	backgroundImage?: HeroBackgroundImage;
}) {
	const image = normalizeStrapiImage(backgroundImage);

	if (!image) {
		return (
			<div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_76%_32%,rgba(244,152,25,0.28),transparent_34%),radial-gradient(circle_at_20%_70%,rgba(244,152,25,0.12),transparent_28%),#181612]" />
		);
	}

	return (
		<div className="pointer-events-none absolute inset-0 z-0">
			<StrapiImage
				alternativeText={image.alternativeText}
				className="h-full w-full object-cover object-center"
				height={image.height}
				url={image.url}
				width={image.width}
			/>
		</div>
	);
}

function HeroCta({
	url,
	external = false,
	children,
}: {
	url: string;
	external?: boolean;
	children: React.ReactNode;
}) {
	const className = [
		"group/hero-cta relative inline-flex min-h-14 w-fit items-center gap-4",
		"rounded-full pr-3 font-poppins text-sm font-semibold text-white/90",
		"transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
		"hover:text-white",
		"focus:outline-none focus-visible:ring-2 focus-visible:ring-orange",
		"focus-visible:ring-offset-4 focus-visible:ring-offset-[#181612]",
	].join(" ");

	const content = (
		<>
			{/* Glow limité au côté gauche */}
			<span className="pointer-events-none absolute left-0 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full bg-orange/12 blur-xl transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/hero-cta:scale-[1.35] group-hover/hero-cta:bg-orange/22" />

			{/* Partie physique du bouton */}
			<span
				className={[
					"relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
					"border border-orange/50 bg-[#14120e]/78 text-white",
					"shadow-[inset_0_0_0_1px_rgba(255,255,255,0.035),inset_0_0_24px_rgba(244,152,25,0.11),0_18px_55px_rgba(0,0,0,0.32)]",
					"backdrop-blur-sm",
					"transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
					"group-hover/hero-cta:-translate-y-0.5",
					"group-hover/hero-cta:border-orange",
					"group-hover/hero-cta:bg-orange",
					"group-hover/hero-cta:text-[#14120e]",
					"group-hover/hero-cta:shadow-[inset_0_2px_4px_rgba(255,255,255,0.24),0_20px_62px_rgba(244,152,25,0.22)]",
				].join(" ")}
			>
				<ArrowUpRight
					className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/hero-cta:-translate-y-0.5 group-hover/hero-cta:translate-x-0.5"
					aria-hidden="true"
				/>
			</span>

			<span className="relative pb-1 pr-2">
				<span className="relative z-10 whitespace-nowrap">
					{children}
				</span>

				<span
					className={[
						"absolute bottom-[-0.35rem] left-0 h-px w-8 bg-orange/60",
						"origin-left transition-all duration-500",
						"ease-[cubic-bezier(0.22,1,0.36,1)]",
						"group-hover/hero-cta:w-full group-hover/hero-cta:bg-orange",
					].join(" ")}
				/>
			</span>
		</>
	);

	if (external) {
		return (
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className={className}
			>
				{content}
			</a>
		);
	}

	return (
		<Link href={url} className={className}>
			{content}
		</Link>
	);
}