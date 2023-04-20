import React, { useState, useEffect  } from 'react';
import './Table.scss';
import filterIcon from '../filterIcon.png';
import AddTableData from '../AddTableData/AddTableData';

function Table(props) {
    const [selectedRows, setSelectedRows] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filterValues, setFilterValues] = useState([]);
    const [hiddenRows, setHiddenRows] = useState([]);
    const [previousFilterValues, setPreviousFilterValues] = useState([]);
    const getData = props.data;
    
    useEffect(() => {
        if (filterOpen) {
            setPreviousFilterValues([...filterValues]);
        }
    }, [filterOpen]);

    const handleFilterClick = (e, columnKey) => {
        e.stopPropagation();
        const columnValues = getData.map((row) => row[columnKey]);
        const uniqueValues = [...new Set(columnValues)];
        const newValues = uniqueValues.map((value) => {
            const existingValue = filterValues.find((filterValue) => filterValue.value === value);
            if (existingValue) {
                return { ...existingValue };
            } else {
                return { value, checked: true };
            }
        });
        setFilterValues(newValues);
        setFilterOpen(true);
    };
    
    const handleFilterOkClick = () => {
        const selectedValues = filterValues.filter((value) => value.checked).map((value) => value.value);
        const matchedObjects = props.totalData.filter(obj => {
            for (let prop in obj) {
                if (selectedValues.includes(obj[prop])) {
                    return true;
                }
            }
            return false;
        });
        const matchedIds = matchedObjects.map(obj => obj.id);
        const hiddenRows = getData.filter(row => !matchedIds.includes(row.id)).map(row => row.id);
        setSelectedRows([]);
        setHiddenRows(hiddenRows);
        setFilterOpen(false);
    };
    
    const handleFilterCancel = ()=>{
        setFilterValues([...previousFilterValues]);
        setFilterOpen(false);
    }

    const handleFilterCheckboxChange = (e, value) => {
        const newFilterValues = filterValues.map((filterValue) => {
            if (filterValue.value === value) {
                return { ...filterValue, checked: e.target.checked };
            }
            return filterValue;
        });
        setFilterValues(newFilterValues);
    };

    const handleRowSelection = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const deleteHandler = () => {
        const newData = props.totalData.filter((row) => !selectedRows.includes(row.id));
        props.getDeletedData(newData)
        setSelectedRows([]);
    };

    const tableColumnData = getData.length > 0 ? Object.entries(getData[0])
        .filter(([key]) => key.startsWith('Column '))
        .map(([key], index) => (
            <th key={index} className="column-header">
                <span>{key}</span>
                <button className="th-filter" onClick={(e) => handleFilterClick(e, key)}>
                    <img src={filterIcon} alt="filter logo" />
                </button>
            </th>
        )) : null;

    const tableRowData = getData
    .filter(val => !hiddenRows.includes(val.id))
    .map((val) => {
        const rowData = Object.entries(val).filter(([key, value]) => key !== 'id');
        return (
            <tr key={val.id} >
                <td>
                    <input
                        type={"checkbox"}
                        checked={selectedRows.includes(val.id)}
                        onChange={() => handleRowSelection(val.id)}
                    />
                </td>
                {rowData.map(([key, value]) => (
                    <td key={key}>{value}</td>
                ))}
            </tr>
        );
    });


    return (
        <div className="table-style">
            <AddTableData getAddedRowdata={props.getAddedData} totalData={props.totalData} />
            <table>
                <thead>
                    <tr className="column-tr">
                        {getData.length > 0 && (
                            <th className="tableCheckboxHeader">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.length === getData.length}
                                    onChange={() => {
                                        if (selectedRows.length === getData.length) {
                                            setSelectedRows([]);
                                        } else {
                                            setSelectedRows(getData.map((row) => row.id));
                                        }
                                    }}
                                />
                            </th>
                        )}
                        {tableColumnData}
                    </tr>
                </thead>
                <tbody>{tableRowData}</tbody>
            </table>

            <button onClick={deleteHandler} className="delete-btn"> Delete </button>

            {filterOpen && (
                <div className="filter-popup">
                    {filterValues.map((value) => (
                        <div key={value.value}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={value.checked}
                                    onChange={(e) => handleFilterCheckboxChange(e, value.value)}
                                />
                                {value.value}
                            </label>
                        </div>
                    ))}
                    <button onClick={handleFilterOkClick}>OK</button>
                    <button onClick={handleFilterCancel}>CANCEL</button>
                </div>
            )}
        </div>
    );
}

export default Table;