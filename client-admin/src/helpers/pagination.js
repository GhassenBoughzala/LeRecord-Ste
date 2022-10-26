/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";

const PaginationComponent = ({
  total = 0,
  itemsPerPage = 5,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} onClick={() => onPageChange(i)}>
          <a
            href="#"
            aria-current="page"
            className="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white no-underline"
          >
            {i}
          </a>
        </li>
      );
    }

    return pages;
  }, [totalPages, currentPage]);

  if (totalPages === 0) return null;

  return (
    <div className="max-w-2xl mx-auto my-10">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          <li disabled={currentPage === 1}>
            <a
              onClick={() => onPageChange(currentPage - 1)}
              href="#"
              className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <i className="fas fa-angle-left"></i>
            </a>
          </li>

          {paginationItems}
          <li disabled={currentPage === totalPages}>
            <a
              onClick={() => onPageChange(currentPage + 1)}
              href="#"
              className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <i className="fas fa-angle-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationComponent;
