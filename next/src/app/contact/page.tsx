import Image from "next/image";
import type { Metadata } from "next";
import { getStrapiGlobalData } from "@/app/utils/utils";
import StrapiImage from "@/app/components/sub_components/StrapiImage";
import type { FooterInfo } from "@/app/utils/utils";

export const metadata: Metadata = {
	title: "Contact - J42L",
	description: "Junior 42 Lausanne",
};

export default async function Contact() {
	const data: FooterInfo | null = await getStrapiGlobalData();
	if (!data) {
		return null;
	}

	const contact = data.data.footer;
	console.log(contact);

	return (
		<div className="flex flex-wrap bg-pale_orange text-black relative p-[150px] gap-[30px] min-h-[66.67vh]">
			<div className="w-full font-poppins text-h1">
				<h1>Contactez-nous</h1>
			</div>

			<div className="flex flex-col gap-[80px] items-start flex-[1_1_350px]">
				<div className="font-poppins text-h4 whitespace-normal">
					<p className="text-justify">{contact.text}</p>
				</div>

				<div className="flex flex-col text-h4 gap-[30px]">
					<div className="flex gap-[20px] items-center">
						<Image src="/graphic/icon/png/mail_black.png" alt="Mail icon" width={70} height={70} className="object-contain" />
						<p>{contact.contactDetails.email}</p>
					</div>

					<div className="flex gap-[20px] items-center">
						<Image src="/graphic/icon/png/phone_black.png" alt="Phone icon" width={70} height={70} className="object-contain" />
						<p>{contact.contactDetails.number}</p>
					</div>

					<div className="flex gap-[20px] items-center">
						<Image src="/graphic/icon/png/home_black.png" alt="Home icon" width={70} height={70} className="object-contain" />
						<div className="flex flex-col">
							<p>{contact.contactDetails.street}</p>
							<p>{contact.contactDetails.city}</p>
							<p>{contact.contactDetails.country}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="relative flex-[1_1_200px] max-w-full h-[400px] mx-auto">
				<StrapiImage
					url={contact.halfLogo.url}
					alternativeText={contact.halfLogo.alternativeText}
					width={contact.halfLogo.width}
					height={contact.halfLogo.height}
					className="object-contain"
				/>
			</div>
		</div>
	);
}
