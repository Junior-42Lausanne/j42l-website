import type { Schema, Struct } from '@strapi/strapi';

export interface ComposantsCard extends Struct.ComponentSchema {
  collectionName: 'components_composants_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    button: Schema.Attribute.Component<'composants.lien', false> &
      Schema.Attribute.Required;
    text: Schema.Attribute.Blocks & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

<<<<<<< HEAD
export interface ComposantsContactDetails extends Struct.ComponentSchema {
  collectionName: 'components_composants_contact_details';
  info: {
    displayName: 'Contact details';
  };
  attributes: {
    city: Schema.Attribute.String & Schema.Attribute.DefaultTo<'lausanne'>;
    country: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Suisse'>;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    municipal: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Renens'>;
    phone: Schema.Attribute.String;
    streetName: Schema.Attribute.String;
    streetNumber: Schema.Attribute.String;
    zipCode: Schema.Attribute.BigInteger & Schema.Attribute.DefaultTo<'1020'>;
  };
}

=======
>>>>>>> dev
export interface ComposantsDropdownLink extends Struct.ComponentSchema {
  collectionName: 'components_composants_dropdown_links';
  info: {
    displayName: 'Dropdown link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    links: Schema.Attribute.Component<'composants.link', true> &
      Schema.Attribute.Required;
  };
}

export interface ComposantsLien extends Struct.ComponentSchema {
  collectionName: 'components_composants_liens';
  info: {
    displayName: 'Button';
  };
  attributes: {
    buttonText: Schema.Attribute.String & Schema.Attribute.Required;
    color: Schema.Attribute.Enumeration<['orange', 'white']> &
      Schema.Attribute.Required;
    external: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    fullWidth: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComposantsLink extends Struct.ComponentSchema {
  collectionName: 'components_composants_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    external: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    linkText: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComposantsLogo extends Struct.ComponentSchema {
  collectionName: 'components_composants_logos';
  info: {
    displayName: 'Logo';
  };
  attributes: {
    external: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'/'>;
  };
}

export interface ComposantsMemberCard extends Struct.ComponentSchema {
  collectionName: 'components_composants_member_cards';
  info: {
    displayName: 'Member card';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
    social: Schema.Attribute.Component<'composants.social', true>;
  };
}

export interface ComposantsSectionTitle extends Struct.ComponentSchema {
  collectionName: 'components_composants_section_titles';
  info: {
    displayName: 'Section title';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<['orange', 'white', 'black']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComposantsSocial extends Struct.ComponentSchema {
  collectionName: 'components_composants_socials';
  info: {
    displayName: 'Social';
  };
  attributes: {
    external: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    icon: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutCardSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_card_sections';
  info: {
    displayName: 'Card section';
  };
  attributes: {
<<<<<<< HEAD
    cards: Schema.Attribute.Component<'composants.card', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.Component<'composants.section-title', false> &
      Schema.Attribute.Required;
=======
    cards: Schema.Attribute.Component<'composants.card', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
>>>>>>> dev
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'footer';
  };
  attributes: {
    cta: Schema.Attribute.Component<'composants.lien', false> &
      Schema.Attribute.Required;
    externalNavigation: Schema.Attribute.Component<'composants.link', true>;
    generalNavigation: Schema.Attribute.Component<'composants.link', true>;
    legalNavigation: Schema.Attribute.Component<'composants.link', true> &
      Schema.Attribute.Required;
    logo: Schema.Attribute.Component<'composants.logo', false> &
      Schema.Attribute.Required;
    serviceNavigation: Schema.Attribute.Component<'composants.link', true>;
    social: Schema.Attribute.Component<'composants.social', true> &
      Schema.Attribute.Required;
  };
}

export interface LayoutFooterCta extends Struct.ComponentSchema {
  collectionName: 'components_layout_footer_ctas';
  info: {
    displayName: 'footerCta';
  };
  attributes: {
    button: Schema.Attribute.Component<'composants.lien', false> &
      Schema.Attribute.Required;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutHero extends Struct.ComponentSchema {
  collectionName: 'components_layout_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    button: Schema.Attribute.Component<'composants.lien', false>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subheading: Schema.Attribute.Text;
    triangleColor: Schema.Attribute.Enumeration<['orange', 'white']> &
      Schema.Attribute.Required;
  };
}

export interface LayoutMemberSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_member_sections';
  info: {
    displayName: 'memberSection';
  };
  attributes: {
    members: Schema.Attribute.Component<'composants.member-card', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.Component<'composants.section-title', false> &
      Schema.Attribute.Required;
  };
}

export interface LayoutNavBar extends Struct.ComponentSchema {
  collectionName: 'components_layout_nav_bars';
  info: {
    displayName: 'navBar';
  };
  attributes: {
    cta: Schema.Attribute.Component<'composants.lien', false> &
      Schema.Attribute.Required;
    logo: Schema.Attribute.Component<'composants.logo', false> &
      Schema.Attribute.Required;
    social: Schema.Attribute.Component<'composants.social', true> &
      Schema.Attribute.Required;
  };
}

export interface LayoutTextSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_text_sections';
  info: {
    displayName: 'textSection';
  };
  attributes: {
    backgroundColor: Schema.Attribute.Enumeration<
      ['orange', 'white', 'black']
    > &
      Schema.Attribute.Required;
    button: Schema.Attribute.Component<'composants.lien', false> &
      Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    text: Schema.Attribute.Blocks & Schema.Attribute.Required;
    textColor: Schema.Attribute.Enumeration<['orange', 'white', 'black']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutTextSectionWithTitle extends Struct.ComponentSchema {
  collectionName: 'components_layout_text_section_with_titles';
  info: {
    displayName: 'textSectionWithTitle';
  };
  attributes: {
    backgroundColor: Schema.Attribute.Enumeration<
      ['orange', 'white', 'black', 'pale_orange']
    > &
      Schema.Attribute.Required;
    button: Schema.Attribute.Component<'composants.lien', false>;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    imagePosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.Required;
    text: Schema.Attribute.Blocks & Schema.Attribute.Required;
    textColor: Schema.Attribute.Enumeration<['orange', 'white', 'black']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.Component<'composants.section-title', false> &
      Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'composants.card': ComposantsCard;
      'composants.dropdown-link': ComposantsDropdownLink;
      'composants.lien': ComposantsLien;
      'composants.link': ComposantsLink;
      'composants.logo': ComposantsLogo;
      'composants.member-card': ComposantsMemberCard;
      'composants.section-title': ComposantsSectionTitle;
      'composants.social': ComposantsSocial;
      'layout.card-section': LayoutCardSection;
      'layout.footer': LayoutFooter;
      'layout.footer-cta': LayoutFooterCta;
      'layout.hero': LayoutHero;
      'layout.member-section': LayoutMemberSection;
      'layout.nav-bar': LayoutNavBar;
      'layout.text-section': LayoutTextSection;
      'layout.text-section-with-title': LayoutTextSectionWithTitle;
    }
  }
}
