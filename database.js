'use strict'

const mysql = require('mysql')
const PropertiesReader = require('properties-reader')

var properties = PropertiesReader('./database.properties')
var mysqlHost = properties.get('mysql.host')
var mysqlPort = properties.get('mysql.port')
var mysqlUser = properties.get('mysql.user')
var mysqlPassword = properties.get('mysql.password')
var mysqldatabase = properties.get('mysql.database')

var pool = mysql.createPool({
    host: mysqlHost,
    port: mysqlPort,
    user: mysqlUser,
    password: mysqlPassword,
    database: mysqldatabase
})

exports.insertPersonInDB = function(req, callback) {
    var firstName = req.body.nombre
    var lastName = req.body.apellido
    var email = req.body.correo
    pool.getConnection(function(err, connection) {
        var insertQuery = 'INSERT INTO persona (nombre, apellido, correo) VALUES(?, ?, ?);'
        connection.query(insertQuery, [firstName, lastName, email], (error, results) => {
            connection.release();
            if (error) {
                callback(true)
                return
            }
            console.log(results)
            callback(false, results)
        })
    })
}