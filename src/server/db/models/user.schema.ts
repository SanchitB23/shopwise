import { CollectionConfig } from 'payload/types';
import { checkRole } from '../utils/checkRole';
import { admins } from '../access/admins';
import {
  createStripeCustomer,
  ensureFirstUserIsAdmin,
  loginAfterCreate,
  resolveDuplicatePurchases,
} from '../hooks/users';
import { adminsOrSellers } from '../access/adminsOrSellers';
// import { PrimaryActionEmailHtml } from "../../components/PrimaryActionEmail";

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true /*{
    verify: {
      generateEmailHTML: ({ token }) => {
        return PrimaryActionEmailHtml({
          actionLabel: "verify your account",
          buttonText: "Verify Account",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
        });
      },
    },
  }*/, //todo check this
  access: {
    read: admins,
    create: admins,
    update: admins,
    delete: admins,
    admin: ({ req: { user } }) => checkRole('admin', user),
  },
  hooks: {
    beforeChange: [createStripeCustomer],
    afterChange: [loginAfterCreate],
  },
  admin: {
    // @ts-ignore
    hidden: ({ user }) => !checkRole('admin', user),
    defaultColumns: ['name', 'email'],
    listSearchableFields: ['name', 'email'],
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      defaultValue: 'customer',
      required: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      admin: {
        condition: ({ user }) => {
          return checkRole('admin', user);
        },
      },
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Customer', value: 'customer' },
        { label: 'Seller', value: 'seller' },
      ],
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
    {
      name: 'mobile',
      type: 'number',
    },
    {
      name: 'address',
      type: 'array',
      fields: [
        {
          name: 'full_name',
          label: 'Full Name',
          type: 'text',
          required: true,
        },
        {
          name: 'mobile',
          type: 'text',
          required: true,
        },
        {
          name: 'pincode',
          type: 'number',
          required: true,
        },
        {
          name: 'address_1',
          label: 'Flat, House no., Building, Company, Apartment',
          type: 'text',
          required: true,
        },
        {
          name: 'address_2',
          label: 'Area, Street, Sector, Village',
          type: 'text',
        },
        {
          name: 'landmark',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
          required: true,
        },
        {
          name: 'isDefault',
          type: 'checkbox',
        },
        {
          name: 'type',
          type: 'select',
          options: [
            {
              label: 'Home',
              value: 'home',
            },
            {
              label: 'Office',
              value: 'office',
            },
          ],
        },
      ],
    },
    {
      name: 'products',
      label: 'Products',
      admin: {
        condition: () => true,
        readOnly: true,
      },
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      access: {
        read: adminsOrSellers,
        create: adminsOrSellers,
        update: adminsOrSellers,
      },
    },
    {
      label: 'Cart',
      name: 'cart',
      type: 'group',
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: 'items',
          label: 'Items',
          type: 'array',
          interfaceName: 'CartItems',
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
            },
            {
              name: 'quantity',
              type: 'number',
              min: 0,
              admin: {
                step: 1,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'stripeCustomerID',
      label: 'Stripe Customer',
      type: 'text',
      access: {
        read: ({ req: { user } }) => checkRole('admin', user),
      },
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'orders',
      label: 'Orders',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      hooks: {
        beforeChange: [resolveDuplicatePurchases],
      },
    },
    {
      name: 'wishlist',
      label: 'Wishlist',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
  ],
  timestamps: true,
};
