import './AddTableData.scss';
import {useState, useRef} from 'react';

const AddTableData = (props)=>{
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [addRowData, setAddRowData] = useState([]);
    const columnInputRef = useRef(null);
    const openDialog = () =>{
        setIsOpenDialog(true)
    };
    const closeHandler = ()=>{
        setIsOpenDialog(false)
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        const formData = new FormData(columnInputRef.current);
        const data = {};
        for (let [name, value] of formData.entries()) {
          data[name] = value;
        }
        props.getAddedRowdata(data);
        setIsOpenDialog(false);
    }
    const numOfCols = 20;
    const inputFields = [];
    for (let i = 1; i <= numOfCols; i++) {
      inputFields.push(
        <span key={`column${i}`} className='extraPaddingSpan'>
          <label className='extraPaddingLabel'>Column{i}:</label>
          <input type="text" name={`Column${i}`} />
        </span>
      );
    }
    return(
        <div>
        {isOpenDialog ? <div id="add-row-dialog">
          <h2>Add Row Data</h2>
          <form ref={columnInputRef} onSubmit={submitHandler}>
            <div>{inputFields}</div>
            <div className='submit-div'>
                <input type="submit" value="Submit" className='submit-btn'/>
            </div>
          </form>
          <button onClick={closeHandler} className='close-btn'>Close</button>
        </div> : ''
        }
            <div className='add-btn'>
                <button className='add-btn-style' onClick={openDialog}>ADD ROW</button>
            </div>
        </div>
    )
}

export default AddTableData