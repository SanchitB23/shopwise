import { FieldHook } from 'payload/types';

export const publishedOnHook: FieldHook = ({ siblingData, value }) => {
  if (siblingData._status === 'published' && !value) {
    return new Date();
  }
  return value;
};
