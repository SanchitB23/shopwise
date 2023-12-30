import { CollectionConfig } from 'payload/types';
import { yourOwn } from '../access/isOwnOrAdmin';
import { admins } from '../access/admins';
import { adminsOrSellers } from '../access/adminsOrSellers';
import { clearUserCart, populateOrderedBy, updateUserPurchases } from '../hooks/orders';

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'Your Orders',
  },
  access: {
    read: yourOwn,
    update: admins,
    delete: admins,
    create: admins,
  },
  hooks: {
    afterChange: [updateUserPurchases, clearUserCart],
  },
  fields: [
    {
      name: '_isPaid',
      type: 'checkbox',
      access: {
        read: adminsOrSellers,
        create: () => false,
        update: () => false,
      },
      admin: {
        readOnly: true,
      },
      // required: true,
      defaultValue: false,
    },
    {
      name: 'orderedBy',
      type: 'relationship',
      relationTo: 'users',
      hooks: {
        beforeChange: [populateOrderedBy],
      },
    },
    {
      name: 'stripePaymentIntentID',
      label: 'Stripe Payment Intent ID',
      type: 'text',
      admin: {
        position: 'sidebar',
        // components: {
        //   Field: LinkToPaymentIntent,
        // },
      },
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          min: 0,
        },
        {
          name: 'quantity',
          type: 'number',
          min: 0,
        },
      ],
    },
  ],
};
