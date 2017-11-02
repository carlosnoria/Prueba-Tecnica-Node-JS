'use strict'

const request = require('request')
const sha1 = require('sha1')
const config = require('../config')

var db = require('../database')

function getJsonFromUrl (req, res) {
    request(config.dataUrl, (err, resp, body) => {
        if (!err && resp.statusCode == 200) {
            var importedJSON = JSON.parse(body);
            for (let item in importedJSON) {
                importedJSON[item].hash = sha1(importedJSON[item].title)
            }
            res.status(200).send(importedJSON)
        }
    })
}

function insertPersonData (req, res) {
    var firstName = req.body.nombre
    var lastName = req.body.apellido
    var email = req.body.correo
    db.insertPersonInDB(req, (err, result) => {
        if (err) {
            return res.status(500).send({message: "Error al insertar aspirante!"})
        }
        if (result.affectedRows == 0) return res.status(200).send({message: 'Aspirante ya existe en la base de datos.'})
        
        res.status(200).send({message: 'Aspirante agregado exitosamente.'})
    })
}

module.exports = {
    getJsonFromUrl,
    insertPersonData
}