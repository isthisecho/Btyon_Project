import React, {useContext} from 'react';
import '../Styles/tableView.css'
import { DatabaseContext } from './DatabaseContext';

function TableView() {

    const {SystemLog} = useContext(DatabaseContext);
    const {Column} =useContext(DatabaseContext);
    const {Records}= useContext(DatabaseContext);
    const {SpecificRecord} = useContext(DatabaseContext);
    const {SpecificRecordID} = useContext(DatabaseContext);
    const {Flagged} = useContext(DatabaseContext);
    const { deger } = useContext(DatabaseContext);
    const {Update} = useContext(DatabaseContext);

    const[SystemlogValue,setSystemlogValue] = SystemLog;
    const [ColumnValues, setColumnValues]=Column;
    const [RecordsValues, setRecordsValues]=Records;
    const [SpecificRecordValue,setSpecificRecordValue] = SpecificRecord;
    const [SpecificRecordIDValue,setSpecificRecordIDValue] = SpecificRecordID;
    const [FlaggedValue, setFlaggedValue]=Flagged;
     const [degerValue, setDegerValue] = deger;
     const[UpdateValue,setUpdateValue] = Update;
    const DeleteRecords = async (id) => {
        await fetch('/api/' + id, {
          method: 'DELETE',
        })
        setSystemlogValue([...SystemlogValue,"Record Deleted: "+"ID :"+id+"'"])
        setUpdateValue(true);
       
        
      };


      const GetRecords =  async (id) => {
        const response = await fetch('/api/'+id)
        const data = await response.json();
        setSpecificRecordValue(data);
        setSpecificRecordIDValue(id);
        setFlaggedValue(true);
        setDegerValue(data[0].degerValue);
     
      };


    return (
   
        <div className='tableviewMain'>    
            <div style={{ width: "100%", boxShadow: "3px 6px 3px #ccc" }}>

                <table
                    cellSpacing="0"
                    style={{ width: "100%", padding: "5px 10px" }}
                >
                    <thead style={{ backgroundColor: "black", color: "white" }}>
                        <tr>
                            <th>Commands</th>
                            <th>ID</th>
                            {ColumnValues.filter(visibility => visibility.isVisible === true).map((item1, columnindex) => (
                                
                                <th key={columnindex}>{item1.columnName}</th>
                                ))}

                        </tr>
                    </thead>
                    <tbody>

                        {RecordsValues.map((item2, itemindex) => (
                          
                              
                                <tr key={itemindex}>
                                    <td >
                                       
                                        <button className='buttonField' onClick={() => GetRecords(item2._id)}>Edit</button>
                                       
                                        <button  className='buttonField' onClick={() => DeleteRecords(item2._id)} >Delete</button>
                                    </td>
                                    <td>{item2._id}</td>
                                      {ColumnValues.filter(visibility => visibility.isVisible === true).map((e)=>(
                                        <> 
                                         {[item2.Values[0].degerValue].map((item3, itemindex2) => (
                                    
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