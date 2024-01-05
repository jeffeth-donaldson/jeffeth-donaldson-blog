import type { Schema, Attribute } from '@strapi/strapi';

export interface MetadataTags extends Schema.Component {
  collectionName: 'components_metadata_tags';
  info: {
    displayName: 'Tags';
    icon: 'priceTag';
    description: '';
  };
  attributes: {
    tag: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'metadata.tags': MetadataTags;
    }
  }
}
