import { Product } from '../../payload-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { find } from 'lodash';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    set => ({
      items: [],
      addItem: product =>
        set(state => {
          const isProductAlreadyAdded = find(state.items, ['product.id', product.id]);
          if (!isProductAlreadyAdded) return { items: [...state.items, { product, quantity: 1 }] };
          else {
            return {
              items: state.items.map(cartItem => {
                if (cartItem.product.id !== product.id) return cartItem;
                else
                  return {
                    product,
                    quantity: cartItem.quantity + 1,
                  };
              }),
            };
          }
        }),
      removeItem: id =>
        set(state => {
          const cartItem = find(state.items, ['product.id', id]);
          if (cartItem && cartItem.quantity > 1) {
            return {
              items: state.items.map(cartI => {
                if (cartI.product.id === id) {
                  return {
                    product: cartI.product,
                    quantity: cartI.quantity - 1,
                  };
                } else return cartI;
              }),
            };
          } else
            return {
              items: state.items.filter(item => item.product.id !== id),
            };
        }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
