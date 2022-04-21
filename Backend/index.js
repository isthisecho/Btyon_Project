const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const Column = require('./models/columns')
const Record = require('./models/records')
mongoose.connect('mongodb://mongo:27017/myapp')
const db = mongoose.connection

db.on('error',(error) => console.log(error))
db.once('open',() => console.log('Connected To Database'))

app.use(express.json())

const recordsRouter = require('./routes/records')
const columnsRouter = require('./routes/columns')



app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.use('/api',recordsRouter)
app.use('/columns',columnsRouter)

app.listen(3000, () => console.log('Server Started !!'))


