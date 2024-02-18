'use client'
import React from 'react'
import usePagination from '@lucasmogari/react-pagination';

interface PaginationProps {
    page: number;
    totalItems: number;
    perPage: number;
}
const Pagination = ({ page, totalItems, perPage }: PaginationProps) => {

  const {getPageItem, totalPages} = usePagination({
    totalItems: totalItems,
    page: page,
    itemsPerPage: perPage,
    maxPageItems: 3
  });

  const firstPage = 2;
  const nextPage = Math.min(page + 1, totalPages);
  const prevPage = Math.max(page - 1, firstPage); // 둘중 큰게 prevPage

  const arr = new Array(totalPages + 2); // 

  console.log('getPageItem',getPageItem)
  console.log('totalPages', totalPages)

  
  return (
    <div>
        {[...arr].map((_, index) => {
          console.log("test")
        })
        }
    </div>
  );
};

export default Pagination