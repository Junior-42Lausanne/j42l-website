import TextSection, { type TextSectionProps } from '../sections/TextSection';
import FooterCTASection, { type FooterCTASectionProps } from "../sections/FooterCTASection";
import TextSectionWithTitle, { type TextSectionWithTitleProps } from "../sections/TextSectionWithTitle";
import MemberSection, { type MemberSectionProps } from "../sections/MemberSection";
import NavBarLink, { type NavBarLinkProps } from '../components/NavBarLink';
import NavBarDropdown, { type NavBarDropdownProps } from "../components/NavBarDropdown";
import HeroSection, { type HeroSectionProps } from '../sections/HeroSection';
import ContactSection, { type ContactSectionProps } from '../sections/ContactSection';
import ServiceCardSection, { type ServiceCardSectionProps } from '../sections/ServiceSection';
import ServicesSection, { type ServicesSectionProps } from '../sections/ServicesSection';
import { type Mode } from '../utils/type';

export type AnchorTagProps = {
    id: number,
    __component: "layout.anchor-tag",
    anchorId: string,
}

export type Block = HeroSectionProps |
                    TextSectionProps |
                    FooterCTASectionProps | 
                    TextSectionWithTitleProps |
                    MemberSectionProps |
                    ServiceCardSectionProps |
                    ServicesSectionProps |
                    ContactSectionProps |
                    AnchorTagProps;

export function blockRenderer(block: Block) {
    if (!block) {
        return null;
    }

    const key = `${block.__component}-${block.id}`;

    switch (block.__component) {
        case "layout.hero":
            return <HeroSection key={key} {...block} />;
        case "layout.member-section":
            return <MemberSection key={key} {...block} />;
        case "layout.text-section-with-title":
            return <TextSectionWithTitle key={key} {...block} />;
        case "layout.text-section":
            return <TextSection key={key} {...block} />;
        case "layout.footer-cta":
            return <FooterCTASection key={key} {...block} />;
        case "layout.card-section":
            return <ServiceCardSection key={key} {...block} />;
        case "layout.contact-section":
            return <ContactSection key={key} {...block} />;
        case "layout.services":
            return <ServicesSection key={key} {...block} />;
        case "layout.anchor-tag":
            return <div key={key} id={block.anchorId}/>
        default:
            return null;
    }
}


export type menuItem = NavBarLinkProps | NavBarDropdownProps;

export function menuRenderer(item: menuItem, mode: Mode) {
    if (!item) {
        return null;
    }
    switch (item.__component) {
        case "composants.link":
            return <NavBarLink key={item.id} {...item} mode={mode} />;
        case "composants.dropdown-link":
            return <NavBarDropdown key={item.id} {...item} mode={mode} />;
        default:
            return null;
    }
}