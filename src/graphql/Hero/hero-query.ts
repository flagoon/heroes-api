import { Context } from '@interface/prisma';

export const heroQuery = {
  heroes: async (
    parent,
    { type_id, name_query, skip, first },
    { prisma: { heroes } }: Context,
  ) => {
    return await heroes({
      where: {
        full_name_contains: name_query,

        type: {
          id: type_id,
        },
      },
      skip,
      first,
    });
  },
  hero: async (parent, { id }, { prisma: { hero } }: Context) => {
    return await hero({
      id,
    });
  },
};