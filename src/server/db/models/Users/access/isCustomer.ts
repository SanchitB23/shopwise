import type { AccessArgs } from 'payload/config';
import { checkRole } from '../../../utils/checkRole';
import { User } from '../../../../../payload-types';

type TisCustomer = (args: AccessArgs<unknown, User>) => boolean;

export const isCustomer: TisCustomer = ({ req: { user } }) => {
  return checkRole('customer', user);
};
