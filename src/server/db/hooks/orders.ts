import type { FieldHook } from 'payload/types';

import type { Order } from '../../../payload-types';
import type { AfterChangeHook } from 'payload/dist/collections/config/types';

export const populateOrderedBy: FieldHook<Order> = async ({ req, operation, value }) => {
  if ((operation === 'create' || operation === 'update') && !value) {
    return req.user.id;
  }

  return value;
};

export const clearUserCart: AfterChangeHook<Order> = async ({ doc, req, operation }) => {
  const { payload } = req;

  if (operation === 'create' && doc.orderedBy) {
    const orderedBy = typeof doc.orderedBy === 'string' ? doc.orderedBy : doc.orderedBy.id;

    const user = await payload.findByID({
      collection: 'users',
      id: orderedBy,
    });

    if (user) {
      await payload.update({
        collection: 'users',
        id: orderedBy,
        data: {
          cart: {
            items: [],
          },
        },
      });
    }
  }

  return;
};

export const updateUserPurchases: AfterChangeHook<Order> = async ({ doc, req, operation }) => {
  const { payload } = req;

  if ((operation === 'create' || operation === 'update') && doc.orderedBy && doc.items) {
    const orderedBy = typeof doc.orderedBy === 'string' ? doc.orderedBy : doc.orderedBy.id;

    const user = await payload.findByID({
      collection: 'users',
      id: orderedBy,
    });

    if (user) {
      await payload.update({
        collection: 'users',
        id: orderedBy,
        data: {
          orders: [
            ...(user?.orders?.map(order => (typeof order === 'string' ? order : order.id)) || []), // eslint-disable-line function-paren-newline
            ...(doc?.items?.map(({ product }) =>
              typeof product === 'string' ? product : product.id,
            ) || []), // eslint-disable-line function-paren-newline
          ],
        },
      });
    }
  }

  return;
};
