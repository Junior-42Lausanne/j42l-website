import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import {
	BlocksRenderer,
	type BlocksContent,
} from "@strapi/blocks-react-renderer";

import StrapiImage, {
	type StrapiImageProps,
} from "../components/StrapiImage";
import { type ThemeColor } from "../utils/type";

type TextSectionImage = StrapiImageProps & {
	data?: {
		attributes?: Partial<StrapiImageProps> | null;
	} | null;

	attributes?: Partial<StrapiImageProps> | null;
};

export type TextSectionProps = {
	id: number;
	__component: "layout.text-section";

	title: string;
	text: BlocksContent;

	image?: TextSectionImage | null;

	button?: {
		url: string;
		color: ThemeColor;
		fullWidth?: boolean;
		external?: boolean;
		buttonText: string;
	};

	textColor: ThemeColor;
	backgroundColor: ThemeColor;
};

const ARTWORK_MASK = `
	linear-gradient(
		180deg,

		transparent 0%,

		rgba(0,0,0,0.08) 5%,
		rgba(0,0,0,0.22) 9%,
		rgba(0,0,0,0.48) 14%,
		rgba(0,0,0,0.74) 19%,
		rgba(0,0,0,0.92) 24%,

		black 30%,
		black 70%,

		rgba(0,0,0,0.94) 76%,
		rgba(0,0,0,0.76) 82%,
		rgba(0,0,0,0.50) 88%,
		rgba(0,0,0,0.24) 93%,
		rgba(0,0,0,0.08) 97%,

		transparent 100%
	)
`;

function normalizeStrapiImage(
	image?: TextSectionImage | null,
) {
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
		width: candidate.width ?? 1200,
		height: candidate.height ?? 1200,
	};
}

export default function TextSection({
	title,
	text,
	image,
	button,
}: TextSectionProps) {
	const artwork = normalizeStrapiImage(image);

	return (
		<section className="relative z-[20] -mt-44 text-white">
			{/* ======================================================== */}
			{/* HERO → ABOUT                                             */}
			{/* ======================================================== */}

			<div
				aria-hidden="true"
				className="pointer-events-none relative z-[30] h-44"
				style={{
					background: `
						linear-gradient(
							180deg,

							rgba(20,18,14,0) 0%,

							rgba(20,18,14,0.008) 10%,
							rgba(20,18,14,0.02) 20%,
							rgba(20,18,14,0.045) 30%,

							rgba(20,18,14,0.09) 40%,
							rgba(20,18,14,0.16) 50%,
							rgba(20,18,14,0.27) 60%,

							rgba(20,18,14,0.42) 70%,
							rgba(20,18,14,0.60) 78%,
							rgba(20,18,14,0.76) 85%,

							rgba(20,18,14,0.88) 91%,
							rgba(20,18,14,0.96) 96%,

							#14120e 100%
						)
					`,
				}}
			/>

			{/* ======================================================== */}
			{/* RESPIRATION                                             */}
			{/* ======================================================== */}

			<div
				aria-hidden="true"
				className="pointer-events-none h-24 bg-[#14120e] lg:h-32"
			/>

			{/* ======================================================== */}
			{/* ABOUT                                                    */}
			{/* ======================================================== */}

			<div className="about-section relative isolate overflow-hidden bg-[#14120e]">
				{/* ==================================================== */}
				{/* GRAND J — GAUCHE                                     */}
				{/* ==================================================== */}

				<div
					aria-hidden="true"
					className={[
						"pointer-events-none absolute",
						"inset-y-0 left-0",

						"z-[3]",

						"hidden w-[43%]",

						"lg:flex lg:items-center lg:justify-start",

						"xl:w-[45%]",
					].join(" ")}
				>
					{artwork ? (
						<div
							className={[
								"relative",

								"ml-[-4rem]",

								"flex h-[33rem] w-[33rem]",
								"items-center justify-center",

								"xl:ml-[-2rem]",
								"xl:h-[37rem] xl:w-[37rem]",

								"2xl:ml-0",
								"2xl:h-[40rem] 2xl:w-[40rem]",
							].join(" ")}
							style={{
								WebkitMaskImage: ARTWORK_MASK,
								maskImage: ARTWORK_MASK,
							}}
						>
							<StrapiImage
								alternativeText={artwork.alternativeText}
								className={[
									"about-artwork-image",

									"h-full w-full",

									"object-contain object-center",

									"opacity-[0.34]",

									"brightness-[1.02]",
									"saturate-[0.92]",

									"transition-[opacity,filter]",

									"duration-[950ms]",

									"ease-[cubic-bezier(0.16,1,0.3,1)]",
								].join(" ")}
								height={artwork.height}
								url={artwork.url}
								width={artwork.width}
							/>
						</div>
					) : (
						<div
							className={[
								"relative",

								"ml-[-4rem]",

								"flex h-[33rem] w-[33rem]",
								"items-center justify-center",

								"xl:ml-[-2rem]",
								"xl:h-[37rem] xl:w-[37rem]",

								"2xl:ml-0",
								"2xl:h-[40rem] 2xl:w-[40rem]",
							].join(" ")}
							style={{
								WebkitMaskImage: ARTWORK_MASK,
								maskImage: ARTWORK_MASK,
							}}
						>
							<span
								className={[
									"about-artwork-fallback",

									"select-none",

									"font-poppins",
									"text-[24rem]",
									"font-semibold",

									"leading-none",
									"tracking-[-0.14em]",

									"text-orange/20",

									"transition-[opacity,filter]",

									"duration-[950ms]",

									"ease-[cubic-bezier(0.16,1,0.3,1)]",
								].join(" ")}
							>
								J
							</span>
						</div>
					)}
				</div>

				{/* ==================================================== */}
				{/* MASQUE J → CONTENT                                   */}
				{/* ==================================================== */}

				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 z-[4]"
					style={{
						background: `
							linear-gradient(
								90deg,

								rgba(20,18,14,0) 0%,
								rgba(20,18,14,0) 34%,

								rgba(20,18,14,0.04) 38%,
								rgba(20,18,14,0.10) 42%,
								rgba(20,18,14,0.22) 47%,
								rgba(20,18,14,0.40) 52%,
								rgba(20,18,14,0.62) 58%,
								rgba(20,18,14,0.80) 64%,
								rgba(20,18,14,0.92) 70%,

								#14120e 78%,
								#14120e 100%
							)
						`,
					}}
				/>

				{/* ==================================================== */}
				{/* CONTENT                                              */}
				{/* ==================================================== */}

				<div
					className={[
						"relative z-10",

						"mx-auto grid w-full max-w-[105rem]",
						"grid-cols-1",

						"px-5 py-24",

						"sm:px-6 sm:py-28",

						"lg:min-h-[46rem]",
						"lg:grid-cols-12",
						"lg:items-center",
						"lg:px-8",
						"lg:py-32",

						"xl:min-h-[49rem]",
						"xl:py-36",
					].join(" ")}
				>
					{/* espace réservé au J */}
					<div className="hidden lg:col-span-5 lg:block" />

					{/* ================================================= */}
					{/* CONTENU ÉDITORIAL                                 */}
					{/* ================================================= */}

					<div className="lg:col-span-7 lg:pr-[3rem] xl:pr-[6rem]">
						<p
							className={[
								"font-poppins",

								"text-[0.66rem] font-semibold",

								"uppercase tracking-[0.32em]",

								"text-orange",
							].join(" ")}
						>
							About J42L
						</p>

						<h2
							className={[
								"mt-6 max-w-[42rem]",

								"font-poppins font-semibold",

								"text-[clamp(3.5rem,5.7vw,6rem)]",

								"leading-[0.89]",

								"tracking-[-0.082em]",

								"text-white",
							].join(" ")}
						>
							{title}
						</h2>

						<div className="mt-9 max-w-[42rem]">
							<article
								className={[
									"prose max-w-none",

									"font-poppins",

									"text-base leading-[1.9]",

									"text-white/64",

									"sm:text-[1.05rem]",

									"prose-p:my-0",

									"prose-p:mb-5",

									"prose-p:text-inherit",

									"prose-headings:text-inherit",

									"prose-strong:text-white",

									"prose-li:text-inherit",

									"prose-a:text-orange",
								].join(" ")}
							>
								<BlocksRenderer content={text} />
							</article>

							{button ? (
								<div className="mt-9">
									<SectionCta
										url={button.url}
										external={button.external}
									>
										{button.buttonText}
									</SectionCta>
								</div>
							) : null}
						</div>
					</div>
				</div>

				{/* ==================================================== */}
				{/* INTERACTION CTA → J                                  */}
				{/* ==================================================== */}

				<style>{`
					@media (hover: hover) and (pointer: fine) {
						.about-section:has(.about-cta:hover)
							.about-artwork-image {
							opacity: 0.52;

							filter:
								brightness(1.11)
								saturate(1.02);
						}

						.about-section:has(.about-cta:hover)
							.about-artwork-fallback {
							opacity: 0.56;

							filter:
								brightness(1.10)
								saturate(1.02);
						}
					}

					@media (prefers-reduced-motion: reduce) {
						.about-artwork-image,
						.about-artwork-fallback {
							transition-duration: 0ms;
						}
					}
				`}</style>
			</div>

			{/* ======================================================== */}
			{/* ABOUT → SERVICES                                        */}
			{/* ======================================================== */}

			<div
				aria-hidden="true"
				className="pointer-events-none relative z-20 -mb-20 h-52 lg:h-60"
				style={{
					background: `
						linear-gradient(
							180deg,

							#14120e 0%,

							rgba(20,18,14,0.995) 12%,
							rgba(20,18,14,0.97) 24%,
							rgba(20,18,14,0.90) 38%,

							rgba(20,18,14,0.76) 52%,
							rgba(20,18,14,0.58) 66%,
							rgba(20,18,14,0.38) 78%,
							rgba(20,18,14,0.20) 88%,
							rgba(20,18,14,0.07) 95%,

							transparent 100%
						)
					`,
				}}
			/>
		</section>
	);
}

function SectionCta({
	url,
	external = false,
	children,
}: {
	url: string;
	external?: boolean;
	children: ReactNode;
}) {
	const className = [
		"about-cta",

		"group/about-cta",

		"inline-flex w-fit items-center gap-4",

		"font-poppins text-sm font-semibold",

		"text-white/88",

		"transition-colors duration-300",

		"hover:text-orange",

		"focus:outline-none",

		"focus-visible:ring-2",

		"focus-visible:ring-orange",

		"focus-visible:ring-offset-4",

		"focus-visible:ring-offset-[#14120e]",
	].join(" ");

	const content = (
		<>
			<span
				className={[
					"flex h-12 w-12 shrink-0",

					"items-center justify-center",

					"rounded-full",

					"border border-orange/35",

					"bg-orange/[0.035]",

					"text-orange",

					"shadow-[inset_0_0_22px_rgba(244,152,25,0.055)]",

					"transition duration-300 ease-out",

					"group-hover/about-cta:border-orange/65",

					"group-hover/about-cta:bg-orange/[0.07]",
				].join(" ")}
			>
				<ArrowUpRight
					className={[
						"h-4 w-4",

						"transition-transform duration-300",

						"group-hover/about-cta:-translate-y-0.5",

						"group-hover/about-cta:translate-x-0.5",
					].join(" ")}
					aria-hidden="true"
				/>
			</span>

			<span className="relative pb-1">
				{children}

				<span
					className={[
						"absolute -bottom-1.5 left-0",

						"h-px w-8",

						"bg-orange/55",

						"transition-all duration-300",

						"group-hover/about-cta:w-full",
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