import './App.css';
import React from 'react'
import TableDesign from './Pages/tableDesign';
import TableView from './Pages/tableView';
import FormView from './Pages/formView';
import SystemLog from './Pages/systemlog';
import Navbar from './Components/Navbar';
import {Route, Routes} from 'react-router-dom';
function App() {
  return (
    <div className="App">

      <div className='upperCompononent'>
       <Navbar/>
       </div>
      <Routes>
        <Route path='columns' element={<TableDesign/>}/>
        <Route path='form' element={<FormView/>}/>

        <Route path='/' element={<TableView/>}/>

        <Route path='logs' element={<SystemLog/>}/>
     
      </Routes>
 
    </div>
  );
}

export default App;
