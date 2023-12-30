import { FieldHook } from 'payload/types';
import {
  AfterChangeHook,
  AfterDeleteHook,
  BeforeChangeHook,
} from 'payload/dist/collections/config/types';
import { Product } from '../../../payload-types';
import { stripe } from '../../lib/stripe';

const enableLogs = Boolean(process.env.ENABLE_LOGS);

export const publishedOnHook: FieldHook = ({ siblingData, value }) => {
  if (siblingData._status === 'published' && !value) {
    return new Date();
  }
  return value;
};

export const addUploaderDataInProduct: BeforeChangeHook<Product> = async ({ req, data }) => {
  const user = req.user;
  if (enableLogs) req.payload.logger.info(`Adding User data in Product...`);

  return { ...data, user: user.id };
};

export const syncUserWithAddedProducts: AfterChangeHook<Product> = async ({ req, doc }) => {
  const fullUser = await req.payload.findByID({
    collection: 'users',
    id: req.user.id,
  });

  if (fullUser && typeof fullUser === 'object') {
    const { products } = fullUser;

    const allIDs = [
      ...(products?.map(product => (typeof product === 'object' ? product.id : product)) || []),
    ];

    const createdProductIDs = allIDs.filter((id, index) => allIDs.indexOf(id) === index);

    const dataToUpdate = [...createdProductIDs, doc.id];

    if (enableLogs) req.payload.logger.info(`Updating User data with added Product...`);

    await req.payload.update({
      collection: 'users',
      id: fullUser.id,
      data: {
        products: dataToUpdate,
      },
    });
  }
};

export const addStripeIdToProduct: BeforeChangeHook<Product> = async args => {
  if (args.operation === 'create') {
    const data = args.data as Product;

    if (enableLogs)
      args.req.payload.logger.info(`Creating stripe ID for Product : ${data.title}}...`);

    const createdProduct = await stripe.products.create({
      name: data.title,
      default_price_data: {
        currency: 'USD',
        unit_amount: Math.round(data.price * 100),
      },
    });

    const updated: Product = {
      ...data,
      stripeProductID: createdProduct.id,
      priceId: createdProduct.default_price as string,
    };

    return updated;
  } else if (args.operation === 'update') {
    const data = args.data as Product;

    if (enableLogs)
      args.req.payload.logger.info(`Updating data in Stripe for Product : ${data.title}}...`);

    const updatedProduct = await stripe.products.update(data.stripeProductID!, {
      name: data.title,
      default_price: data.priceId!,
    });

    const updated: Product = {
      ...data,
      stripeProductID: updatedProduct.id,
      priceId: updatedProduct.default_price as string,
    };

    return updated;
  }
};

export const deleteProductFromCarts: AfterDeleteHook<Product> = async ({ req, id }) => {
  const usersWithProductInCart = await req.payload.find({
    collection: 'users',
    overrideAccess: true,
    where: {
      'cart.items.product': {
        equals: id,
      },
    },
  });

  if (usersWithProductInCart.totalDocs > 0) {
    await Promise.all(
      usersWithProductInCart.docs.map(async user => {
        const cart = user.cart;
        if (cart?.items) {
          const itemsWithoutProduct = cart.items.filter(item => item.product !== id);
          const cartWithoutProduct = {
            ...cart,
            items: itemsWithoutProduct,
          };

          return req.payload.update({
            collection: 'users',
            id: user.id,
            data: {
              cart: cartWithoutProduct,
            },
          });
        }
      }),
    );
  }
};
