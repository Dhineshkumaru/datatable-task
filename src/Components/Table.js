import './Table.scss';
import { useEffect, useState } from 'react';
import AddTableData from './AddTableData/AddTableData'
import DeleteRow from './DeleteRow/DeleteRow'
import Pagination from './Pagination/Pagination'
const Table = () => {
const [trData, setTrData] = useState([]);
const [newTrData, setNewTrData] = useState([]);
const [isChecked, setIsChecked] = useState([]);
const [newlyAddedIsChecked, setNewlyAddedIsChecked] = useState([]);
useEffect(() => {
    fetch('https://retoolapi.dev/UvRrOB/data')
    .then(res => res.json())
    .then(data => setTrData(data))
    }, [])


const renderTableData = (data)=>{
  const tableColumnData = data.length > 0 ? Object.entries(data[0])
          .filter(([key]) => key.startsWith("Column "))
          .map(([key, columnData]) => <th >{key}</th>) : null;
const checkBoxHandler = (e, rowIndex)=>{
  if(e.target.checked){
    setIsChecked(prevCheckedRows => [...prevCheckedRows, rowIndex])
  }else{
    setIsChecked(prevCheckedRows => prevCheckedRows.filter(index => index !== rowIndex))
  }
}

const deleteCheckedRows = () => {
  setTrData(prevData => {
    return prevData.filter((_, index) => {
      return !isChecked.includes(index)
    })
  });
  setNewTrData(newTrPrevData => {
    return newTrPrevData.filter((_, index) => {
      return !newlyAddedIsChecked.includes(index)
    })
  });
  setIsChecked([]);
  setNewlyAddedIsChecked([]);
}
const newcheckBoxHandler = (e, rowIndex)=>{
  if(e.target.checked){
    setNewlyAddedIsChecked(prevCheckedRows => [...prevCheckedRows, rowIndex])
  }else{
    setNewlyAddedIsChecked(prevCheckedRows => prevCheckedRows.filter(index => index !== rowIndex))
  }
}

  const tableRowData = data.map((val, key) => {
    const filteredIDValues = Object.entries(val).filter(([key, value]) => key !== "id");
    const isCheckedRow = isChecked.includes(key);
    return (
      <>
        <tr key={key} className={isCheckedRow ? 'highlight' : ''}>
          <td>
            <input type={'checkbox'} checked={isCheckedRow} onChange={(e)=>checkBoxHandler(e, key)}/>
          </td>
          {filteredIDValues.map(([key, value]) => (
            <td key={key}>{value}</td>
          ))}
          {filteredIDValues.map(([key, value]) => (
            <td key={key}>{value}</td>
          ))}
        </tr>
      </>
    );
  });
  
  const getAddedRowdataHandler =(data)=>{
    setNewTrData(prevData => [...prevData, data]);
  }
  const addedRow = newTrData.map((val, key) => {
    const newfilteredIDValues = Object.entries(val);
    const isCheckedNewRow = newlyAddedIsChecked.includes(key);
    return (
      <>
        <tr key={key} className={isCheckedNewRow ? 'highlight' : ''}>
          <td>
            <input type={'checkbox'} checked={isCheckedNewRow} onChange={(e)=>newcheckBoxHandler(e, key)}/>
          </td>
          {newfilteredIDValues.map(([key, value]) => (
            <td key={key}>{value}</td>
          ))}
        </tr>
      </>
    );
  });
  return (
    <div className='table-center'>
      <div>
        <h2>Data table</h2>
        <AddTableData getAddedRowdata = {getAddedRowdataHandler}></AddTableData>
      </div>

      <table>
        <thead>
          <tr>
            <td className='tableCheckboxHeader'>
            <input  type={'checkbox'} checked={isChecked.length === data.length} onChange={(e) => {
                  if (e.target.checked) {
                    setIsChecked([...Array(data.length).keys()]);
                  } else {
                    setIsChecked([]);
                  }
                }} />
            </td>
            {tableColumnData}
            {tableColumnData}
          </tr>
        </thead>
        <tbody>
          {addedRow}
          {tableRowData}
        </tbody>
      </table>
      <DeleteRow delete={deleteCheckedRows}></DeleteRow>
    </div>
  )
}
return (
    <div>
      <Pagination 
      renderTableData={renderTableData} 
      dataGET={[...trData, ...newTrData]}
      itemsPerPages={5} 
      pageLimit={5} />
    </div>
  );
}

export default Table