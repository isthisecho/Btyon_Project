import React, { useEffect, useState } from 'react';
import  {useTable} from "react-table";
function TableView() {

    const [Columns, setColumns] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const response = await fetch("/columns")
          const data = await response.json();
          console.log("Columns" ,data)
    
          setColumns(data);
    
        }
    
        fetchData()
    
    
    
      }, []);



  return (

    <div className='tableviewMain'>
    <div style={{ width: "50%", boxShadow: "3px 6px 3px #ccc" }}>
   
        <table
          cellSpacing="0"
          style={{ width: "100%", padding: "5px 10px" }}
        >
          <thead style={{ backgroundColor: "black", color: "white" }}>
            <tr>

            <th>ID</th>

            
              {Columns.filter(visibility => visibility.isVisible ==true).map((item, index) => (

                <th key={index}>{item.columnName}</th>
              ))}
           
            </tr>
          </thead>
          <tbody>
           
          </tbody>
          
        </table>
    
    </div>
         </div>

  )
}

export default TableView