import { privateProcedure } from '../../index';
import { getPayloadClient } from '../../../server/db/config/get-payloadcms';
import { z } from 'zod';
import { compact, uniq, without } from 'lodash';

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
      return result.wishlist && result.wishlist.includes(productId);
    }
    return result.wishlist;
  });

const toggleFromWishlist = privateProcedure
  .input(z.object({ productId: z.string(), add: z.boolean() }))
  .mutation(async ({ input: { productId, add }, ctx: { user } }) => {
    const payload = await getPayloadClient();
    const { wishlist } = await payload.findByID({
      collection: 'users',
      id: user.id,
      depth: 0,
    });

    let newWishlist;
    if (add) newWishlist = uniq(compact([...((wishlist as string[]) ?? []), productId]));
    else newWishlist = without(wishlist as string[], productId);
    return await payload.update({
      collection: 'users',
      data: {
        wishlist: newWishlist,
      },
      id: user.id,
    });
  });

export { getWishListedProducts, toggleFromWishlist };
