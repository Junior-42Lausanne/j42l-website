import FooterNavButton from "./footerNavButton";
import Image from 'next/image'

export default function Footer() {
	const currentYear = new Date().getFullYear();
	const footerNav1 = (
			<ul className="flex flex-col gap-[20px]">
				<li><FooterNavButton text="Accueil" buttonPath="https://www.google.com"/></li>
				<li><FooterNavButton text="À propos" buttonPath="https://www.google.com"/></li>
				<li><FooterNavButton text="Jobs" buttonPath="https://www.google.com"/></li>
			</ul>
	)
	const footerNav2 = (
			<ul className="flex flex-col gap-[20px]">
				<li><FooterNavButton text="Website" buttonPath="https://www.google.com"/></li>
				<li><FooterNavButton text="Prototype" buttonPath="https://www.google.com"/></li>
				<li><FooterNavButton text="Automation" buttonPath="https://www.google.com"/></li>
			</ul>
	)
	const footerNav3 = (
			<ul className="flex flex-col gap-[20px]">
				<li><FooterNavButton text="GameJam" buttonPath="https://www.google.com"/></li>
			</ul>
	)
	const footerNav4 = (
			<ul className="flex flex-col gap-[20px]">
				<li><FooterNavButton text="Contact" buttonPath="https://www.google.com"/></li>
			</ul>
	)
	const footerNav5 = (
			<ul className="flex flex-col gap-[20px]">
				<li><FooterNavButton text="Linkedin" buttonPath="https://www.google.com"/></li>
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
						<div>{footerNav5}</div>
					</div>
					<div className="flex flex-col gap-[20px] font-poppins text-h5 text-white">
						<div>Rue de Lausanne 64<br/>1020 Renens<br/>LAUSANNE</div>
						<div>contact@j42l.ch<br/>079 305 53 37</div>
					</div>
				</div>
				<div>
					<div className="flex flex-row justify-end">
						<Image className="w-[550px]" src="/graphic/elements/svg/Junior Orange.svg" alt="junior alt logo" width={550} height={1000}/>
					</div>
				</div>
			</div>
			<div className="border-[1px] border-white"></div>
			<div className="flex flex-row justify-between pr-[200px] pl-[200px] pt-[5px]">
				<div>® {currentYear} JUNIOR ENTREPRISE 42 LAUSANNE. Tous droits réservés.</div>
				<div>Design: NguyenNGUYEN.ch</div>
			</div>
		</footer>
	)
}