import { Context } from '@interface/prisma';

export const heroMutation = {
  createNewHero: async (
    parent,
    { full_name, type_id, avatar_url },
    { prisma: { createHero }, response }: Context,
  ) => {
    if (full_name && type_id && avatar_url) {
      return await createHero({
        full_name,
        avatar_url,
        type: {
          connect: {
            id: type_id,
          },
        },
      });
    }
  },

  updateHero: async (
    parent,
    { id, full_name, avatar_url, type },
    { prisma: { updateHero }, response }: Context,
  ) => {
    if (id) {
      if (type) {
        return await updateHero({
          data: {
            full_name,
            avatar_url,
            type: {
              connect: {
                id: type,
              },
            },
          },
          where: {
            id,
          },
        });
      }

      return await updateHero({
        data: {
          full_name,
          avatar_url,
        },
        where: {
          id,
        },
      });
    }
    return response.status(403).send({
      message: 'Bad Request',
    });
  },

  deleteHero: async (
    parent,
    { id },
    { prisma: { deleteHero }, response }: Context,
  ) => {
    if (id) {
      return await deleteHero({ id });
    }
  },
};
