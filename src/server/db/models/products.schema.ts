import { CollectionConfig } from 'payload/types';
import { admins } from '../access/admins';
import { adminsOrSellers } from '../access/adminsOrSellers';
import {
  addStripeIdToProduct,
  addUploaderDataInProduct,
  deleteProductFromCarts,
  publishedOnHook,
  syncUserWithAddedProducts,
} from '../hooks/products';
import { anyone } from '../access/anyone';
import { nobody } from '../access/nobody';
import { slugField } from '../utils/addSlugField';
import { isAdminOrHasAccess } from '../access/isAdminOrHasAccess';

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt', 'isDeleted'],
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [syncUserWithAddedProducts],
    beforeChange: [addUploaderDataInProduct, addStripeIdToProduct],
    afterDelete: [deleteProductFromCarts],
  },
  access: {
    read: isAdminOrHasAccess(),
    create: isAdminOrHasAccess(),
    update: isAdminOrHasAccess(),
    delete: admins,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: nobody,
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Product details',
    },
    {
      name: 'publishedOn',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [publishedOnHook],
      },
    },
    {
      name: 'stripeProductID',
      type: 'text',
      admin: {
        hidden: true,
      },
      access: {
        create: nobody,
        read: nobody,
        update: nobody,
      },
    },
    {
      name: 'price',
      label: 'Price',
      min: 0,
      max: 1000,
      type: 'number',
      required: true,
    },
    {
      name: 'quantity',
      label: 'Available Quantity',
      type: 'number',
      required: true,
      access: {
        create: adminsOrSellers,
        read: adminsOrSellers,
        update: anyone,
      },
    },
    {
      name: 'priceId',
      access: {
        create: nobody,
        read: nobody,
        update: nobody,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    // {
    //   name: 'relatedProducts',
    //   type: 'relationship',
    //   relationTo: 'products',
    //   hasMany: true,
    //   filterOptions: ({ id }) => {
    //     return {
    //       id: {
    //         not_in: [id],
    //       },
    //     };
    //   },
    // },
    {
      name: 'skipSync',
      label: 'Skip Sync',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
    {
      name: 'productImages',
      type: 'array',
      label: 'Product images',
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
      ],
    },
    {
      name: 'isDeleted',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
};

export default Products;
