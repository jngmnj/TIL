'use client';
import { Product, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react'

interface ProductCardProps {
    currentUser?: User | null; // prisma가 작성한 schema를 토대로 타입을 만들어줌.
    data: Product; 
}
const ProductCard = ({ currentUser, data}: ProductCardProps) => {
    const router = useRouter();
  return (
    <div onClick={() => router.push(`/products/${data.id}`)}>
        <div>

        </div>
        <div className='text-lg font-semibold '>
            {data.title}
        </div>
        <div className='font-light text-neutral-500'>{data.category}</div>
        <div>
            <div></div>
            <div className=''>{data.createdAt}</div>
        </div>
    </div>

  );
};

export default ProductCard