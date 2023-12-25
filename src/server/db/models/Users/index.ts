import { Access, CollectionConfig } from 'payload/types';
import { checkRole } from './utils/checkRole';
import { anyone } from './access/anyone';
import { admins } from './access/admins';
// import { PrimaryActionEmailHtml } from "../../components/PrimaryActionEmail";

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user.role === 'admin') return true;

  return {
    id: {
      equals: user.id,
    },
  };
};

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, //todo check this
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole('admin', user),
  },
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
    defaultColumns: ['id'],
  },
  fields: [
    {
      name: 'role',
      defaultValue: 'user',
      required: true,
      admin: {
        condition: () => false,
      },
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Seller', value: 'seller' },
      ],
    },
  ],
};
