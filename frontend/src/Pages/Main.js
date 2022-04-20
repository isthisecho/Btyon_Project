import React from 'react'
import '../Styles/Main.css';
import 'bootstrap/dist/css/bootstrap.css';
import TableDesign from '../Components/tableDesign';
import TableView from '../Components/tableView';
import Systemlog from '../Components/systemlog';
import FormView from '../Components/formView';
import { DatabaseProvider } from '../Components/DatabaseContext';
function Main() {
  return (
    <DatabaseProvider>
      <div id="app" className="flex-container">
          <div className="flex-item"><TableView /></div> 
           <div className="flex-item" ><FormView/></div>    
         <div className="flex-item" ><TableDesign /></div> 
         <div className="flex-item" ><Systemlog/></div>  
      </div>
    </DatabaseProvider>

  )
}

export default Main