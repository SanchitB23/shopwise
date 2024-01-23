import { publicProcedure } from '../../index';
import { getPayloadClient } from '../../../server/db/config/get-payloadcms';
import { QueryValidator } from '../../../validators/product-query-validator';
import { z } from 'zod';

const getProducts = publicProcedure
  .input(
    z.object({
      cursor: z.number().nullish().optional(),
      query: QueryValidator,
    }),
  )
  .query(async ({ input }) => {
    const { query, cursor = 1 } = input;
    const { sort = '-lastModifiedDate', limit, category } = query;
    const payload = await getPayloadClient();

    const page = cursor || 1;

    const parsedQueryOpts: Record<string, { equals: string }> = {};

    if (category)
      parsedQueryOpts['categories'] = {
        equals: category,
      };

    const {
      docs: items,
      hasNextPage,
      nextPage,
    } = await payload.find({
      collection: 'products',
      where: {
        isDeleted: {
          equals: false,
        },
        quantity: {
          greater_than: 0,
        },
        ...parsedQueryOpts,
      },
      sort,
      depth: 1,
      limit: limit ?? 10,
      page,
    });

    return {
      items,
      nextPage: hasNextPage ? nextPage : null,
      hasNextPage,
    };
  });

export default getProducts;
