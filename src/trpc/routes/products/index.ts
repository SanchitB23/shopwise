import { router } from '../../index';
import getFeaturedProducts from './get-featured';
import getProducts from './get-products';
import getProductData from './get-product';

const productsRouter = router({
  getFeaturedProducts,
  getProducts,
  getProductData,
});

export default productsRouter;
