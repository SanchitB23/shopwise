import { privateProcedure } from '../../index';
import { getPayloadClient } from '../../../server/db/config/get-payloadcms';
import { z } from 'zod';
import { find } from 'lodash';

const getWishListedProducts = privateProcedure
  .input(z.object({ productId: z.string().optional() }))
  .query(async ({ input: { productId }, ctx: { user } }) => {
    const payload = await getPayloadClient();
    const result = await payload.findByID({
      collection: 'users',
      id: user.id,
      depth: productId ? 0 : 1,
    });
    if (productId) {
      return find(result.wishlist, productId);
    }
    return result.wishlist;
  });

const addToWishlist = privateProcedure
  .input(z.object({ productId: z.string() }))
  .mutation(async ({ input: { productId }, ctx: { user } }) => {
    //   todo Incomplete
    const payload = await getPayloadClient();
    const result = await payload.update({
      collection: 'users',
      data: {},
      id: user.id,
    });
  });

export { getWishListedProducts, addToWishlist };
