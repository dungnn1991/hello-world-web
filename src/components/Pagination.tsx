import { DOTS_CODE, usePagination } from "@hooks/usePagination";
import classNames from "classnames";
import React, { useCallback } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Icon from "zmp-ui/icon";

export interface IPaginationProps {
  totalCount: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
  className?: string;
  siblingCount?: number;
  currentPage: number;
}

const ItemWrapper = styled.div`
  ${tw`rounded-[50%] p-2 border w-8 h-8 flex items-center justify-center cursor-pointer`}
`;

const Pagination: React.FC<IPaginationProps> = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className: cls,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const goToPage = useCallback(
    (page: number) => {
      onPageChange?.(page);
    },
    [onPageChange]
  );

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div
      className={classNames("flex gap-2 items-center my-4 justify-center", cls)}
    >
      {paginationRange.length > 2 && (
        <ItemWrapper
          key={"chevron-left"}
          onClick={() => {
            currentPage > 0 && goToPage(currentPage - 1);
          }}
        >
          <Icon icon="zi-chevron-left" />
        </ItemWrapper>
      )}

      {paginationRange.map((pageNumber, idx) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS_CODE) {
          return (
            <ItemWrapper key={`dot_${idx}`} className="">
              &#8230;
            </ItemWrapper>
          );
        }

        return (
          <ItemWrapper
            key={pageNumber}
            className={classNames({
              "bg-[#E9EBED]": pageNumber === currentPage,
            })}
            onClick={() =>
              pageNumber !== currentPage && onPageChange?.(pageNumber)
            }
          >
            {pageNumber + 1}
          </ItemWrapper>
        );
      })}
      {paginationRange.length > 2 && (
        <ItemWrapper
          key={"chevron-right"}
          onClick={() => currentPage < lastPage && goToPage(currentPage + 1)}
        >
          <Icon icon="zi-chevron-right" />
        </ItemWrapper>
      )}
    </div>
  );
};

export default Pagination;
