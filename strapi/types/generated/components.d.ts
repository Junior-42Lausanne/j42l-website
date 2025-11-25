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

export interface FrontpageHero extends Struct.ComponentSchema {
  collectionName: 'components_frontpage_heroes';
  info: {
    displayName: 'hero';
    icon: 'globe';
  };
  attributes: {};
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
    link: Schema.Attribute.Component<'composants.lien', false>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutTextSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_text_sections';
  info: {
    displayName: 'Text section';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'composants.lien', true>;
    text: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'composants.card': ComposantsCard;
      'composants.lien': ComposantsLien;
      'composants.sub-menu': ComposantsSubMenu;
      'frontpage.hero': FrontpageHero;
      'layout.card-section': LayoutCardSection;
      'layout.hero': LayoutHero;
      'layout.text-section': LayoutTextSection;
    }
  }
}
