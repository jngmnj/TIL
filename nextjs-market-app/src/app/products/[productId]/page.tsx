import getCurrentUser from '@/app/actions/getCurrentUser';
import getProductById, { Params } from '@/app/actions/getProductById'
import EmptyState from '@/components/EmptyState';
import React from 'react'
import ProductClient from './ProductClient';
// interface Params {
//   productId?: string;
// }
const ProductPage = async ({ params }: { params: Params } ) => {
  // 유저정보
  // 하나의 상품 정보 가져오기

  const product = await getProductById(params);
  const currentUser = await getCurrentUser();

  console.log(product)

  if(!product) {
    return <EmptyState />;
  }

  return (
    <ProductClient 
      product={product}
      currentUser={currentUser}
    />
  )
}

export default ProductPage