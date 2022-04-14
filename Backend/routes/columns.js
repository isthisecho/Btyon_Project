const express = require('express')
const router = express.Router()
const Column = require('../models/columns')

//GET
router.get('/', async (req, res) => {
    try {
        const columns = await Column.find()
        res.json(columns)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//GET ONE
router.get('/:id', getColumns, (req, res) => {
    res.send(res.column)

})

//CREATE ONE
router.post('/', async (req, res) => {
    const records = new Column({
        columnName: req.body.columnName,
        columnOrder: req.body.columnOrder,
        isVisible: req.body.isVisible

    })
    try {
        const newRecord = await records.save()
        res.status(201).json(newRecord)
    }
    catch (err) {
        res.status(400).json({ message: error.message })
    }
})


//UPDATE ONE
router.patch('/:id', getColumns, async (req, res) => {

    if (req.body.columnName != null) {
        res.column.columnName = req.body.columnName
    }

    if (req.body.columnOrder != null) {
        res.column.columnOrder = req.body.columnOrder
    }

    if (req.body.isVisible != null) {
        res.column.isVisible = req.body.isVisible
    }



    try {
        const updatedColumn = await res.column.save()
        res.json({ updatedColumn })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})




//DELETE ONE
router.delete('/:id', getColumns, async (req, res) => {
    try {
        await res.column.remove()

        res.json({ message: 'Deleted Successfully !!' })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})



async function getColumns(req, res, next) {
    let column
    try {
        column = await Column.findById(req.params.id)
        if (column == null) {
            return res.status(404).json({ message: 'Cannot find the specified column' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.column = column
    next()
}
module.exports = router
