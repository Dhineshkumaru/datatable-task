import React, {useState, useEffect} from 'react';
import Table from '../Table/Table';

const Pagination = ()=>{
    const [userData, setUserData] =useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] =useState(0);
    
    useEffect(()=>{
        fetch('https://retoolapi.dev/UvRrOB/data')
        .then((res)=> res.json())
        .then((data)=>{
            setUserData(data);
            setTotalPages(Math.ceil(data.length / 5));
        })
    }, [])

    const getAddedData=(data)=>{
        setUserData(prevData=> [data, ...prevData]); 
    }

    useEffect(()=>{
        setTotalPages(Math.ceil(userData.length / 5)); 
    }, [userData]);

    const handlePageChange = (newPage)=>{
        setCurrentPage(newPage)
    }
    const handleNextClick = ()=>{
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1);
        }
    }
    const handleFirstClick = ()=>{
            setCurrentPage(1);
    }
    const handleLastClick = ()=>{
        setCurrentPage(Math.ceil(userData.length / 5));
    }
    const handlePrevClick = ()=>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }
    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage === totalPages

    const itemsPerPage = 5;
    const startIndex = (currentPage-1)* itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDiaplay = userData.slice(startIndex, endIndex);
    
    return (
        <>
            <Table data={itemsToDiaplay} getAddedData={getAddedData} ></Table>
            
            <button onClick={handleFirstClick}disabled={prevDisabled}>First</button>
            <button onClick={handlePrevClick}disabled={prevDisabled}>Prev</button>
            {
                Array.from({length:totalPages},(_,i)=>{
                    return (
                        <button 
                            onClick={()=>handlePageChange(i+1)} 
                            key={i}
                            disabled={i+1 === currentPage}
                            >
                            {i+1}
                        </button>
                    )
                })
            }
            <button onClick={handleNextClick}disabled={nextDisabled}>Next</button>
            <button onClick={handleLastClick}disabled={nextDisabled}>Last</button>
        </>
    )
}

export default Pagination;
