import React, { useState, useEffect } from 'react';
import './Table.scss';
import filterIcon from '../filterIcon.png';
import AddTableData from '../AddTableData/AddTableData';

function Table(props) {
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filterValues, setFilterValues] = useState([]);
    const getData = props.data;

    useEffect(() => {
        setData([...getData])
    }, [getData]);

    const handleFilterClick = (e, columnKey) => {
        e.stopPropagation();
        const columnValues = data.map((row) => row[columnKey]);
        const uniqueValues = [...new Set(columnValues)];
        const valuesWithChecked = uniqueValues.map((value) => ({ value, checked: true }));
        setFilterValues(valuesWithChecked);
        setFilterOpen(true);
    };

    const handleFilterOkClick = () => {
        const selectedValues = filterValues.filter((value) => value.checked).map((value) => value.value);
        const matchedObjects = data.filter(obj => {
            for (let prop in obj) {
                if (selectedValues.includes(obj[prop])) {
                    return true;
                }
            }
            return false;
        });

        setData([...matchedObjects])
        setFilterOpen(false);
    };

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
        if (selectedRows.length === data.length) {
            setData([]);
        } else {
            const newData = data.filter((row) => !selectedRows.includes(row.id));
            setData([...newData]);
        }
        setSelectedRows([]);
    };

    const tableColumnData = data.length > 0 ? Object.entries(data[0])
        .filter(([key]) => key.startsWith('Column '))
        .map(([key], index) => (
            <th key={index} className="column-header">
                <span>{key}</span>
                <button className="th-filter" onClick={(e) => handleFilterClick(e, key)}>
                    <img src={filterIcon} alt="filter logo" />
                </button>
            </th>
        )) : null;


    const tableRowData = data.map((val) => {
        const rowData = Object.entries(val).filter(([key, value]) => key !== 'id');
        return (
            <tr key={val.id}>
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
            <AddTableData getAddedRowdata={props.getAddedData} />
            <table>
                <thead>
                    <tr className="column-tr">
                        {data.length > 0 && (
                            <th className="tableCheckboxHeader">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.length === data.length}
                                    onChange={() => {
                                        if (selectedRows.length === data.length) {
                                            setSelectedRows([]);
                                        } else {
                                            setSelectedRows(data.map((row) => row.id));
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
                </div>
            )}
        </div>
    );
}

export default Table;