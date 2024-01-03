import { router } from '../../index';
import getFeaturedProducts from './get-featured';
import getProducts from './get-products';

const productsRouter = router({
  getFeaturedProducts,
  getProducts,
});

export default productsRouter;
