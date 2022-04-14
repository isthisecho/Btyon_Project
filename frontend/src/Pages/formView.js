import React, { useState,useEffect } from 'react';
import '../Styles/formView.css';
function FormView() {

    const [Columns, setColumns] = useState([]);
    const [Records, setRecords] = useState([]);
    const [deger,setDeger] = useState([]);
 

    

    const handleServiceAdd = (e, index) => {
        fetch('/api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            
                Values: [
                            {
                               deger
                            }
                        ]
                }
                        
          )
        })
      };


    const handleServiceChange = (e,index) =>{
        const { name, value } = e.target;
        setDeger({ ...deger, [name]: value });
    
    
    }
    

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
      }, []);



  return (
    <div className='formviewMain'>
        {Columns.map((item,index)=>(
            <div className='formMain'>

                <div className='forms'>
                {item.columnName}
                
                 <input  name={item.columnName}  onChange={(e) => handleServiceChange(e, index)} className='forminput'></input>
                </div>
            

              {Columns.length-1 === index && (
                  <div className='buttondiv'>       
                  <button  onClick={handleServiceAdd} >Save</button>
                  </div>

           
              )}
            </div> 
            
            
        ))}
        
    </div>
  )
}

export default FormView