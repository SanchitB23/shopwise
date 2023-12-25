import { User } from '../../../../../types/payload-types';

export const checkRole = (role: User['role'] = undefined, user?: User | null): boolean => {
  if (user) {
    return user.role === role;
  }
  return false;
};
