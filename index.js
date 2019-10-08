const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const mongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

let jsonParser = bodyParser.json()

let getTasks = function (db, callback) {
    let collection = db.collection('Tasks')

    collection.find({}).toArray(function (err, docs) {
        console.log('All current tasks')
        callback(docs)
    })
}

app.get('/tasks', jsonParser, function(req, res) {
    mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
        console.log('Successfully connected')

        let db = client.db('ToDoApp')
        getTasks(db, function (result) {
            console.log(result)
            res.json(result)
        })
    })
})

let addTask = function(db, newTask, callback) {
    var collection = db.collection('Tasks')
    collection.insertOne(newTask, function (err, result) {
        console.log('Successfully added a task')
        callback(result)
    })
}

app.post('/tasks/add', jsonParser, function(req, res) {
    mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
        console.log('Successfully connected')

        let db = client.db('ToDoList')
        let newTask = req.body
        addTask(db, newTask, function(result) {
            console.log(result)
            res.json(result)
            // console.log({taskAdded: result.insertedCount})
            // res.json({taskAdded: result.insertedCount})
        })
    })
})

app.listen(port, function () {
    console.log(`Application listening on port ${port}!`)
})