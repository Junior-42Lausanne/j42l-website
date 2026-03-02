import { type ThemeColor } from "../utils/type"
import StrapiImage, { type StrapiImageProps } from "../components/StrapiImage"
import { getStrapiContactDetailsData } from "../utils/fetchStrapiData";
import { type ContactInfomationProps } from "./Footer";

export type ContactSectionProps = {
    id: number,
    __component: "layout.contact-section",
    title: string,
    description: string,
    phoneIcon: StrapiImageProps,
    emailIcon: StrapiImageProps,
    addressIcon: StrapiImageProps,
    illustration: StrapiImageProps,
    textColor: ThemeColor,
    backgroundColor: ThemeColor,
}

export default async function ContactSection({
    title,
    description,
    phoneIcon,
    emailIcon,
    addressIcon,
    illustration,
    textColor,
    backgroundColor
    } : ContactSectionProps) {
        try {
            const contactInformationData = await getStrapiContactDetailsData();
            if (!contactInformationData?.data?.contactDetails) 
                return null;
            const { contactDetails } : ContactInfomationProps = contactInformationData.data;
            if (!contactDetails || !contactDetails.email)
                return null;
        
        return (
            <section className="flex flex-row items-center justify-end flex-wrap px-[1.25rem] gap-[4rem] py-[6rem]
                        md:px-[2rem] md:py-[8rem] md:gap-[2rem]
                        lg:px-[8rem] lg:gap-[3.125rem]
                        xl:px-[16rem]"
                        style={{
                            backgroundColor: `var(--color-${backgroundColor})`,
                            color: `var(--color-${textColor})`,
                        }}>
                <div className="flex flex-col gap-[4rem] font-poppins text-h5 xl:text-h4">
                    <header className="flex flex-col gap-[1rem]
                                    md:gap-[2rem]
                                    lg:w-2/3">
                        <h1 className="text-h2 leading-[1.1]
                                    md:text-h1">{title}</h1>
                        <p>{description}</p>
                    </header>
                    <div className="flex flex-col gap-[2rem] pl-[2rem]
                                    md:pl-[4rem]
                                    xl:pl-[6rem]">
                        <div className="flex flex-row gap-[1rem] items-center">
                            <div className="relative w-[50px] h-[50px]">
                                <StrapiImage
                                    alternativeText={emailIcon.alternativeText}
                                    className=""
                                    height={emailIcon.height}
                                    url={emailIcon.url}
                                    width={emailIcon.width} />
                            </div>
                            <div>{contactDetails.email ?? ""}</div>
                        </div>
                        <div className="flex flex-row gap-[1rem] items-center">
                            <div className="relative w-[50px] h-[50px]">
                                <StrapiImage
                                    alternativeText={phoneIcon.alternativeText}
                                    className=""
                                    height={phoneIcon.height}
                                    url={phoneIcon.url}
                                    width={phoneIcon.width} />
                            </div>
                            <div>{contactDetails.phone ?? ""}</div>
                        </div>
                        <div className="flex flex-row gap-[1rem] items-center">
                            <div className="relative w-[50px] h-[50px]">
                                <StrapiImage
                                    alternativeText={addressIcon.alternativeText}
                                    className=""
                                    height={addressIcon.height}
                                    url={addressIcon.url}
                                    width={addressIcon.width} />
                            </div>
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
                        </div>

                    </div>
                </div>
                <div className="flex">
                    <div className="relative w-[250px] h-[250px]
                                    md:w-[350px] md:h-[350px]
                                    lg:w-[450px] lg:h-[450px]">
                        <StrapiImage
                            alternativeText={illustration.alternativeText}
                            className=""
                            height={illustration.height}
                            url={illustration.url}
                            width={illustration.width} />
                    </div>
                </div>
            </section>
        )
        } catch(error) {
            console.error(`Contact Information. ${error}`);
		    throw error;
        }
}