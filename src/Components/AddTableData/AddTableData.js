import './AddTableData.scss';
import {useState} from 'react';

const AddTableData = ()=>{
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const openDialog = () =>{
        setIsOpenDialog(true)
    };
    const closeHandler = ()=>{
        setIsOpenDialog(false)
    }
    return(
        <div>
        {isOpenDialog ? <div id="add-row-dialog">
          <h2>Add Row Data</h2>
          <form>
            <div>
                <label>
                    Column1:
                    <input type="text" name="Column1" />
                </label>
                <label>
                    Column2:
                    <input type="text" name="Column2" />
                </label>
            </div>
            <div>
                <label>
                    Column3:
                    <input type="text" name="Column3" />
                </label>
                <label>
                    Column4:
                    <input type="text" name="Column4" />
                </label>
            </div>
            <div>
                <label>
                    Column5:
                    <input type="text" name="Column5" />
                </label>
                <label>
                    Column6:
                    <input type="text" name="Column6" />
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