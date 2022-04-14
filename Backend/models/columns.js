const mongoose = require('mongoose')


const columnsSchema= new mongoose.Schema({
    columnName: String,
    columnOrder: Number,
    isVisible : Boolean
 
   
   
},
)
columnsSchema.set('timestamps',true)
 
module.exports = mongoose.model('Columns',columnsSchema)