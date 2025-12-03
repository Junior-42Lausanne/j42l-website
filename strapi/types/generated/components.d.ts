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
    Logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/'>;
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

export interface LayoutNavBar extends Struct.ComponentSchema {
  collectionName: 'components_layout_nav_bars';
  info: {
    displayName: 'navBar';
  };
  attributes: {
    CTA: Schema.Attribute.Component<'composants.lien', false>;
    logo: Schema.Attribute.Component<'composants.logo', false>;
    NavBarMenu: Schema.Attribute.Component<'composants.link', true>;
    Social: Schema.Attribute.Component<'composants.social', true>;
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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'composants.card': ComposantsCard;
      'composants.lien': ComposantsLien;
      'composants.link': ComposantsLink;
      'composants.logo': ComposantsLogo;
      'composants.social': ComposantsSocial;
      'layout.card-section': LayoutCardSection;
      'layout.footer-cta': LayoutFooterCta;
      'layout.hero': LayoutHero;
      'layout.nav-bar': LayoutNavBar;
      'layout.text-section': LayoutTextSection;
    }
  }
}
