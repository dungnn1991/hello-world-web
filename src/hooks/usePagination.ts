import { useMemo } from "react";

const range = (start: number, end: number) => {
  let length = end - start + 1;
  /*
        Create an array of certain length and set the elements within it from
      start value to end value.
    */
  return Array.from({ length }, (_, idx) => idx + start);
};
export const DOTS_CODE = -1;

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize) - 1;

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
        Case 1:
        If the number of pages is less than the page numbers we want to show in our
        paginationComponent, we return the range [0..totalPageCount]
      */
    if (totalPageNumbers >= totalPageCount) {
      return range(0, totalPageCount);
    }

    /*
          Calculate left and right sibling index and make sure they are within range 0 and totalPageCount
      */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 0);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
        We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 0 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
      */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 0;
    const lastPageIndex = totalPageCount;

    /*
          Case 2: No left dots to show, but rights dots to be shown
      */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 2 + 2 * siblingCount;
      let leftRange = range(0, leftItemCount);

      return [...leftRange, DOTS_CODE, totalPageCount];
    }

    /*
          Case 3: No right dots to show, but left dots to be shown
      */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 2 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS_CODE, ...rightRange];
    }

    /*
          Case 4: Both left and right dots to be shown
      */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [
        firstPageIndex,
        DOTS_CODE,
        ...middleRange,
        DOTS_CODE,
        lastPageIndex,
      ];
    }

    return [];
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
