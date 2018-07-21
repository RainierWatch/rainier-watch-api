'use strict'

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const redis = require('redis')
let redis_client = redis.createClient({
    host: process.env.REDIS_HOST || 'redis'
})

app.get('/', (req, res) => {
  res.send('Hello Mt. Rainier\n')
})

app.get('/status', (req, res) => {
    let response = {
        is_the_mountain_out: true 
    }

    res.json(response)
})

app.post('/update', (req, res) => {
    var auth = req.get('Authorization')
    if (!auth || auth !== process.env.AUTH_PASSWORD) {
        res.status(401).send('Authorization required')
        return
    }

    let request_body = req.body
    if (!request_body.status) {
        res.status(422).send('status required')
        return
    }

    res.json({
        updated: true,
        mountain_status: request_body.status
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log(`Listening on port ${PORT}`)
