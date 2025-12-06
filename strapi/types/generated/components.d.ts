import type { Schema, Struct } from '@strapi/strapi';

export interface ComposantsCard extends Struct.ComponentSchema {
  collectionName: 'components_composants_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'composants.lien', false>;
    text: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface ComposantsLien extends Struct.ComponentSchema {
  collectionName: 'components_composants_liens';
  info: {
    displayName: 'Button';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    color: Schema.Attribute.Enumeration<['orange', 'white']>;
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    fullWidth: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    url: Schema.Attribute.String;
  };
}

export interface ComposantsLink extends Struct.ComponentSchema {
  collectionName: 'components_composants_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
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
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/'>;
  };
}

export interface ComposantsMemberCard extends Struct.ComponentSchema {
  collectionName: 'components_composants_member_cards';
  info: {
    displayName: 'Member card';
  };
  attributes: {
    name: Schema.Attribute.String;
    photo: Schema.Attribute.Media<'images'>;
    role: Schema.Attribute.String;
    social: Schema.Attribute.Component<'composants.social', true>;
  };
}

export interface ComposantsSectionTitle extends Struct.ComponentSchema {
  collectionName: 'components_composants_section_titles';
  info: {
    displayName: 'Section title';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<['orange', 'white', 'black']>;
    title: Schema.Attribute.String;
  };
}

export interface ComposantsSocial extends Struct.ComponentSchema {
  collectionName: 'components_composants_socials';
  info: {
    displayName: 'Social';
  };
  attributes: {
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    icon: Schema.Attribute.Media<'images'>;
    url: Schema.Attribute.String;
  };
}

export interface LayoutCardSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_card_sections';
  info: {
    displayName: 'Card section';
  };
  attributes: {
    cards: Schema.Attribute.Component<'composants.card', true>;
    title: Schema.Attribute.String;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'footer';
  };
  attributes: {
    footerImage: Schema.Attribute.Media<'images'>;
  };
}

export interface LayoutFooterCta extends Struct.ComponentSchema {
  collectionName: 'components_layout_footer_ctas';
  info: {
    displayName: 'footerCta';
  };
  attributes: {
    button: Schema.Attribute.Component<'composants.lien', false>;
    text: Schema.Attribute.String;
  };
}

export interface LayoutHero extends Struct.ComponentSchema {
  collectionName: 'components_layout_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    button: Schema.Attribute.Component<'composants.lien', false>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subheading: Schema.Attribute.Text;
    triangleColor: Schema.Attribute.Enumeration<['orange', 'white']>;
  };
}

export interface LayoutMemberSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_member_sections';
  info: {
    displayName: 'memberSection';
  };
  attributes: {
    members: Schema.Attribute.Component<'composants.member-card', true>;
    title: Schema.Attribute.Component<'composants.section-title', false>;
  };
}

export interface LayoutNavBar extends Struct.ComponentSchema {
  collectionName: 'components_layout_nav_bars';
  info: {
    displayName: 'navBar';
  };
  attributes: {
    cta: Schema.Attribute.Component<'composants.lien', false>;
    logo: Schema.Attribute.Component<'composants.logo', false>;
    navBarMenu: Schema.Attribute.Component<'composants.link', true>;
    social: Schema.Attribute.Component<'composants.social', true>;
  };
}

export interface LayoutTextSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_text_sections';
  info: {
    displayName: 'textSection';
  };
  attributes: {
    backgroundColor: Schema.Attribute.Enumeration<['orange', 'white', 'black']>;
    button: Schema.Attribute.Component<'composants.lien', false>;
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.Blocks;
    textColor: Schema.Attribute.Enumeration<['orange', 'white', 'black']>;
    title: Schema.Attribute.String;
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
    >;
    button: Schema.Attribute.Component<'composants.lien', false>;
    image: Schema.Attribute.Media<'images'>;
    imagePosition: Schema.Attribute.Enumeration<['left', 'right']>;
    text: Schema.Attribute.Blocks;
    textColor: Schema.Attribute.Enumeration<['orange', 'white', 'black']>;
    title: Schema.Attribute.Component<'composants.section-title', false>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'composants.card': ComposantsCard;
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
