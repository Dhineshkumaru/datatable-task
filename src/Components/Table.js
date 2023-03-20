import './Table.scss';
import { useEffect, useState } from 'react';
const Table = () => {
const [trData, setTrData] = useState([]);
useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then(data => setTrData(data))
}, [])
  // const data = [
  //   { name: "Anom", age: 19, gender: "Male" },
  //   { name: "Megha", age: 19, gender: "Female" },
  //   { name: "Subham", age: 25, gender: "Male" },
  // ]
  const tableColumnNames = [
    'Column1',
    'Column2',
    'Column3',
    'Column4',
    'Column5',
    'Column6',
    'Column7',
    'Column8',
    'Column9',
    'Column10',
    'Column11',
    'Column12',
    'Column13',
    'Column14',
    'Column15',
    'Column16',
    'Column17',
    'Column18',
    'Column19',
    'Column20',
  ];
  const tableRowData = trData.map((val, key) => {
    return (
      <tr key={key}>
        <td>{val.name}</td>
        <td>{val.username}</td>
        <td>{val.address.city}</td>
        <td>{val.name}</td>
        <td>{val.username}</td>
        <td>{val.address.city}</td>
        <td>{val.name}</td>
        <td>{val.username}</td>
        <td>{val.address.city}</td>
        <td>{val.name}</td>
        <td>{val.username}</td>
        <td>{val.address.city}</td>
        <td>{val.name}</td>
        <td>{val.username}</td>
        <td>{val.address.city}</td>
        <td>{val.name}</td>
        <td>{val.username}</td>
        <td>{val.address.city}</td>
        <td>{val.name}</td>
        <td>{val.username}</td>
      </tr>
    )
  });
  return (
    <div className='table-center'>
      <h2>Data table</h2>
      <table>
        <thead>
          <tr>
            {tableColumnNames.map((heading, key) => <th key={key}>{heading}</th>)}
          </tr>
        </thead>
        <tbody>{tableRowData}</tbody>
      </table>
    </div>
  )
}

export default Table