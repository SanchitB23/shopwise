import { router } from '../../index';
import { getWishListedProducts, toggleFromWishlist } from './wishlist';

export const userRouter = router({
  getWishListedProducts,
  toggleFromWishlist,
});
