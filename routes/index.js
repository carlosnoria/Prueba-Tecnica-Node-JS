'use strict'

const express = require('express')
const admision = express.Router()
const admisionController = require('../controllers/admision')

admision.get('/', admisionController.getJsonFromUrl)

admision.post('/', admisionController.insertPersonData)

module.exports = admision