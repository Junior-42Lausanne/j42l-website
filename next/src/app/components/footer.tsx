import FooterNavButton from "./footerNavButton";
import Image from 'next/image'
import { getStrapiGlobalData } from "../utils/utils";

interface GlobalData {
  data: {
    footer: {
			copyright: string;
			designer: string;
      navItems: Array<{ id: number; url: string; text: string }>;
      services: Array<{ id: number; url: string; text: string }>;
      socialLinks: Array<{ id: number; url: string; text: string }>;
      gameJam: { id: number; url: string; text: string };
      contactDetails: { id: number; email: string; street: string; city: string; country: string; number: string };
      logo: { id: number; url: string; alternativeText: string; width: number; height: number };
    };
  };
}

export default async function Footer() {

	const data: GlobalData | null = await getStrapiGlobalData();
	if (!data) {
		return;
	}
	const footer = data.data.footer;
	console.dir(footer);

	const currentYear = new Date().getFullYear();
	const footerNav1 = (
			<ul className="flex flex-col gap-[20px]">
				{footer.navItems?.map((item) => (
					<li key={item.id}>
						<FooterNavButton text={item.text ?? ""} buttonPath={item.url ?? ""} />
					</li>
				))}
			</ul>
	)
	const footerNav2 = (
			<ul className="flex flex-col gap-[20px]">
				{footer.services?.map((item) => (
					<li key={item.id}>
						<FooterNavButton text={item.text ?? ""} buttonPath={item.url ?? ""} />
					</li>
				))}
			</ul>
	)
	const footerNav3 = (
			<ul className="flex flex-col gap-[20px]">
				<li><FooterNavButton text={footer.gameJam.text ?? ""} buttonPath={footer.gameJam.url ?? ""} /></li>
			</ul>
	)
	const footerNav4 = (
			<ul className="flex flex-col gap-[20px]">
				<li><FooterNavButton text="Contact" buttonPath="https://www.google.com"/></li>
			</ul>
	)
	return (
		<footer className="flex flex-col bg-black pb-[50px]">
			<div className="flex flex-col gap-[60px] justify-center pr-[200px] pl-[200px] pt-[50px] pb-[40px]">
				<div className="flex flex-row justify-between">
					<div className="flex flex-row gap-[50px]">
						<div>{footerNav1}</div>
						<div>{footerNav2}</div>
						<div>{footerNav3}</div>
						<div>{footerNav4}</div>
					</div>
					<div className="flex flex-col gap-[20px] font-poppins text-h5 text-white">
						<div>{footer.contactDetails.street ?? ""}<br/>{footer.contactDetails.city ?? ""}<br/>{footer.contactDetails.country ?? ""}</div>
						<div>{footer.contactDetails.email ?? ""}<br/>{footer.contactDetails.number ?? ""}</div>
					</div>
				</div>
				<div>
					<div className="flex flex-row justify-end">
						<Image className="w-[550px]" src={footer.logo.url} alt={footer.logo.alternativeText} width={footer.logo.width} height={footer.logo.height}/>
					</div>
				</div>
			</div>
			<div className="border border-white"></div>
			<div className="flex flex-row justify-between pr-[200px] pl-[200px] pt-[5px]">
				<div>® {currentYear} {footer.copyright}</div>
				<div>Design: {footer.designer}</div>
			</div>
		</footer>
	)
}