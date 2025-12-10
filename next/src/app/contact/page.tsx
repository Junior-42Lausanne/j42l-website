import { getStrapiGlobalData } from "../utils/utils";
import { StrapiImage } from "../components/sub_components/strapiImage";
import Image from "next/image";
import FooterInfo from "../logic/footerInfo";

export default async function Home() {

	const data: FooterInfo | null = await getStrapiGlobalData();
	if (!data) {
			return;
	}

	const contact = data.data.footer;

	return (
		<>
			<div className="flex flex-wrap text-black relative p-[40px] gap-[30px]">
				<div className="w-full font-poppins text-h2">
					<h2>Contactez-nous</h2>
				</div>

				<div className="flex flex-col gap-[30px] items-start flex-[1_1_350px]">
					<div className="font-poppins text-h5 whitespace-normal">
						<p className="text-justify">{contact.text}</p>
					</div>

					<div className="flex flex-col gap-[30px]">
						<div className="flex gap-[20px] items-center">
							<Image src="/graphic/icon/png/mail_black.png" alt="Mail icon" width={40} height={40} className="object-contain" />
							<p>{contact.contactDetails.email}</p>
						</div>

						<div className="flex gap-[20px] items-center">
							<Image src="/graphic/icon/png/phone_black.png" alt="Phone icon" width={40} height={40} className="object-contain" />
							<p>{contact.contactDetails.number}</p>
						</div>

						<div className="flex gap-[20px] items-center">
							<Image src="/graphic/icon/png/home_black.png" alt="Home icon" width={40} height={40} className="object-contain" />
							<div className="flex flex-col">
								<p>{contact.contactDetails.street}</p>
								<p>{contact.contactDetails.city}</p>
								<p>{contact.contactDetails.country}</p>
							</div>
						</div>
					</div>
				</div>

				<div className="relative flex-[1_1_200px] max-w-full h-[250px] mx-auto">
					<StrapiImage
						src={contact.halfLogo.url}
						alt={contact.halfLogo.alternativeText}
						width={contact.halfLogo.width}
						height={contact.halfLogo.height}
						className="object-contain"
					/>
				</div>
			</div>
		</>
	);
}