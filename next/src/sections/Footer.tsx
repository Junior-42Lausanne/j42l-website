import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import StrapiImage from "@/components/StrapiImage";
import type { NavBarLinkProps } from "@/components/NavBarLink";
import { getStrapiContactDetailsData } from "@/utils/fetchStrapiData";
import type { IconProps, LogoProps } from "@/sections/NavBar";
import type { Locale, ThemeColor } from "@/utils/type";

type FooterLink = Pick<
	NavBarLinkProps,
	"id" | "linkText" | "url" | "external"
>;

export type FooterProps = {
	blocks: {
		logo: LogoProps;
		generalNavigation?: FooterLink[];
		serviceNavigation?: FooterLink[];
		externalNavigation?: FooterLink[];
		social?: IconProps[];
		cta: {
			url: string;
			color: ThemeColor;
			fullWidth?: boolean;
			external?: boolean;
			buttonText: string;
		};
		legalNavigation: FooterLink[];
	};
};

type ContactDetails = {
	email: string;
	phone?: string;
	streetName?: string;
	streetNumber?: string;
	zipCode?: string;
	municipal?: string;
	city?: string;
	country?: string;
};

const FOOTER_COPY = {
	en: {
		eyebrow: "Have a project in mind?",
		title: "Let’s build something real.",
		explore: "Explore",
		services: "Services",
		elsewhere: "Elsewhere",
		location: "Lausanne · Switzerland",
		design: "Design",
		development: "Development",
	},

	fr: {
		eyebrow: "Un projet en tête ?",
		title: "Construisons quelque chose de réel.",
		explore: "Explorer",
		services: "Services",
		elsewhere: "Ailleurs",
		location: "Lausanne · Suisse",
		design: "Design",
		development: "Développement",
	},

	de: {
		eyebrow: "Ein Projekt im Kopf?",
		title: "Bauen wir etwas Echtes.",
		explore: "Entdecken",
		services: "Leistungen",
		elsewhere: "Anderswo",
		location: "Lausanne · Schweiz",
		design: "Design",
		development: "Entwicklung",
	},
} as const;

export default async function Footer({
	locale,
	blocks,
}: {
	locale: Locale;
	blocks: FooterProps["blocks"];
}) {
	try {
		const contactInformationData =
			await getStrapiContactDetailsData(locale);

		const contactDetails =
			contactInformationData?.data?.contactDetails as
				| ContactDetails
				| undefined;

		if (!contactDetails?.email) {
			return null;
		}

		const {
			logo,
			generalNavigation = [],
			serviceNavigation = [],
			externalNavigation = [],
			social = [],
			cta,
			legalNavigation = [],
		} = blocks;

		if (!logo || !cta) {
			return null;
		}

		const copy = FOOTER_COPY[locale] ?? FOOTER_COPY.en;
		const currentYear = new Date().getFullYear();

		return (
			<footer className="relative overflow-hidden bg-[#14120e] font-poppins text-white">
				<FooterAtmosphere />

				<div className="relative z-10 mx-auto w-full max-w-[105rem] px-5 pb-7 pt-16 sm:px-6 sm:pt-[4.5rem] lg:px-8 lg:pb-8 lg:pt-20">
					{/* ================================================================ */}
					{/* MAIN STATEMENT                                                   */}
					{/* ================================================================ */}

					<div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
						<div className="lg:col-span-8 xl:col-span-9">
							<p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-orange">
								{copy.eyebrow}
							</p>

							<h2
								className={[
									"mt-5 max-w-[55rem]",
									"text-[clamp(3.2rem,5.35vw,6.05rem)]",
									"font-semibold leading-[0.87]",
									"tracking-[-0.075em] text-white",
								].join(" ")}
							>
								{copy.title}
							</h2>

							<div className="mt-9">
								<FooterCta cta={cta} />
							</div>
						</div>

						{/* Identité */}
						<div className="lg:col-span-4 xl:col-span-3">
							<div className="relative lg:ml-auto lg:max-w-[19rem] lg:pt-8">
								<div className="pointer-events-none absolute -inset-12 -z-10 bg-[radial-gradient(circle_at_42%_38%,rgba(244,152,25,0.065),transparent_66%)] blur-2xl" />

								<FooterLogo logo={logo} />

								<p className="mt-7 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-orange/72">
									{copy.location}
								</p>

								<FooterAddress contact={contactDetails} />

								{contactDetails.phone ? (
									<a
										href={`tel:${contactDetails.phone.replace(/[^\d+]/g, "")}`}
										className="mt-2 block w-fit text-sm text-white/32 transition-colors duration-300 hover:text-white/65"
									>
										{contactDetails.phone}
									</a>
								) : null}

								{social.length ? (
									<div className="mt-6">
										<FooterSocial social={social} />
									</div>
								) : null}
							</div>
						</div>
					</div>

					{/* ================================================================ */}
					{/* TYPOGRAPHIC INDEX                                                */}
					{/* ================================================================ */}

					<div className="mt-16 lg:mt-[4.5rem]">
						<div className="grid max-w-[52rem] gap-y-6">
							<FooterIndexRow
								label={copy.explore}
								items={generalNavigation}
							/>

							<FooterIndexRow
								label={copy.services}
								items={serviceNavigation}
							/>

							<FooterIndexRow
								label={copy.elsewhere}
								items={externalNavigation}
							/>
						</div>
					</div>

					{/* ================================================================ */}
					{/* BOTTOM                                                           */}
					{/* ================================================================ */}

					<div className="relative mt-10 border-t border-white/[0.06] pt-6">
						<div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
							<div className="flex flex-col gap-4">
								<p className="text-[0.64rem] uppercase tracking-[0.18em] text-white/28">
									© {currentYear} Junior Entreprise 42 Lausanne
								</p>

								{legalNavigation.length ? (
									<ul className="flex flex-wrap gap-5">
										{legalNavigation.map((item) => (
											<li key={item.id}>
												<FooterLink
													item={item}
													subtle
												/>
											</li>
										))}
									</ul>
								) : null}
							</div>

							<div className="flex flex-col gap-1 text-xs text-white/24 lg:items-end">
								<p>
									<span className="text-white/38">
										{copy.design}
									</span>

									{" · "}

									<a
										href="https://nguyennguyen.ch"
										target="_blank"
										rel="noopener noreferrer"
										className="transition-colors duration-300 hover:text-orange"
									>
										NguyenNGUYEN.ch
									</a>
								</p>

								<p>
									<span className="text-white/38">
										{copy.development}
									</span>

									{" · "}

									Nguyen Nguyen · Zelalem Alemu · Dianka Matayi
								</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
		);
	} catch (error) {
		console.error(`Footer. ${error}`);
		return null;
	}
}

/* ========================================================================== */
/* CTA                                                                        */
/* ========================================================================== */

function FooterCta({
	cta,
}: {
	cta: FooterProps["blocks"]["cta"];
}) {
	const className = [
		"group/footer-cta inline-flex w-fit items-center gap-4",
		"text-base font-semibold text-white/88",
		"transition-colors duration-300 hover:text-orange",
	].join(" ");

	const content = (
		<>
			<span className="relative">
				{cta.buttonText}

				<span className="absolute -bottom-1.5 left-0 h-px w-8 bg-orange/60 transition-all duration-500 group-hover/footer-cta:w-full" />
			</span>

			<span
				className={[
					"flex h-11 w-11 items-center justify-center rounded-full",
					"border border-orange/35 bg-orange/[0.055]",
					"text-orange",
					"transition duration-500",
					"ease-[cubic-bezier(0.22,1,0.36,1)]",
					"group-hover/footer-cta:-translate-y-0.5",
					"group-hover/footer-cta:border-orange",
					"group-hover/footer-cta:bg-orange",
					"group-hover/footer-cta:text-[#14120e]",
				].join(" ")}
			>
				<ArrowUpRight
					className="h-4 w-4 transition-transform duration-500 group-hover/footer-cta:-translate-y-0.5 group-hover/footer-cta:translate-x-0.5"
					aria-hidden="true"
				/>
			</span>
		</>
	);

	if (cta.external) {
		return (
			<a
				href={cta.url}
				target="_blank"
				rel="noopener noreferrer"
				className={className}
			>
				{content}
			</a>
		);
	}

	return (
		<Link href={cta.url} className={className}>
			{content}
		</Link>
	);
}

/* ========================================================================== */
/* INDEX                                                                      */
/* ========================================================================== */

function FooterIndexRow({
	label,
	items,
}: {
	label: string;
	items: FooterLink[];
}) {
	if (!items.length) {
		return null;
	}

	return (
		<div
			className={[
				"grid gap-3",
				"sm:grid-cols-[8.5rem_1fr]",
				"lg:grid-cols-[9rem_minmax(0,1fr)]",
				"lg:items-center",
			].join(" ")}
		>
			<p className="text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-orange/70">
				{label}
			</p>

			<ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
				{items.map((item) => (
					<li key={item.id}>
						<FooterLink item={item} />
					</li>
				))}
			</ul>
		</div>
	);
}

function FooterLink({
	item,
	subtle = false,
}: {
	item: FooterLink;
	subtle?: boolean;
}) {
	const className = [
		"transition-colors duration-300",
		subtle
			? "text-xs text-white/28 hover:text-white/60"
			: "text-[0.95rem] font-medium text-white/48 hover:text-orange",
	].join(" ");

	if (item.external) {
		return (
			<a
				href={item.url}
				target="_blank"
				rel="noopener noreferrer"
				className={className}
			>
				{item.linkText}
			</a>
		);
	}

	return (
		<Link href={item.url} className={className}>
			{item.linkText}
		</Link>
	);
}

/* ========================================================================== */
/* IDENTITY                                                                   */
/* ========================================================================== */

function FooterLogo({
	logo,
}: {
	logo: LogoProps;
}) {
	const image = (
		<div className="flex h-10 w-[7.5rem] items-center">
			<StrapiImage
				alternativeText={logo.logo.alternativeText}
				className="h-full w-full object-contain object-left"
				height={logo.logo.height}
				url={logo.logo.url}
				width={logo.logo.width}
			/>
		</div>
	);

	if (logo.external) {
		return (
			<a
				href={logo.url}
				target="_blank"
				rel="noopener noreferrer"
			>
				{image}
			</a>
		);
	}

	return <Link href={logo.url}>{image}</Link>;
}

function FooterAddress({
	contact,
}: {
	contact: ContactDetails;
}) {
	const hasAddress = Boolean(
		contact.streetName ||
			contact.streetNumber ||
			contact.zipCode ||
			contact.municipal ||
			contact.city ||
			contact.country,
	);

	if (!hasAddress) {
		return null;
	}

	return (
		<address className="mt-3 not-italic text-sm leading-[1.65] text-white/30">
			{contact.streetName || contact.streetNumber ? (
				<div>
					{contact.streetName}

					{contact.streetName && contact.streetNumber
						? " "
						: ""}

					{contact.streetNumber}
				</div>
			) : null}

			{contact.zipCode || contact.municipal ? (
				<div>
					{contact.zipCode}

					{contact.zipCode && contact.municipal
						? " "
						: ""}

					{contact.municipal}
				</div>
			) : null}

			{contact.city || contact.country ? (
				<div>
					{contact.city}

					{contact.city && contact.country ? ", " : ""}

					{contact.country}
				</div>
			) : null}
		</address>
	);
}

/* ========================================================================== */
/* SOCIAL                                                                     */
/* ========================================================================== */

function FooterSocial({
	social,
}: {
	social: IconProps[];
}) {
	return (
		<div className="flex items-center gap-2">
			{social.map((item, index) => {
				const content = (
					<span
						className={[
							"group/social flex h-9 w-9 items-center justify-center",
							"rounded-full border border-white/[0.08]",
							"bg-white/[0.02] p-2",
							"transition duration-300",
							"hover:border-orange/30 hover:bg-orange/[0.06]",
						].join(" ")}
					>
						<span className="flex h-full w-full items-center justify-center opacity-50 transition-opacity duration-300 group-hover/social:opacity-100">
							<StrapiImage
								alternativeText={
									item.icon.alternativeText
								}
								className="h-full w-full object-contain"
								height={item.icon.height}
								url={item.icon.url}
								width={item.icon.width}
							/>
						</span>
					</span>
				);

				if (item.external) {
					return (
						<a
							key={`${item.url}-${index}`}
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={
								item.icon.alternativeText ??
								"Social link"
							}
						>
							{content}
						</a>
					);
				}

				return (
					<Link
						key={`${item.url}-${index}`}
						href={item.url}
						aria-label={
							item.icon.alternativeText ??
							"Social link"
						}
					>
						{content}
					</Link>
				);
			})}
		</div>
	);
}

/* ========================================================================== */
/* AMBIENCE                                                                   */
/* ========================================================================== */

function FooterAtmosphere() {
	return (
		<>
			<div className="pointer-events-none absolute -right-[14rem] -top-[16rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(244,152,25,0.07),rgba(244,152,25,0.018)_42%,transparent_70%)] blur-3xl" />

			<div className="pointer-events-none absolute bottom-[-16rem] left-[8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(244,152,25,0.035),transparent_68%)] blur-3xl" />
		</>
	);
}