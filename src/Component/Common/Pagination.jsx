import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, currentPage, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center flex-row  mt-4">
      <ul className="pagination flex flex-row">
        {pageNumbers.map(number => (
          <li key={number} className={`px-3 py-1 rounded-md mr-2 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-pure-greys-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}>
            <button onClick={() => setCurrentPage(number)} className="focus:outline-none">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

