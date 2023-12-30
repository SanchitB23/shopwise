import { Product } from '../../payload-types';

export const validUrls = (product: Product) =>
  product.productImages
    .map(({ image }) => (typeof image === 'string' ? image : image.url))
    .filter(Boolean) as string[];
