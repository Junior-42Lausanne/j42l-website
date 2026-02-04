import NavBarLink from "./sub_components/NavBarLink"; 
import StrapiImage from "./sub_components/StrapiImage";
import { LogoProps, IconProps } from "./NavBar";
import { NavBarLinkProps } from "./sub_components/NavBarLink";
import ButtonLink from "./sub_components/ButtonLink";
import { getStrapiContactDefailsData } from "../utils/utils";
import { ThemeColor } from "../utils/type";
import Link from "next/link";

export type FooterProps = {
	blocks: {
		logo: LogoProps;
		generalNavigation?: NavBarLinkProps[],
		serviceNavigation?: NavBarLinkProps[],
		externalNavigation?: NavBarLinkProps[],
		social?: IconProps[],
		cta: {
			url: string;
			color: ThemeColor;
			fullWidth?: boolean;
			external?: boolean;
			buttonText: string;
		},
		legalNavigation: NavBarLinkProps[],
	}
}

export type ContactInfomationProps = {
	contactDetails: {
		email: String,
		phone?: String,
		streetName?: String,
		streetNumber?: String,
		zipCode?: String,
		municipal?: String,
		city?: String,
		country?: String,
	}
}

export default async function Footer({blocks}: FooterProps) {
	try {
		const contactInformationData = await getStrapiContactDefailsData();
		if (!contactInformationData?.data?.contactDetails) 
			return null;
		const { contactDetails } : ContactInfomationProps = contactInformationData.data;
		if (!contactDetails || !contactDetails.email)
			return null;
		const currentYear = new Date().getFullYear();
		const {logo, generalNavigation, serviceNavigation, externalNavigation, social, cta, legalNavigation} = blocks;
		if (!logo || !cta || !social || !legalNavigation) {
			return null
		}
		const generalNavigationDiv = (
				<ul className="flex flex-col gap-[0.5rem] \
							lg:gap-[1rem]">
					{generalNavigation?.map((item) => (
						<li key={item.id}>
							<NavBarLink key={item.id} {...item} />
						</li>
					))}
				</ul>
		)
		const serviceNavigationDiv = (
				<ul className="flex flex-col gap-[0.5rem] \
							lg:gap-[1rem]">
					{serviceNavigation?.map((item) => (
						<li key={item.id}>
							<NavBarLink key={item.id} {...item} />
						</li>
					))}
				</ul>
		)
		const externalNavigationDiv = (
				<ul className="flex flex-col gap-[0.5rem] \
							lg:gap-[1rem]">
					{externalNavigation?.map((item) => (
						<li key={item.id}>
							<NavBarLink key={item.id} {...item} />
						</li>
					))}
				</ul>
		)
		const legalNavigationDiv = (
				<ul className="flex flex-col gap-[0.5rem] \
							lg:gap-[1rem]">
					{legalNavigation?.map((item) => (
						<li key={item.id}>
							<NavBarLink key={item.id} {...item} />
						</li>
					))}
				</ul>
		)
		return (
			<footer className="flex flex-col bg-black px-[1.25rem] gap-[0.5rem] py-[3rem] font-poppins text-white \
						md:px-[2rem] md:py-[4rem] md:gap-[1rem] \
						lg:px-[4.25rem] lg:gap-[3.125rem] lg:gap-[1.5rem]\
						xl:px-[6.25rem]">
				<div className="flex flex-row flex-wrap \
								md:justify-between">
					<div className="hidden \
									md:grid md:grid-cols-2 md:gap-[0.5rem] \
									xl:grid-cols-4 xl:gap-[1rem]">
						{generalNavigationDiv}
						{serviceNavigationDiv}
						{externalNavigationDiv}
						<div>
							<ButtonLink {...cta}>
								{cta.buttonText}
							</ButtonLink>
						</div>
					</div>
					<div className="flex flex-row w-full justify-between \
									md:flex-col md:w-auto md:justify-normal md:gap-[2rem] \
									xl:flex-row-reverse xl:gap-[5rem]">
						<div className="flex flex-col gap-[1rem] text-h5 \
										lg:max-xl:flex-row lg:max-xl:gap-[4rem] \
										xl:text-h4">
							<div className="flex flex-col gap-[0.5rem]">
								<div>
									{contactDetails.streetName && contactDetails.streetNumber ? (
										<div>{contactDetails.streetName} {contactDetails.streetNumber}</div>) : null}
									{contactDetails.zipCode || contactDetails.municipal ? (
										<div>{contactDetails.zipCode} {contactDetails.municipal}</div>) : null}
									{contactDetails.city || contactDetails.country ? (
										<div>
											{contactDetails.city}
											{contactDetails.city && contactDetails.country ? ", " : ""}
											{contactDetails.country}
										</div>) : null}
								</div>
							</div>
							<div className="flex flex-col gap-[0.5rem]">
								<div>{contactDetails.email ?? ""}</div>
								<div>{contactDetails.phone ?? ""}</div>
							</div>
						</div>
						<div className="flex flex-col gap-[1rem] items-center \
										md:flex-row md:gap-[0.625rem] \
										xl:items-start">
							{social.map((item) => (
								<div key={item.icon.id} className="relative w-[30px] h-[30px]">
									{item.external ? (
										<a href={item.url} target="_blank">
											<StrapiImage
												alternativeText={item.icon.alternativeText}
												className=""
												height={item.icon.height}
												url={item.icon.url}
												width={item.icon.width} />
										</a>
									) : (
										<Link href={item.url}>
											<StrapiImage
												alternativeText={item.icon.alternativeText}
												className=""
												height={item.icon.height}
												url={item.icon.url}
												width={item.icon.width} />
										</Link>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="flex flex-row pt-[3rem] \
								md:pt-[4rem] md:justify-end">
					{logo && (
						<div className='relative transition-transform duration-300 \
									md:max-lg:scale-80 md:max-lg:origin-right \ 
									xl:scale-150 xl:origin-right'
								style={{
									width: `${logo.logo.width}px`,
									height: `${logo.logo.height}px`,
								}}>
							{logo.external ? (
								<a href={logo.url} target="_blank">
									<StrapiImage
										alternativeText={logo.logo.alternativeText}
										className=""
										height={logo.logo.height}
										url={logo.logo.url}
										width={logo.logo.width} />
								</a>
							) : (
								<Link href={logo.url}>
									<StrapiImage
										alternativeText={logo.logo.alternativeText}
										className=""
										height={logo.logo.height}
										url={logo.logo.url}
										width={logo.logo.width} />
								</Link>
							)}
						</div>
					)}
				</div>
				<div className="flex flex-row flex-wrap justify-between gap-x-[50px] border-t-2 pb-[1rem] \
								">
					<div className="flex flex-col gap-[0.5rem]">
						<p className="pt-[1rem]">® {currentYear}  JUNIOR ENTREPRISE 42 LAUSANNE</p>
						<div>
							{legalNavigationDiv}
						</div>
					</div>
					<div className="flex flex-col gap-[0.5rem]">
						<div className="pt-[1rem]">Develop: Nguyen NGUYEN (hoannguy), Zelalem ALEMU (zalemu), Dianka MATAYI (dimatayi)</div>
						<div>Design:
							<a href="https://nguyennguyen.ch" target="_blank" rel="noopener noreferrer" className="hover:underline"> NguyenNGUYEN.ch</a>
						</div>
					</div>
				</div>
			</footer>
		)
	} catch(error) {
		console.error(error);
		return null;
	}
}