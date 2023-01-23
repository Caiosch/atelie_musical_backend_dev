import { useState } from "react";

export function usePagination(initialPage = 1, initialLastPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [lastPage, setLastPage] = useState(initialLastPage);

  return {
    current: page,
    setPage,
    next: () => {
      setPage((old) => (old + 1 <= lastPage ? old + 1 : old));
    },
    prev: () => {
      setPage((old) => (old - 1 > 0 ? old - 1 : old));
    },
    toLastPage: () => {
      setPage(() => lastPage);
    },
    toInitialPage: () => {
      setPage(() => 1);
    },
    setLastPage,
    lastPage,
  };
}

export type UsePagination = ReturnType<typeof usePagination>;
