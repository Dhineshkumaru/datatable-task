import './AddTableData.scss';
import {useState, useRef} from 'react';

const AddTableData = (props)=>{
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    // const [addRowData, setAddRowData] = useState('');
    const columnInputRef = useRef([]);
    const openDialog = () =>{
        setIsOpenDialog(true)
    };
    const closeHandler = ()=>{
        setIsOpenDialog(false)
    }
    const handleChange = (event, index) =>{
        columnInputRef.current[index] = event.target.value;

    }
    const submitHandler = (e)=>{
        e.preventDefault();
        const enteredColumnData = columnInputRef.current;
        props.getAddedRowdata(enteredColumnData);
        setIsOpenDialog(false);
    }
    return(
        <div>
        {isOpenDialog ? <div id="add-row-dialog">
          <h2>Add Row Data</h2>
          <form onSubmit={submitHandler}>
            <div>
                <label>
                    <div>
                        <span>
                        <label>Column1:</label>
                        <input ref={el =>columnInputRef[0]=el} type="text" name="Column1" onChange={(event) => handleChange(event,0)} />
                        </span>
                        <span>
                        <label>
                            Column2:
                        </label>
                        <input ref={el =>columnInputRef[1]=el} type="text" name="Column2" onChange={(event) => handleChange(event,1)} />
                        </span>
                    </div>
                    <div>
                        <span>
                            <label>
                                Column3:
                            </label>
                            <input ref={el =>columnInputRef[2]=el} type="text" name="Column3" onChange={(event) => handleChange(event,2)} />
                        </span>
                        <span>
                            <label>
                                Column4:       
                            </label>
                            <input ref={el =>columnInputRef[0]=el} type="text" name="Column4" onChange={(event) => handleChange(event,3)} />
                        </span>
                    </div>
                    <div>
                        <span>
                            <label>
                            Column5:
                            </label>
                            <input ref={el =>columnInputRef[1]=el} type="text" name="Column5" onChange={(event) => handleChange(event,4)} />
                        </span>
                        <span>
                            <label>
                            Column6:
                            </label>
                            <input ref={el =>columnInputRef[2]=el} type="text" name="Column6" onChange={(event) => handleChange(event,5)} />
                        </span>
                    </div>
                    <div>
                        <span>
                            <label>
                            Column7:
                            </label>
                            <input ref={el =>columnInputRef[0]=el} type="text" name="Column7" onChange={(event) => handleChange(event,6)} />
                        </span>
                        <span>
                            <label>
                            Column8:
                            </label>
                            <input ref={el =>columnInputRef[1]=el} type="text" name="Column8" onChange={(event) => handleChange(event,7)} />
                        </span>
                    </div>
                    <div>
                        <span>
                            <label>
                            Column9:
                            </label>
                            <input ref={el =>columnInputRef[2]=el} type="text" name="Column9" onChange={(event) => handleChange(event,8)} />
                        </span>
                        <span>
                            <label>
                            Column10:
                            </label>
                            <input ref={el =>columnInputRef[0]=el} type="text" name="Column10" onChange={(event) => handleChange(event,9)} />
                        </span>
                    </div>
                    <div>
                        <span>
                            <label>
                            Column11:
                            </label>
                            <input ref={el =>columnInputRef[1]=el} type="text" name="Column11" onChange={(event) => handleChange(event,10)} />
                        </span>
                        <span>
                            <label>
                            Column12:
                            </label>
                            <input ref={el =>columnInputRef[2]=el} type="text" name="Column12" onChange={(event) => handleChange(event,11)} />
                        </span>
                    </div>
                    <div>
                        <span>
                            <label>
                            Column13:
                            </label>
                            <input ref={el =>columnInputRef[0]=el} type="text" name="Column13" onChange={(event) => handleChange(event,12)} />
                        </span>
                        <span>
                            <label>
                            Column14:
                            </label>
                            <input ref={el =>columnInputRef[1]=el} type="text" name="Column14" onChange={(event) => handleChange(event,13)} />
                        </span>
                    </div>
                    <div>
                        <span>
                            <label>
                            Column15:
                            </label>
                            <input ref={el =>columnInputRef[2]=el} type="text" name="Column15" onChange={(event) => handleChange(event,14)} />
                        </span>
                        <span>
                            <label>
                            Column16:
                            </label>
                            <input ref={el =>columnInputRef[0]=el} type="text" name="Column16" onChange={(event) => handleChange(event,15)} />
                        </span>
                    </div>
                    <div>
                        <span>
                            <label>
                            Column17:
                            </label>
                            <input ref={el =>columnInputRef[1]=el} type="text" name="Column17" onChange={(event) => handleChange(event,16)} />
                        </span>
                        <span>
                            <label>
                            Column18:
                            </label>
                            <input ref={el =>columnInputRef[2]=el} type="text" name="Column18" onChange={(event) => handleChange(event,17)} />
                        </span>
                    </div>
                    <div>
                        <span>
                            <label>
                            Column19:
                            </label>
                            <input ref={el =>columnInputRef[0]=el} type="text" name="Column19" onChange={(event) => handleChange(event,18)} />
                        </span>
                        <span>
                            <label>
                            Column20:
                            </label>
                            <input ref={el =>columnInputRef[1]=el} type="text" name="Column20" onChange={(event) => handleChange(event,19)} />
                        </span>
                    </div>
                </label>
            </div>
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