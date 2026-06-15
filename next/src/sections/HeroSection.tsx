import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import StrapiImage, { type StrapiImageProps } from "@/components/StrapiImage";
import { type ThemeColor } from "@/utils/type";

import HeroProofArtwork from "@/sections/HeroProofArtwork";
import HeroRisingParticles from "@/sections/HeroRisingParticles";

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
		<section className="relative min-h-screen overflow-hidden bg-[#181612] text-white">
			<HeroImage backgroundImage={backgroundImage} />

			<div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(15,14,11,0.96)_0%,rgba(15,14,11,0.88)_24%,rgba(15,14,11,0.40)_58%,rgba(15,14,11,0.76)_100%)]" />
			{/* <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_70%_42%,rgba(244,152,25,0.19),transparent_31%),linear-gradient(180deg,rgba(0,0,0,0.26)_0%,rgba(0,0,0,0.02)_46%,rgba(24,22,18,0.74)_100%)]" /> */}
			<div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[45vw] bg-[linear-gradient(90deg,rgba(0,0,0,0.32),transparent)]" />

			<div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-px bg-white/10" />

			<HeroRisingParticles />

			<div className="relative z-10 flex min-h-screen px-5 pt-18 sm:px-6 lg:px-8 lg:pt-22">
				<div className="mx-auto grid w-full max-w-[105rem] grid-cols-1 items-center gap-12 py-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(25rem,0.75fr)] lg:gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(30rem,0.8fr)]">
					<div className="relative z-10 max-w-[48rem] xl:pl-20">
						<p className="mb-7 font-poppins text-xs font-semibold uppercase tracking-[0.34em] text-orange">
							Junior Entreprise 42 Lausanne
						</p>

						<h1 className="max-w-[47rem] whitespace-pre-line text-[clamp(3.7rem,6.4vw,6.85rem)] font-semibold leading-[0.88] tracking-[-0.078em] text-white drop-shadow-[0_16px_46px_rgba(0,0,0,0.42)]">
							{heading}
						</h1>

						<div className="mt-8 max-w-[34rem]">
							{subheading ? (
								<p className="text-base leading-8 text-white/70 sm:text-lg">
									{subheading}
								</p>
							) : null}

							{button ? (
								<div className="mt-9">
									<HeroCta url={button.url} external={button.external}>
										{button.buttonText}
									</HeroCta>
								</div>
							) : null}
						</div>
					</div>

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
				className="h-full w-full object-cover"
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
		"group/hero-cta relative inline-flex w-fit items-center gap-4",
		"font-poppins text-sm font-semibold text-white/88",
		"transition duration-300 ease-out hover:text-orange",
		"focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#181612]",
	].join(" ");

	const content = (
		<>
			<span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-orange/45 bg-black/20 shadow-[inset_0_0_22px_rgba(244,152,25,0.12),0_18px_60px_rgba(244,152,25,0.12)] transition duration-300 ease-out group-hover/hero-cta:border-orange group-hover/hero-cta:bg-orange group-hover/hero-cta:text-[#14120e]">
				<ArrowUpRight
					className="h-4 w-4 transition-transform duration-300 ease-out group-hover/hero-cta:-translate-y-0.5 group-hover/hero-cta:translate-x-0.5"
					aria-hidden="true"
				/>
			</span>

			<span className="relative">
				<span>{children}</span>
				<span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-50 bg-orange/55 transition duration-300 ease-out group-hover/hero-cta:scale-x-100 group-hover/hero-cta:bg-orange" />
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