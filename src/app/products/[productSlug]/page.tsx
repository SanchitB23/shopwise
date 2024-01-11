import React from 'react';
import ProductDetails from './ProductDetails';
import { Metadata } from 'next';
import { capitalize } from 'lodash';
import { SITE_NAME } from '@/constants/global';
import { getPayloadClient } from '../../../server/db/config/get-payloadcms';

export async function generateMetadata({
  params: { productSlug },
}: {
  params: { productSlug: string };
}): Promise<Metadata> {
  const payload = await getPayloadClient();
  const {
    docs: [product],
  } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      slug: {
        equals: productSlug,
      },
      isDeleted: {
        equals: false,
      },
    },
  });
  return {
    title: `${product.title} | ${capitalize(SITE_NAME)}`,
  };
}

export async function generateStaticParams() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'products',
    depth: 0,
    limit: 100,
    where: {
      isDeleted: {
        equals: false,
      },
    },
  });
  return docs.map(post => ({
    productSlug: post.slug,
  }));
}
const Page = ({ params: { productSlug } }: { params: { productSlug: string } }) => {
  return <ProductDetails slug={productSlug} />;
};

export default Page;
