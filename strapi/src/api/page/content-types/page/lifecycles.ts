import { errors } from '@strapi/utils';

const { ApplicationError } = errors;

function normalizeSegment(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim().replace(/^\/+|\/+$/g, '').toLowerCase();
  return trimmed.length > 0 ? trimmed : null;
}

async function validateUniqueRoute(event: {
  params: { data?: Record<string, unknown>; where?: Record<string, unknown> };
}) {
  const { data, where } = event.params;
  if (!data) return;

  if ('menu' in data) {
    data.menu = normalizeSegment(data.menu);
  }
  if (typeof data.slug === 'string') {
    data.slug = normalizeSegment(data.slug) ?? data.slug.trim();
  }

  // Determine effective slug, menu, and documentId (handling partial updates)
  let currentDocId = data.documentId as string | undefined;
  let currentMenu = data.menu as string | null | undefined;
  let currentSlug = data.slug as string | undefined;

  if ((!currentSlug || currentMenu === undefined || !currentDocId) && where?.id) {
    const existing = await strapi.db.query('api::page.page').findOne({
      where: { id: where.id },
      select: ['documentId', 'menu', 'slug'],
    });
    if (existing) {
      currentDocId = currentDocId ?? existing.documentId;
      if (currentMenu === undefined) currentMenu = existing.menu ?? null;
      currentSlug = currentSlug ?? existing.slug;
    }
  }

  if (!currentSlug) return;
  const menuFilter = currentMenu
    ? { menu: currentMenu }
    : { $or: [{ menu: null }, { menu: '' }] };

  const conflict = await strapi.db.query('api::page.page').findOne({
    where: {
      slug: currentSlug,
      ...menuFilter,
      ...(currentDocId ? { documentId: { $ne: currentDocId } } : {}),
    },
    select: ['id', 'documentId', 'menu', 'slug'],
  });

  if (conflict) {
    const fullPath = currentMenu ? `/${currentMenu}/${currentSlug}` : `/${currentSlug}`;
    throw new ApplicationError(
      `A page with route path "${fullPath}" already exists (documentId: ${conflict.documentId}).`
    );
  }
}

export default {
  async beforeCreate(event: { params: { data?: Record<string, unknown> } }) {
    await validateUniqueRoute(event);
  },
  async beforeUpdate(event: {
    params: { data?: Record<string, unknown>; where?: Record<string, unknown> };
  }) {
    await validateUniqueRoute(event);
  },
};
