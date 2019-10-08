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

app.get('/tasks', function (req, res) {
    mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
        console.log('Successfully connected')

        let db = client.db('ToDoLis')
        getTasks(db, function (result) {
            console.log(result)
            res.json(result)
        })
    })
})