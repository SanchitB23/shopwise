import type { AccessArgs } from 'payload/config';
import { checkRole } from '../../../utils/checkRole';
import { User } from '../../../../../payload-types';

type isAdminOrSeller = (args: AccessArgs<unknown, User>) => boolean;

export const adminsOrSellers: isAdminOrSeller = ({ req: { user } }) => {
  return checkRole('admin', user) || checkRole('seller', user);
};
