import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation" className="mt-4">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a className="page-link bg-dark text-warning border-secondary" href="#" onClick={() => onPageChange(currentPage - 1)}>Previous</a>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <a 
                            className={`page-link ${currentPage === number ? 'bg-warning text-dark border-warning' : 'bg-dark text-warning border-secondary'}`}
                            href="#" 
                            onClick={() => onPageChange(number)}
                        >
                            {number}
                        </a>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a className="page-link bg-dark text-warning border-secondary" href="#" onClick={() => onPageChange(currentPage + 1)}>Next</a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination; 