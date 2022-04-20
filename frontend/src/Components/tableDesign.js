import React, { useState, useEffect ,useContext} from "react";
import '../Styles/tableDesign.css';
import { Helmet } from "react-helmet";
import { BsFillArrowDownSquareFill, BsFillArrowUpSquareFill } from "react-icons/bs";
import { DatabaseContext } from "./DatabaseContext";
import * as _ from 'lodash';
function TableDesign() {



 

  const {formValues} = useContext(DatabaseContext);
  const {Column} = useContext(DatabaseContext);
  const {checked} =useContext(DatabaseContext);
  const {Update} = useContext(DatabaseContext);

  const [formValuesGet,setFormValues] = formValues;
  const [ColumnValue,setColumnValue] = Column;
  const [columnOrderValue,setColumnOrderValue] = useState(0);
  const [UpdateValue,setUpdateValue] = Update;

    const handleServiceChange =  (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValuesGet, [name]: value });
   
  };


  const handleServiceEdit = (e, index, id) => {
    fetch('/columns/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        columnName: e.target.value,
      })
    }).then(setUpdateValue(true));


  };

  const handleServiceRemove = (id) => {
    fetch('/columns/' + id, {
      method: 'DELETE',
    }).then(setUpdateValue(true));
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
    
        
        
  }; 

  
  const handleServiceChangeOrderUp = async (e,index, length) => {
    let temp = e[index].columnOrder;
    // let id =0;
    // let column=0;


    // for (let i = 0; i < length; i++) {
    //   if(e[i].columnOrder == temp-1){
    //     id=e[i]._id;
    //     column =e[i].columnOrder
    //   }
    
    // }
    
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
    setUpdateValue(true);
    


  };



  const handleServiceChangeOrderDown = async (e,index, length) => {
    let temp = e[index].columnOrder;
    // let id =0;
    // let column=0;


    // for (let i = 0; i < length; i++) {
    //   if(e[i].columnOrder== temp+1){
    //     id=e[i]._id;
    //     column =e[i].columnOrder
    //   }
    
    // }
    
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
    setUpdateValue(true);
    
  

  };

  const handlevisibleChange = (e, index, id) => {


    const { name, type, value, checked } = e.target;
    setFormValues({ ...formValuesGet, [name]: type === 'checkbox' ? checked : value });

    fetch('/columns/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        isVisible: formValuesGet.isVisible
      })
    })

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

          {ColumnValue.length !== 0 &&    ColumnValue.map((item, index) => (
            <div key={index} className="services">

              <div className="delete-section">



                <button
                  type="button"
                  onClick={() => handleServiceRemove(item._id)}
                  className="remove-btn"
                >
                  <span>Delete</span>

                </button>




              </div>
              <div className="first-division">

                <input key={index}
                  name="columnName"
                  type="text"
                  id="service"
                  defaultValue={item.columnName}
                  onChange={(e) => handleServiceEdit(e, index, item._id)}

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

                  <input className="form-check-input" name="isVisible" checked={checked ? !item.isVisible : item.isVisible} type="checkbox" onChange={(e) => handlevisibleChange(e, index, item._id)} />
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