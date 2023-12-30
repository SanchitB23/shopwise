import { publicProcedure } from '../../index';
import { QueryValidator } from '../../validators/product-query-validator';
import { z } from 'zod';
import { getPayloadClient } from '../../../server/db/config/get-payloadcms';

const getFeaturedProducts = publicProcedure
  .input(
    z.object({
      limit: z.number().min(1).max(100),
      cursor: z.number().nullish(),
      query: QueryValidator,
    }),
  )
  .query(async ({ input, ctx }) => {
    const { query, cursor } = input;
    const { sort, limit, ...queryOpts } = query;
    const payload = await getPayloadClient();
    const parsedQueryOpts: Record<string, { equals: string }> = {};

    Object.entries(queryOpts).forEach(([key, value]) => {
      parsedQueryOpts[key] = {
        equals: value,
      };
    });

    const page = cursor || 1;

    const { docs: items } = await payload.find({
      collection: 'products',
      where: {
        featured: {
          equals: true,
        },
        ...parsedQueryOpts,
      },
      sort,
      depth: 1,
      limit,
      page,
    });

    return {
      items,
    };
  });

export default getFeaturedProducts;
