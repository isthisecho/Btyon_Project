import React, { useState, useEffect } from "react";
import '../Styles/tableDesign.css';
import { Helmet } from "react-helmet";
import { BsFillArrowDownSquareFill , BsFillArrowUpSquareFill } from "react-icons/bs";

function TableDesign() {
  const initialValues= {columnName:"",columnOrder:1, isVisible:true}

  const [formValues, setFormValues] = useState(initialValues);
  const [Column, setColumn] = useState([]);
  const checked = initialValues.isVisible.type;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/columns")
      const data = await response.json();


      setColumn(data);

    }

    fetchData()



  }, [Column]);

  
  const handleServiceChange = (e, index) => {
    const { name, value  } = e.target;
    setFormValues({...formValues, [name]:value});

    console.log(formValues)
  };

  const handleServiceRemove = (id) => {
    fetch('/columns/' + id, {
      method: 'DELETE',
    })
  };

  const handleServiceAdd = (e,index) => {
    fetch('/columns/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        columnName: formValues.columnName,
        columnOrder: formValues.columnOrder,
        isVisible: formValues.isVisible
      })
    }).then(formValues.columnOrder++)
  };

  const handlevisibleChange = (e,index,id) => {
  
    
    const { name,type ,value,checked} = e.target;
    setFormValues({...formValues, [name]: type==='checkbox' ? checked : value});

    fetch('/columns/' +id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
     
        isVisible: formValues.isVisible
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
          {Column.map((item, index) => (
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
                <input
                  name="service "
                  type="text"
                  id="service"
                  value={item.columnName}
                
                  required
                />
  
                {(Column.length -1 === index ) && (
                  <div className="addservice">

                    <button
                      type="button"
                      onClick={handleServiceAdd}
                      className="add-btn"
                    >
                      <span>Add </span>
                    </button>
                    <input
                      name="columnName"
                      type="text"
                      id="service"
                      placeholder="New Column"
                     
                      onChange={(e) => handleServiceChange(e, index)}
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

                      className="add-btn"
                    >
                      <span><BsFillArrowUpSquareFill/> </span>
                    </button>
               
                </div>
                )}
              

              {index +1 !== Column.length && (
                <div className="orderButtons">
                <button
                      type="button"
               
                      className="add-btn"
                    >
                      <span><BsFillArrowDownSquareFill/> </span>
                    </button>
               
                </div>)}

                <div className="checkbox">
       
                  <input class="form-check-input" name="isVisible" checked={checked ? !item.isVisible : item.isVisible}    type="checkbox" onChange={(e) => handlevisibleChange(e,index,item._id)} />
                  <label class="form-check-label" for="flexCheckDefault">is Visible</label>
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