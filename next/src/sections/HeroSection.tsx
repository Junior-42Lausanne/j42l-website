import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import StrapiImage, { type StrapiImageProps } from "@/components/StrapiImage";
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
		<section className="relative min-h-screen overflow-hidden bg-[#181612] text-white">
			<HeroImage backgroundImage={backgroundImage} />

			<div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(24,22,18,0.96)_0%,rgba(24,22,18,0.84)_26%,rgba(24,22,18,0.34)_62%,rgba(24,22,18,0.70)_100%)]" />
			<div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_66%_30%,rgba(244,152,25,0.15),transparent_28%),linear-gradient(180deg,rgba(24,22,18,0.18)_0%,rgba(24,22,18,0.04)_46%,#181612_100%)]" />
			<div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[42vw] bg-[linear-gradient(90deg,rgba(0,0,0,0.28),transparent)]" />

			<div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-px bg-white/10" />
			<div className="pointer-events-none absolute left-0 top-0 z-[3] hidden h-full w-px bg-white/10 lg:block" />
			<div className="pointer-events-none absolute right-0 top-0 z-[3] hidden h-full w-px bg-white/10 lg:block" />

			<div className="relative z-10 flex min-h-screen flex-col px-5 pt-18 sm:px-6 lg:px-8 lg:pt-12">
				<div className="mx-auto grid w-full max-w-[92rem] flex-1 grid-cols-1 items-center gap-14 py-14 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-12 lg:py-20 xl:grid-cols-[minmax(0,1fr)_26rem]">
					<div className="max-w-[72rem]">
						<div className="mb-7 flex items-center gap-4">
							<span className="h-px w-12 bg-orange" />
							<p className="font-poppins text-xs font-semibold uppercase tracking-[0.32em] text-orange">
								Junior Entreprise 42 Lausanne
							</p>
						</div>

						<h1 className="max-w-[66rem] text-[clamp(3.65rem,8.8vw,9rem)] font-semibold leading-[0.86] tracking-[-0.085em] text-white drop-shadow-[0_10px_34px_rgba(0,0,0,0.38)]">
							{heading}
						</h1>

						<div className="mt-8 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[minmax(0,34rem)_auto] lg:items-end">
							{subheading ? (
								<p className="max-w-[34rem] text-base leading-8 text-white/78 sm:text-lg">
									{subheading}
								</p>
							) : null}

							{button ? (
								<HeroCta url={button.url} external={button.external}>
									{button.buttonText}
								</HeroCta>
							) : null}
						</div>
					</div>

					<PoweredBySignature />
				</div>
			</div>

			<div className="pointer-events-none absolute bottom-7 left-5 right-5 z-10 mx-auto flex max-w-[92rem] items-center justify-between border-t border-white/10 pt-5 text-xs text-white/36 sm:left-6 sm:right-6 lg:left-8 lg:right-8">
				<span className="font-poppins uppercase tracking-[0.22em]">
					Strategy · Design · Development
				</span>

				<span className="hidden font-poppins uppercase tracking-[0.22em] sm:inline">
					Lausanne / Switzerland
				</span>
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

function PoweredBySignature() {
	return (
		<aside className="hidden lg:flex lg:justify-end">
			<div className="relative flex w-full max-w-[24rem] flex-col items-end text-right">
				<div className="mb-7 flex items-center gap-3">
					<p className="font-poppins text-[0.68rem] font-semibold uppercase tracking-[0.30em] text-white/58">
						Powered by
					</p>
					<span className="h-px w-14 bg-gradient-to-r from-white/0 to-orange/80" />
				</div>

				<div className="relative w-full">
					<div className="pointer-events-none absolute right-[5.3rem] top-[-1rem] h-[12rem] w-px rotate-[29deg] bg-gradient-to-b from-orange/0 via-orange/70 to-orange/0 origin-top" />

					<div className="flex items-end justify-end gap-3">
						<span className="font-poppins text-[7rem] font-semibold leading-none tracking-[-0.10em] text-white drop-shadow-[0_12px_36px_rgba(0,0,0,0.35)]">
							42
						</span>

						<span className="mb-4 font-poppins text-[1.15rem] font-semibold uppercase tracking-[0.22em] text-orange">
							Lausanne
						</span>
					</div>

					<div className="mt-4 flex items-center justify-end gap-4">
						<span className="h-px w-16 bg-white/12" />
						<span className="font-poppins text-[2rem] font-light leading-none text-orange/88">
							+
						</span>
					</div>

					<div className="mt-5 flex justify-end">
						<div className="border-l border-white/12 pl-5">
							<p className="font-poppins text-sm font-medium uppercase leading-8 tracking-[0.22em] text-white/74">
								Student talent.
								<br />
								Real projects.
								<br />
								Measurable impact.
							</p>
						</div>
					</div>
				</div>
			</div>
		</aside>
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