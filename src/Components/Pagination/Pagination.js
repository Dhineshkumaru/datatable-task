import React, { useState, useEffect } from 'react';
import './Pagination.scss';

function Pagination(props) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(props.itemsPerPages);
    const [pageNumberLimit, setpageNumberLimit] = useState(props.pageLimit);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };
    const pages = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pages.push(i);
    }
    const handleNextButton = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };
    const handlePrevButton = () => {
        setCurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };
    const handleFirstButton = () => {
        setCurrentPage(1);
        setMaxPageNumberLimit(pageNumberLimit);
        setMinPageNumberLimit(0);
    };
    const handleLastButton = () => {
        setCurrentPage(pages.length);
        setMaxPageNumberLimit(pages.length);
        setMinPageNumberLimit(pages.length - pageNumberLimit);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItems = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItems, indexOfLastItem);
    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage == number ? 'active' : null}
                >
                    {number}
                </li>
            );
        } else return null;
    });
    useEffect(() => {
        setData(props.dataGET);
    }, [props.dataGET]);
    let pageInCrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageInCrementBtn = <li onClick={handleNextButton}> &hellip;</li>;
    }
    let pageDecCrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecCrementBtn = <li onClick={handlePrevButton}> &hellip;</li>;
    }
    return (
        <>
            {props.renderTableData(currentItems)}
            <ul className="pageNumbers">
                <li>
                    <button
                        onClick={handleFirstButton}
                        disabled={currentPage === 1 ? true : false}
                    >
                        First
                    </button>
                </li>
                <li>
                    <button
                        onClick={handlePrevButton}
                        disabled={currentPage == pages[0] ? true : false}
                    >
                        Previous
                    </button>
                </li>
                {pageDecCrementBtn}
                {renderPageNumbers}
                {pageInCrementBtn}
                <li>
                    <button
                        disabled={currentPage == pages[pages.length - 1] ? true : false}
                        onClick={handleNextButton}
                    >
                        Next
                    </button>
                </li>
                <li>
                    <button
                        onClick={handleLastButton}
                        disabled={currentPage === pages.length}
                    >
                        Last
                    </button>
                </li>
            </ul>
        </>
    );
}

export default Pagination;
