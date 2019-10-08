const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const mongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

let jsonParser = bodyParser.json()