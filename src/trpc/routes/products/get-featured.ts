import { publicProcedure } from '../../index';
import { getPayloadClient } from '../../../server/db/config/get-payloadcms';

const getFeaturedProducts = publicProcedure.query(async () => {
  const payload = await getPayloadClient();

  const { docs: items } = await payload.find({
    collection: 'products',
    where: {
      featured: {
        equals: true,
      },
    },
    depth: 1,
    limit: 3,
  });

  return {
    items,
  };
});

export default getFeaturedProducts;
