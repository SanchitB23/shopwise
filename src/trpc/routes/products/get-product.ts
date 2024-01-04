import { publicProcedure } from '../../index';
import { z } from 'zod';
import { getPayloadClient } from '../../../server/db/config/get-payloadcms';

const getProductData = publicProcedure
  .input(
    z.object({
      slug: z.string(),
    }),
  )
  .query(async ({ input: { slug } }) => {
    const payload = await getPayloadClient();

    const { docs } = await payload.find({
      collection: 'products',
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
        isDeleted: {
          equals: false,
        },
      },
    });
    const { stripeProductID, priceId, id, title, productImages, quantity, description, price } =
      docs[0];
    return {
      productData: {
        stripeProductID,
        priceId,
        id,
        title,
        productImages,
        quantity,
        description,
        price,
      },
    };
  });

export default getProductData;
