'use client'
import React from 'react'
import usePagination from '@lucasmogari/react-pagination';
import PaginationLink from './PaginationLink';

interface PaginationProps {
    page: number;
    totalItems: number;
    perPage: number;
}
const Pagination = ({ page, totalItems, perPage }: PaginationProps) => {

  const {fromItem, toItem, getPageItem, totalPages} = usePagination({
    totalItems: totalItems,
    page: page,
    itemsPerPage: perPage,
    maxPageItems: 5
  });

  const firstPage = 1;  // ?
  const nextPage = Math.min(page + 1, totalPages); // 현재페이지 + 1과 전체페이지수 비교해 작은것이 nextPage 
  const prevPage = Math.max(page - 1, firstPage); // 둘중 큰게 prevPage

  const arr = new Array(totalPages + 2); // 

  // console.log('getPageItem',getPageItem)
  // console.log('totalPages', totalPages)

  
  return (
    <div className='flex justify-center items-center gap-2 mt-4'>
        {/* Item {fromItem} - {toItem} */}
        {[...arr].map((_, i) => {
          const {page, disabled, current} = getPageItem(i);
          // console.log("page,disabled,current", page, disabled, current);

          if(page === 'previous') {
            return (
              <PaginationLink page={prevPage} disabled={disabled} key={i}>
                {"<"}
              </PaginationLink>
            );
          }

          if(page === 'next') {
            return <PaginationLink page={nextPage} disabled={disabled} key={i}>{">"}</PaginationLink>;
          }
          
          if(page === 'gap') {
            return <span key={i}>{"..."}</span>;            
          }

          return (<PaginationLink page={page} active={current} key={i}>{page}</PaginationLink>);
        })}
    </div>
  );
};

export default Pagination