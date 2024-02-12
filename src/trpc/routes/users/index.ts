import { router } from '../../index';
import { addToWishlist, getWishListedProducts } from './wishlist';

export const userRouter = router({
  getWishListedProducts,
  addToWishlist,
});
