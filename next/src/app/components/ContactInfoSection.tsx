import Image from "next/image";
import StrapiImage, { StrapiImageProps } from "./sub_components/StrapiImage";

export type ContactInfoSectionProps = {
	id: number,
	__component: "layout.contact-info",
	text: string,
	email: string,
	phone: string,
	street: string,
	city: string,
	country: string,
	logo: StrapiImageProps,
}

export default function ContactInfoSection({
	text,
	email,
	phone,
	street,
	city,
	country,
	logo,
}: ContactInfoSectionProps) {
	return (
		<div className="flex flex-wrap bg-pale_orange text-black relative p-[40px] gap-[30px]">
			<div className="w-full font-poppins text-h2">
				<h2>Contactez-nous</h2>
			</div>

			<div className="flex flex-col gap-[30px] items-start flex-[1_1_350px]">
				<div className="font-poppins text-h5 whitespace-normal">
					<p className="text-justify">{text}</p>
				</div>

				<div className="flex flex-col gap-[30px]">
					<div className="flex gap-[20px] items-center">
						<Image src="/graphic/icon/png/mail_black.png" alt="Mail icon" width={40} height={40} className="object-contain" />
						<p>{email}</p>
					</div>

					<div className="flex gap-[20px] items-center">
						<Image src="/graphic/icon/png/phone_black.png" alt="Phone icon" width={40} height={40} className="object-contain" />
						<p>{phone}</p>
					</div>

					<div className="flex gap-[20px] items-center">
						<Image src="/graphic/icon/png/home_black.png" alt="Home icon" width={40} height={40} className="object-contain" />
						<div className="flex flex-col">
							<p>{street}</p>
							<p>{city}</p>
							<p>{country}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="relative flex-[1_1_200px] max-w-full h-[250px] mx-auto">
				<StrapiImage
					url={logo.url}
					alternativeText={logo.alternativeText}
					width={logo.width}
					height={logo.height}
					className="object-contain"
				/>
			</div>
		</div>
	);
}
