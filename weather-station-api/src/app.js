const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

// Middlewares
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json())
app.use(cors())

// MongoDB connection
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/ufsj-weather-station-db', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Conexão com o MongoDB feita com sucesso.')
        })
        .catch((error) => {
            console.log('Houve um erro ao se conectar ao MongoDB: ' + error)
        })

// Routes
const index = require('./routes/index')
const weatherRoute = require('./routes/weatherRoute')

app.use('/', index)
app.use('/weather/', weatherRoute)

app.use(function(req, res){
    res.status(400).send({
        status: 'failure',
        message: 'URL inválida.'
    })
})

module.exports = app