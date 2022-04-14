const express = require('express')
const router = express.Router()
const Record = require('../models/records')

//GET
router.get('/',async (req,res)=>{
try{
  const records = await Record.find()
  res.json(records)
}
catch(err){
res.status(500).json({message : err.message})
}
})

//GET ONE
router.get('/:id', getRecords, (req,res)=>{
    res.send(res.record.Values)
  
})

//CREATE ONE
router.post('/',async (req,res)=>{
  const records =  new Record({
    Values: req.body.Values
     
  })
  try{
const newRecord = await records.save()
  res.status(201).json(newRecord) 
  }
  catch(err){
res.status(400).json({message : error.message})
  }
})


//UPDATE ONE
router.patch('/:id', getRecords, async(req,res)=>{

  if(req.body.Values != null){
      res.record.Values = req.body.Values
  }

 

try{
    const updatedRecords = await res.record.save()
    res.json({updatedRecords})
}
catch(err){
 res.status(400).json({ message : err.message })
}
})




//DELETE ONE
router.delete('/:id', getRecords, async (req,res)=>{
  try{
     await res.record.remove()
    
     res.json({ message : 'Deleted Successfully !!'})
  }
  catch(err){
    res.status(500).json({ message : err.message})
  }
})



async function getRecords(req,res,next)
{
    let record
    try{
      record = await Record.findById(req.params.id)
        if(record ==null){
            return res.status(404).json({message : 'Cannot find the specified records'})
        }
    }
    catch(err){
    return res.status(500).json({ message : err.message})
    }
    res.record = record
    next()
}
module.exports =router
