'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const admision = require('./routes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/admision', admision)

module.exports = app