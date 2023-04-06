import './Table.scss';
import { useEffect, useState } from 'react';
import AddTableData from './AddTableData/AddTableData'
import DeleteRow from './DeleteRow/DeleteRow'
import Pagination from './Pagination/Pagination'
import filterIcon from '../filter.png'
const Table = () => {
const [trData, setTrData] = useState([]);
const [newTrData, setNewTrData] = useState([]);
const [isChecked, setIsChecked] = useState([]);
const [newlyAddedIsChecked, setNewlyAddedIsChecked] = useState([]);
const [isFilterChecked, setIsFilterChecked] = useState([]);
const [isFilterOpenDialog, setIsFilterOpenDialog] = useState(false);
const [filterOptions, setfilterOptions] = useState();
const [paginatedData, setPaginatedData] = useState([]);
const [hiddenIds, setHiddenIds] = useState([]);
useEffect(() => {
    fetch('https://retoolapi.dev/UvRrOB/data')
    .then(res => res.json())
    .then(data => setTrData(data))
    }, [])


const renderTableData = (data)=>{
  const filterRow = (e, rowIndex)=>{
    const options = data.map((val, keyIndex) => {
      const filteredOptions = Object.entries(val).filter(([key, value]) => key === rowIndex);
      return (
        <ul className='filter-option'>{
          filteredOptions.map(([key, value]) => {
            return(
            <li   key={val.id} >
              <span>
                <input 
                name={val.id} 
                type={'checkbox'}  
                onChange={(e)=> filterCheckBoxHandler(e, val.id)} 
                />
              </span>
              <span>{value}</span>
              </li>
        )})
        }
        </ul>
      )
    })
    setfilterOptions(options)
    setIsFilterOpenDialog(!isFilterOpenDialog)
  }
  const closeFilterDialog = ()=>{
    setIsFilterOpenDialog(false)
  }
  const filterDialogOkHandler = ()=>{
    const matchedIds = data.filter(val => isFilterChecked.includes(val.id)).map(val => val.id);
    setHiddenIds(matchedIds);
    setIsFilterOpenDialog(false)
    setIsFilterChecked([])
  }
  const tableColumnData = data.length > 0 ? Object.entries(data[0])
          .filter(([key]) => key.startsWith("Column "))
          .map(([key, columnData]) => <th>{key}<button className='th-filter' onClick={(e)=>filterRow(e, key)}><img src={filterIcon} alt="filter logo" /></button></th>) : null;
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
const filterCheckBoxHandler = (event, optionId) => {
  if (event.target.checked) {
    setIsFilterChecked(prevCheckedOption => [...prevCheckedOption, optionId]);
  } else {
    setIsFilterChecked(prevCheckedOption => prevCheckedOption.filter(id => id !== optionId));
  }
};



  const tableRowData = data.map((val, key) => {
    const filteredIDValues = Object.entries(val).filter(([key, value]) => key !== "id");
    const isCheckedRow = isChecked.includes(key);
    if (hiddenIds.includes(val.id)) {
      return null;
    }
    return (
      <>
        <tr key={key} id={val.id}  className={isCheckedRow ? 'highlight' : ''}>
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
                    setNewlyAddedIsChecked([...Array(data.length).keys()]);
                  } else {
                    setIsChecked([]);
                    setNewlyAddedIsChecked([]);
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
      {isFilterOpenDialog ? 
      <div className='filter-dialog'> 
        <div id="filter-dialog">
          {filterOptions}
          <button onClick={filterDialogOkHandler} >OK</button>
          <button onClick={closeFilterDialog} >Cancel</button>
        </div>
        </div> : 
                ''}
      <DeleteRow delete={deleteCheckedRows}></DeleteRow>
    </div>
  )
}
return (
    <div>
      <Pagination 
      renderTableData={renderTableData} 
      dataGET={[...trData]}
      itemsPerPages={5} 
      pageLimit={5} />
    </div>
  );
}

export default Table