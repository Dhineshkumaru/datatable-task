import './DeleteRow.scss';


function DeleteRow(props){
    return(
        <button onClick={props.delete} className='delete-btn'>DELETE</button>
    )
}

export default DeleteRow