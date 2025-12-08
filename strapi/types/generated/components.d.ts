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

export interface ComposantsContactDetails extends Struct.ComponentSchema {
  collectionName: 'components_composants_contact_details';
  info: {
    displayName: 'Contact details';
  };
  attributes: {
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    number: Schema.Attribute.String;
    street: Schema.Attribute.String;
  };
}

export interface ComposantsInformation extends Struct.ComponentSchema {
  collectionName: 'components_composants_information';
  info: {
    displayName: 'Information';
  };
  attributes: {
    contactDetails: Schema.Attribute.Component<
      'composants.contact-details',
      false
    >;
    copyright: Schema.Attribute.String;
    designer: Schema.Attribute.String;
    gameJam: Schema.Attribute.Component<'composants.link', false>;
    logo: Schema.Attribute.Media<'images'>;
    navItems: Schema.Attribute.Component<'composants.link', true>;
    services: Schema.Attribute.Component<'composants.link', true>;
    socialLinks: Schema.Attribute.Component<'composants.link', true>;
  };
}

export interface ComposantsLien extends Struct.ComponentSchema {
  collectionName: 'components_composants_liens';
  info: {
    displayName: 'Button';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ComposantsLink extends Struct.ComponentSchema {
  collectionName: 'components_composants_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ComposantsSubMenu extends Struct.ComponentSchema {
  collectionName: 'components_composants_sub_menus';
  info: {
    displayName: 'Sub-menu';
  };
  attributes: {
    links: Schema.Attribute.Component<'composants.lien', true>;
    title: Schema.Attribute.String;
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

export interface LayoutHero extends Struct.ComponentSchema {
  collectionName: 'components_layout_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    button: Schema.Attribute.Component<'composants.lien', false>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subheading: Schema.Attribute.Text;
  };
}

export interface LayoutTextSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_text_sections';
  info: {
    displayName: 'Text section';
  };
  attributes: {
    button: Schema.Attribute.Component<'composants.lien', false>;
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'composants.card': ComposantsCard;
      'composants.contact-details': ComposantsContactDetails;
      'composants.information': ComposantsInformation;
      'composants.lien': ComposantsLien;
      'composants.link': ComposantsLink;
      'composants.sub-menu': ComposantsSubMenu;
      'layout.card-section': LayoutCardSection;
      'layout.hero': LayoutHero;
      'layout.text-section': LayoutTextSection;
    }
  }
}
