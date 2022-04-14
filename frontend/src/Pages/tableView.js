import React, { useEffect, useState } from 'react';
import '../Styles/tableView.css'
function TableView() {

    const [Columns, setColumns] = useState([]);
    const [Records, setRecords] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/columns")
            const data = await response.json();
            setColumns(data);

        }
        fetchData()
    }, []);


    useEffect(() => {
        async function fetchRecords() {
            const response = await fetch("/api")
            const data = await response.json();
            setRecords(data);


        }
        fetchRecords()
    }, [Records]);

    const DeleteRecords = (id) => {
        fetch('/api/' + id, {
          method: 'DELETE',
        })
      };

    return (
   
        <div className='tableviewMain'>
               
            <div style={{ width: "50%", boxShadow: "3px 6px 3px #ccc" }}>

                <table
                    cellSpacing="0"
                    style={{ width: "100%", padding: "5px 10px" }}
                >
                    <thead style={{ backgroundColor: "black", color: "white" }}>
                        <tr>
                            <th>Commands</th>
                            <th>ID</th>


                            {Columns.filter(visibility => visibility.isVisible === true).map((item1, columnindex) => (
                                
                                <th key={columnindex}>{item1.columnName}</th>
                                ))}

                        </tr>
                    </thead>
                    <tbody>

                        {Records.map((item2, itemindex) => (
                          
                              
                                <tr key={itemindex}>
                                    <td>
                                       
                                        <button className='buttonField'>Edit</button>
                                        <button  className='buttonField' >Delete</button>
                                    </td>
                                    <td>{item2._id}</td>
                                    {Columns.filter(visibility => visibility.isVisible === true).map((e,x)=>(
                                        <> 
                                         {[item2.Values[0].deger].map((item3, itemindex2) => (
                                    
                                            <td key={itemindex2}>{item3[e.columnName]}</td>
                                            ))}
                                        </>                                                                                                                                                           
                        ))}                                   
                                </tr>                   
                        ))}
                    </tbody>

                </table>

            </div>
       
        </div>
 
    )
  
}

export default TableView