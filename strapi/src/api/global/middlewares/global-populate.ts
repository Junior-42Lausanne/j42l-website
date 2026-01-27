/**
 * `global-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
	footer: {
		populate: {
			navItems: true,
			services: true,
			socialLinks: true,
			gameJam: true,
			contactDetails: true,
			altLogo: {
				fields: ['url', 'alternativeText', 'width', 'height']
			},
			halfLogo: {
				fields: ['url', 'alternativeText', 'width', 'height']
			}
		}
	}
}

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
		//console.dir(ctx.query, { depth: null });
		ctx.query.populate = populate;
    strapi.log.info('In global-populate middleware.');

    await next();
  };
};
