import { publicProcedure } from '../../index';
import { getPayloadClient } from '../../../server/db/config/get-payloadcms';

const getFeaturedProducts = publicProcedure
  // .input(
  //   z.object({
  //     limit: z.number().min(1).max(100),
  //     cursor: z.number().nullish(),
  //     query: QueryValidator,
  //   }),
  // )
  .query(async ({ input }) => {
    // const { query, cursor } = input;
    // const { sort, limit } = query;
    const payload = await getPayloadClient();

    // const page = cursor || 1;

    const { docs: items } = await payload.find({
      collection: 'products',
      where: {
        featured: {
          equals: true,
        },
      },
      // sort,
      depth: 1,
      limit: 3,
      // page,
    });

    return {
      items,
    };
  });

export default getFeaturedProducts;
