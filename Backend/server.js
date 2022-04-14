const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Column = require('./models/columns')
const Record = require('./models/records')
mongoose.connect('mongodb://127.0.0.1:27017/myapp')
const db = mongoose.connection

db.on('error',(error) => console.log(error))
db.once('open',() => console.log('Connected To Database'))

app.use(express.json())

const recordsRouter = require('./routes/records')
const columnsRouter = require('./routes/columns')


app.use('/api',recordsRouter)
app.use('/columns',columnsRouter)

app.listen(5000, () => console.log('Server Started !!'))


