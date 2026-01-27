import { getStrapiGlobalData } from "../utils/utils";
import { FooterInfo } from "../utils/utils";
import FooterNavButton from "./FooterNavButton";
import StrapiImage from "./sub_components/StrapiImage";

export default async function Footer() {

	const data: FooterInfo | null = await getStrapiGlobalData();
	const footer = data?.data?.footer;
	console.log("Footer data:", data?.data?.footer);
	if (!footer) {
		return null;
	}

	const currentYear = new Date().getFullYear();
	const navItems = (
			<ul className="flex flex-col gap-[8px]">
				{footer.navItems?.map((item) => (
					<li key={item.id}>
						<FooterNavButton text={item.linkText ?? ""} buttonPath={item.url ?? ""} />
					</li>
				))}
			</ul>
	)
	const services = (
			<ul className="flex flex-col gap-[8px]">
				{footer.services?.map((item) => (
					<li key={item.id}>
						<FooterNavButton text={item.linkText ?? ""} buttonPath={item.url ?? ""} />
					</li>
				))}
			</ul>
	)
	const gameJam = (
			<ul>
				{footer.gameJam && (
					<li>
						<FooterNavButton text={footer.gameJam.linkText ?? ""} buttonPath={footer.gameJam.url ?? ""} />
					</li>
				)}
			</ul>
	)
	return (
		<footer className="bg-black font-poppins text-h5 text-white py-[30px] px-[80px]">
			<div className="flex justify-between gap-x-[60px] gap-y-[30px] flex-wrap">
				<div>
					{navItems}
				</div>
				<div>
					{services}
				</div>
				<div>
					{gameJam}
				</div>
				<div className="flex flex-col gap-[16px]">
					<div className="flex flex-col gap-[8px]">
						<div>{footer.contactDetails?.street ?? ""}</div>
						<div>{footer.contactDetails?.city ?? ""}</div>
						<div>{footer.contactDetails?.country ?? ""}</div>
					</div>
					<div className="flex flex-col gap-[8px]">
						<div>{footer.contactDetails?.email ?? ""}</div>
						<div>{footer.contactDetails?.number ?? ""}</div>
					</div>
				</div>
			</div>
			<div className="flex flex-row justify-end my-[30px]">
				{footer.altLogo && (
					<div className="relative w-[300px] h-[50px] shrink">
						<StrapiImage
							url={footer.altLogo.url}
							alternativeText={footer.altLogo.alternativeText}
							width={footer.altLogo.width}
							height={footer.altLogo.height}
							className="object-contain"
							/>
					</div>
				)}
			</div>
			<div className="flex flex-row flex-wrap justify-between gap-x-[50px] border-t-2 pb-[10px]">
				<p className="pt-[8px]">® {currentYear} {footer.copyright}</p>
				<p className="pt-[8px]">Design : {footer.designer}</p>
			</div>
		</footer>
	)
}