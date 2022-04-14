const mongoose = require('mongoose')


const recordSchema= new mongoose.Schema({
    Values : { type : Array , "default" : [] }
 
   
   
},
{strict: false})


 
module.exports = mongoose.model('Records',recordSchema)