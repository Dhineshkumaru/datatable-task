import './Table.scss';
import { useEffect, useState } from 'react';
import AddTableData from './AddTableData/AddTableData'
import DeleteRow from './DeleteRow/DeleteRow'
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

const tableColumnData = trData.length > 0 ? Object.entries(trData[0])
          .filter(([key]) => key.startsWith("Column "))
          .map(([key, columnData]) => <th >{key}</th>) : null;
const checkBoxHandler = (e, rowIndex)=>{
  if(e.target.checked){
    setIsChecked(prevCheckedRows => [...prevCheckedRows, rowIndex])
  }else{
    setIsChecked(prevCheckedRows => prevCheckedRows.filter(index => index !== rowIndex))
  }
}
const newcheckBoxHandler = (e, rowIndex)=>{
  if(e.target.checked){
    setNewlyAddedIsChecked(prevCheckedRows => [...prevCheckedRows, rowIndex])
  }else{
    setNewlyAddedIsChecked(prevCheckedRows => prevCheckedRows.filter(index => index !== rowIndex))
  }
}

  const tableRowData = trData.map((val, key) => {
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
            <td>
              <input type={'checkbox'} />
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
      <DeleteRow></DeleteRow>
    </div>
  )
}

export default Table