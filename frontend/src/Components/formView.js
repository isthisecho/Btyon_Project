import React, { useState, useEffect, useContext } from 'react';
import '../Styles/formView.css';
import { DatabaseContext } from './DatabaseContext';
function FormView() {


  const { Column } = useContext(DatabaseContext);
  const { deger } = useContext(DatabaseContext);
  const { Flagged } = useContext(DatabaseContext);
  const { SpecificRecord } = useContext(DatabaseContext);
  const { SpecificRecordID } = useContext(DatabaseContext);
  const {Update} =useContext(DatabaseContext);

  const [UpdateValue,setUpdateValue] = Update
  const [ColumnValue, setColumnValue] = Column;
  const [degerValue, setDegerValue] = deger;
  const [FlaggedValue, setFlaggedValue] = Flagged;
  const [SpecificRecordValue, setSpecificRecordValue] = SpecificRecord;
  const [SpecificRecordIDValue, setSpecificRecordIDValue] = SpecificRecordID;

  const clearFields = () => {
    document.querySelectorAll("#inputID").forEach(
      input => (input.value = "")
    );
    setDegerValue({
      degerValue: [{}]
    });
  }


  const handleServiceAdd = (e, index) => {
    fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        Values: [
          {
            degerValue
          }
        ]
      }

      )
    })
    clearFields();
    setUpdateValue(true)


  };

  const handleServiceUpdate = (e, index, id) => {
    fetch('/api/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        Values: [
          {
            degerValue
          }
        ]
      }

      )
    })
     clearFields();
    setFlaggedValue(false);
    setUpdateValue(true);

  };


  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    setDegerValue({ ...degerValue, [name]: value });
  }

  return (
    <div className='formviewMain'>
      {FlaggedValue == false && ColumnValue.map((item, index) => (
        <div className='formMain' key={index}>

          <div className='forms'>
            {item.columnName}
            <input id='inputID' name={item.columnName} defaultValue="" onChange={(e) => handleServiceChange(e, index)
            
            } className='forminput'></input>
          </div>


          {ColumnValue.length - 1 === index && (
            <div className='buttondiv'>
              <button onClick={handleServiceAdd} >Save</button>
            </div>


          )}
        </div>


      ))}



      {FlaggedValue == true && ColumnValue.map((item, index) => (
        <>
          {SpecificRecordValue.map((item1, index1) => (
            <div className='formMain' key={index1}>
              <div className='forms'>
                {item.columnName}
                <input id='inputID' name={item.columnName} defaultValue={item1.degerValue[item.columnName]}  onChange={(e) =>handleServiceChange(e, index,)} className='forminput'></input>
              </div>


              {ColumnValue.length - 1 === index && (
                <div className='buttondiv'>
                  <button onClick={(e) => handleServiceUpdate(e, index,SpecificRecordIDValue)} >Update</button>
                </div>


              )}
            </div>

          ))}


        </>



      ))}

    </div>
  )
}

export default FormView