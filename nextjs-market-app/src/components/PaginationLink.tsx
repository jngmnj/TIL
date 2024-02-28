'use client'
import React, { PropsWithChildren } from 'react';
import { PRODUCTS_PER_PAGE } from '@/constants';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import queryString from 'query-string';

type PaginationLinkProps = {
    page: number;
    disabled?: boolean;
    active?: boolean;
    // children: React.ReactNode;
} & PropsWithChildren

const PaginationLink = ({ page, disabled, active, children }: PaginationLinkProps) => {
    const params = useSearchParams();
    const limit = PRODUCTS_PER_PAGE;
    const skip = page ? (Number(page) - 1) * limit : 0; 

    // console.log("params", params?.toString());

    let currentQuery = {};
    if(params) {
        currentQuery = queryString.parse(params?.toString())
    }
    // console.log(currentQuery);
    
    // 라우터 쿼리에 존재하는 데이터 사용, 페이지 modify만
    const updatedQuery = {
        ...currentQuery, 
        page,
        skip
    }

  return (
    <Link 
      href={{ query: updatedQuery }} 
      className={`p-2 text-2xl 
      ${active ? "font-bold text-orange-500" :""}
      ${disabled ? "pointer-events-none text-gray-200" : ""}
      `}
    >{children}</Link>
  )
}

export default PaginationLink