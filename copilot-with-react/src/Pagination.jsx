import React, { useState } from 'react';

/**
 * Pagination component for navigating through pages.
 *
 * @param {Object} props - Component props.
 * @param {number} [props.totalItems=5] - Total number of pages/items.
 * @param {number} [props.currentPage=1] - Currently selected page.
 * @param {function} props.onPageChange - Callback function called with the new page number when the page changes.
 *
 * @returns {JSX.Element} Pagination UI with previous/next buttons and a dropdown for page selection.
 */
const Pagination = ({ totalItems = 5, currentPage = 1, onPageChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalItems) onPageChange(currentPage + 1);
  };

  const handlePageSelect = (page) => {
    onPageChange(page);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const pageNumbers = Array.from({ length: totalItems }, (_, i) => i + 1);

  return (
    <div>
      {currentPage > 1 && (
        <button onClick={handlePrev}>&lt;</button>
      )}

      <span> Page </span>

      <div style={{ display: 'inline-block', position: 'relative' }}>
        <button onClick={toggleDropdown}>
          {currentPage} &#8964;
        </button>
        {isDropdownOpen && (
          <ul style={{ position: 'absolute', listStyle: 'none', padding: 0, margin: 0, border: '1px solid black' }}>
            {pageNumbers.map((number) => (
              <li key={number} onClick={() => handlePageSelect(number)} style={{ cursor: 'pointer', padding: '5px' }}>
                {currentPage === number ? `✓ ${number}` : number}
              </li>
            ))}
          </ul>
        )}
      </div>

      <span> of {totalItems}</span>

      {currentPage < totalItems && (
        <button onClick={handleNext}>&gt;</button>
      )}
    </div>
  );
};

export default Pagination;