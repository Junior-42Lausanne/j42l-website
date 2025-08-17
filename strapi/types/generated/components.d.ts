import type { Schema, Struct } from '@strapi/strapi';

export interface FrontpageHero extends Struct.ComponentSchema {
  collectionName: 'components_frontpage_heroes';
  info: {
    displayName: 'hero';
    icon: 'globe';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'frontpage.hero': FrontpageHero;
    }
  }
}
