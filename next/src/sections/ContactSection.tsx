import { type ThemeColor } from "@/utils/type"
import StrapiImage, { type StrapiImageProps } from "@/components/StrapiImage"
import { getStrapiContactDetailsData } from "@/utils/fetchStrapiData";
import { type ContactInfomationProps } from "@/sections/Footer";
import type { Locale } from "@/utils/type";

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
    locale,
    ...block
} : 
    ContactSectionProps &
    { locale?: Locale }
){
    try {
        const lang : Locale = locale ?? "fr"
        const contactInformationData = await getStrapiContactDetailsData(lang);
        if (!contactInformationData?.data?.contactDetails) 
            return null;
        const { contactDetails } : ContactInfomationProps = contactInformationData.data;
        if (!contactDetails || !contactDetails.email)
            return null;
    
    return (
        <section className="flex flex-row items-center flex-wrap px-[1.25rem] gap-[4rem] py-[6rem]
                    md:px-[2rem] md:py-[8rem] md:gap-[2rem]
                    lg:px-[8rem] lg:gap-[3.125rem]
                    xl:px-[16rem]"
                    style={{
                        backgroundColor: `var(--color-${block.backgroundColor})`,
                        color: `var(--color-${block.textColor})`,
                    }}>
            <div className="flex flex-col gap-[4rem] font-poppins text-h5 xl:text-h4">
                <header className="flex flex-col gap-[1rem] min-w-md
                                md:gap-[2rem]">
                    <h1 className="text-h2 leading-[1.1]
                                md:text-h1">{block.title}</h1>
                    <p>{block.description}</p>
                </header>
                <div className="flex flex-col gap-[2rem] pl-[2rem]
                                md:pl-[4rem]
                                xl:pl-[6rem]">
                    {contactDetails.email &&
                        (<div className="flex flex-row gap-[1rem] items-center">
                            <div className="relative w-[50px] h-[50px]">
                                <StrapiImage
                                    alternativeText={block.emailIcon.alternativeText}
                                    className=""
                                    height={block.emailIcon.height}
                                    url={block.emailIcon.url}
                                    width={block.emailIcon.width} />
                            </div>
                            <div>{contactDetails.email}</div>
                        </div>)}
                    {contactDetails.phone &&
                        (<div className="flex flex-row gap-[1rem] items-center">
                            <div className="relative w-[50px] h-[50px]">
                                <StrapiImage
                                    alternativeText={block.phoneIcon.alternativeText}
                                    className=""
                                    height={block.phoneIcon.height}
                                    url={block.phoneIcon.url}
                                    width={block.phoneIcon.width} />
                            </div>
                            <div>{contactDetails.phone}</div>
                        </div>)
                    }
                    {(contactDetails.streetName || contactDetails.streetNumber || contactDetails.zipCode || contactDetails.municipal || contactDetails.city || contactDetails.country) &&
                        (<div className="flex flex-row gap-[1rem] items-center">
                            <div className="relative w-[50px] h-[50px]">
                                <StrapiImage
                                    alternativeText={block.addressIcon.alternativeText}
                                    className=""
                                    height={block.addressIcon.height}
                                    url={block.addressIcon.url}
                                    width={block.addressIcon.width} />
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
                        </div>)
                    }
                </div>
            </div>
            <div className="flex flex-grow justify-end">
                <div className="relative w-[250px] h-[250px]
                                md:w-[350px] md:h-[350px]
                                lg:w-[450px] lg:h-[450px]">
                    <StrapiImage
                        alternativeText={block.illustration.alternativeText}
                        className=""
                        height={block.illustration.height}
                        url={block.illustration.url}
                        width={block.illustration.width} />
                </div>
            </div>
        </section>
    )
    } catch(error) {
        console.error(`Contact Information. ${error}`);
        throw error;
    }
}