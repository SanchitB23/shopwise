import { User } from '../../../payload-types';
import { FieldHook } from 'payload/types';
import type { AfterChangeHook, BeforeChangeHook } from 'payload/dist/collections/config/types';
import { stripe } from '../../lib/stripe';

// ensure the first user created is an admin
// 1. lookup a single user on create as succinctly as possible
// 2. if there are no users found, append `admin` to the roles array
// access control is already handled by these fields `access` property
// it ensures that only admins can create and update the `roles` field
export const ensureFirstUserIsAdmin: FieldHook<User> = async ({ req, operation, value }) => {
  if (operation === 'create') {
    const users = await req.payload.find({
      collection: 'users',
      limit: 0,
      depth: 0,
    });
    if (users.totalDocs === 0) {
      // if `admin` not in array of values, add it
      if (value !== 'admin') {
        return 'admin';
      }
    }
  }

  return value;
};

export const loginAfterCreate: AfterChangeHook = async ({
  doc,
  req,
  req: { payload, body = {}, res },
  operation,
}) => {
  if (operation === 'create' && !req.user) {
    const { email, password } = body;

    if (email && password) {
      const { user, token } = await payload.login({
        collection: 'users',
        data: { email, password },
        req,
        res,
      });

      return {
        ...doc,
        token,
        user,
      };
    }
  }

  return doc;
};

export const createStripeCustomer: BeforeChangeHook = async ({ req, data, operation }) => {
  if (operation === 'create' && !data.stripeCustomerID) {
    try {
      // lookup an existing customer by email and if found, assign the ID to the user
      // if not found, create a new customer and assign the new ID to the user
      const existingCustomer = await stripe.customers.list({
        limit: 1,
        email: data.email,
      });

      if (existingCustomer.data.length) {
        // existing customer found, assign the ID to the user
        return {
          ...data,
          stripeCustomerID: existingCustomer.data[0].id,
        };
      }

      // create a new customer and assign the ID to the user
      const customer = await stripe.customers.create({
        email: data.email,
      });

      return {
        ...data,
        stripeCustomerID: customer.id,
      };
    } catch (error: unknown) {
      req.payload.logger.error(`Error creating Stripe customer: ${error}`);
    }
  }

  return data;
};
