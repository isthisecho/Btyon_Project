import React ,{useState, createContext,useEffect} from 'react'

export const DatabaseContext = createContext();

export const DatabaseProvider = props => {



   

     
    const [Column, setColumn] = useState([]);
    const [Records, setRecords] = useState([]);
    const initialValues = { columnName: "", columnOrder: 1, isVisible: true }
    const [formValues, setFormValues] = useState(initialValues);
    const checked = initialValues.isVisible.type;
    
    const [deger,setDeger] = useState([]);
    const [SpecificRecord,setScpecificRecord] =useState([]);
    const [SpecificRecordID,setScpecificRecordID] =useState([]);
    const [SystemLog,setSystemLog] =useState([]);
    const [Flagged,setFlagged] = useState(false);

    const [Update,setUpdate] =useState(false);

    async function fetchData() {
        const response = await fetch("/columns")
        const data = await response.json();

        data.sort(({ columnOrder: previousOrder }, { columnOrder: currentOrder }) => previousOrder - currentOrder);
        setColumn(data);
      
      }


      async function fetchRecords() {
        const response = await fetch("/api")
        const data = await response.json();
        setRecords(data);
       
       
      }  
      useEffect(() => {
        fetchData()
        setUpdate(false);  
      }, [formValues,Update]);

      useEffect(() => {
       
        fetchRecords()
        setUpdate(false);
      }, [Update,formValues]);

    


  

  return (
   <DatabaseContext.Provider value={{
     Column: [Column, setColumn],
     Records: [Records, setRecords],
     deger:[deger,setDeger],
     SpecificRecord:[SpecificRecord,setScpecificRecord],
     SpecificRecordID:[SpecificRecordID,setScpecificRecordID],
     Flagged:[Flagged,setFlagged],
     Update:[Update,setUpdate],
     SystemLog:[SystemLog,setSystemLog],
     checked,
     formValues:[formValues,setFormValues]}}>
    {props.children}
   </DatabaseContext.Provider>
  )
}
