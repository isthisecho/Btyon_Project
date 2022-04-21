import React ,{useState,useContext, useEffect} from 'react'
import '../Styles/systemlog.css'
import { DatabaseContext } from './DatabaseContext'

function Systemlog() {
 const {SystemLog} = useContext(DatabaseContext);
 const[SystemlogValue,setSystemlogValue] = SystemLog;



  return (
    <div className='systemlogMain'>
     <h2>System Log(s)</h2>
      {SystemlogValue.map((item,index)=>(
        <p>{item}</p>

    ))}
    </div>
  )
}

export default Systemlog