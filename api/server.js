const express = require('express')
const apiRouter = require('./api-router')
const config = require('./api-config')
const server = express()

config(server)

server.use('/api', apiRouter)

module.exports = server