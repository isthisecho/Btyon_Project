import React, { useState, useEffect ,useContext} from "react";
import '../Styles/tableDesign.css';
import { Helmet } from "react-helmet";
import { BsFillArrowDownSquareFill, BsFillArrowUpSquareFill } from "react-icons/bs";
import { DatabaseContext } from "./DatabaseContext";
function TableDesign() {



 
  const {SystemLog} = useContext(DatabaseContext);
  const {formValues} = useContext(DatabaseContext);
  const {Column} = useContext(DatabaseContext);
  const {checked} =useContext(DatabaseContext);
  const {Update} = useContext(DatabaseContext);
  const [formValuesGet,setFormValues] = formValues;
  const [ColumnValue,setColumnValue] = Column;
  const [UpdateValue,setUpdateValue] = Update;
  const[SystemlogValue,setSystemlogValue] = SystemLog;

    const handleServiceChange =  (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValuesGet, [name]: value });
   
  };


  const handleServiceEdit = (e, index, id,name) => {
    fetch('/columns/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        columnName: e.target.value,
      })
    }).then(setUpdateValue(true));

    setSystemlogValue([...SystemlogValue,"Column name changed: '"+"'"+name+"' "+"- "+e.target.value+"'"])



  };

  const handleServiceRemove = (id,name) => {
    fetch('/columns/' + id, {
      method: 'DELETE',
    }).then(setUpdateValue(true));

    setSystemlogValue([...SystemlogValue,"Column deleted: '"+name+"'"])
  };

  const handleServiceAdd = async(e,index,length) => {
    let a=0;
 
   
  
      for (let i = 0; i < length; i++) {
        if(a <e[i].columnOrder){
          a=e[i].columnOrder;
        }
      
      }

      await fetch('/columns/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          columnName: formValuesGet.columnName,
          columnOrder: ++a,
          isVisible: formValuesGet.isVisible
        })
      })
      setUpdateValue(true);
      setSystemlogValue([...SystemlogValue,"Column added: '"+formValuesGet.columnName+"'"])
    
    
        
        
  }; 

  
  const handleServiceChangeOrderUp = async (e,index, length) => {
    let temp = e[index].columnOrder;
 
    await fetch('/columns/' + e[index]._id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        columnOrder: e[index-1].columnOrder
      })
    })

    await fetch('/columns/' + e[index-1]._id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        columnOrder: temp
      })
    })
    setSystemlogValue([...SystemlogValue,"Columns Moved: '"+e[index].columnName+"'"+"(up) - "+"'"+e[index-1].columnName+"'"+"(down)"])
    setUpdateValue(true);



  };



  const handleServiceChangeOrderDown = async (e,index, length) => {
    let temp = e[index].columnOrder;
   
    await fetch('/columns/' + e[index]._id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        columnOrder: e[index+1].columnOrder
      })
    })

    await fetch('/columns/' +e[index+1]._id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        columnOrder: temp
      })
    })
    setSystemlogValue([...SystemlogValue,"Columns Moved: '"+e[index].columnName+"'"+"(down) - "+"'"+e[index+1].columnName+"'"+"(up)"])
    setColumnValue([...ColumnValue])
    
    setUpdateValue(true);
 
  

  };

  const handlevisibleChange = (e, index, id,columnName) => {


     const {value, checked } = e.target;
     fetch('/columns/' + id, {
       method: 'PATCH',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({

         isVisible: checked
       })
     })
     setUpdateValue(true);
     if(checked==true){
      setSystemlogValue([...SystemlogValue,"Column unhide '"+columnName+"'"])
     }
     if(checked==false){
      setSystemlogValue([...SystemlogValue,"Column hide '"+columnName+"'"])
     }
    

  };



  return (
    <div className="tableDesignMain">
      <Helmet>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />

      </Helmet>
      <form className="appform" autoComplete="off">
        <div className="form-field">
          <label htmlFor="service">Column(s)</label>

           {ColumnValue.length === 0 && (
            <div className="services">
              <div className="addservice">

                <button
                  type="button"
                  onClick={(e) => handleServiceAdd(e)}
                  className="add-btn"
                >
                  <span>Add </span>
                </button>
                <input
                  name="columnName"
                  type="text"
                  id="service"
                  placeholder="New Column"
                  defaultValue=""

                  onChange={(e) => {
                    handleServiceChange(e);
                  }}
                  required
                />


              </div>
            </div>

          )} 

          {ColumnValue.length !== 0 &&  ColumnValue.map((item, index) => (
            <div key={index} className="services">

              <div className="delete-section">



                <button
                  type="button"
                  onClick={() => handleServiceRemove(item._id,item.columnName)}
                  className="remove-btn"
                >
                  <span>Delete</span>

                </button>




              </div>
              <div className="first-division">

                <input key={Math.random(10)}
                  name="columnName"
                  type="text"
                  id="service"
                  defaultValue={item.columnName}
                  onChange={(e) => handleServiceEdit(e, index, item._id,item.columnName)}

                  required
                />


                {ColumnValue.length - 1 === index && (

                  <div className="addservice">

                    <button
                      type="button"
                      onClick={(e) => handleServiceAdd(ColumnValue,index,ColumnValue.length)}
                      className="add-btn"
                    >
                      <span>Add </span>
                    </button>
                    <input
                      name="columnName"
                      type="text"
                      id="service"
                      placeholder="New Column"
                      defaultValue=""

                      onChange={(e) => {  
                        handleServiceChange(e, index);





                      }}
                      required
                    />


                  </div>

                )}
              </div>


              <div className="second-division">
                {index !== 0 && (
                  <div className="orderButtons">
                     <button
                      type="button"
                      onClick={() => { handleServiceChangeOrderUp(ColumnValue,index,ColumnValue.length) }}

                      
                      
                    >
                    <BsFillArrowUpSquareFill/> 
                    </button> 
                  

                  </div>
                )}


                {index + 1 !== ColumnValue.length && (
                  <div className="orderButtons">
                    <button
                      type="button"

                      className="add-btn"
                      onClick={() => { handleServiceChangeOrderDown(ColumnValue,index,ColumnValue.length) }}
                    >
                    <BsFillArrowDownSquareFill /> 
                    </button>

                  </div>)}

                <div className="checkbox">

                  <input className="form-check-input" name="isVisible" checked={checked ? !item.isVisible : item.isVisible} type="checkbox" onChange={(e) => handlevisibleChange(e, index, item._id,item.columnName)} />
                  <label className="form-check-label" htmlFor="flexCheckDefault">is Visible</label>
                </div>










              </div>
            </div>
          ))}   
        </div>

      </form>


    </div>

  );
}

export default TableDesign;