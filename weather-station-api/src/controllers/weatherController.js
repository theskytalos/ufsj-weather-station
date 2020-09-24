const mongoose = require('mongoose')
const validation = require('../validators/weatherValidator')

const weatherSchema = mongoose.Schema({
    dateTime: {
        type: Date,
        required: true
    },
    temp: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    raining: {
        type: Boolean,
        required: true
    },
    uvIndex: {
        type: Number,
        required: true
    }
})

const weatherModel = mongoose.model('Weather', weatherSchema)

let weatherBuffer = {

}

exports.newWeather = (req, res, next) => {
    let weather = Object.assign({}, req.body)
    let validationResult = validation.weatherValidationSchema.validate(weather)

    if (validationResult.error) {
        res.status(200).send({ success: false, content:  validationResult.error.message })
        return
    }

    weather.dateTime = new Date()

    weatherModel.create(weather, (err, weather) => {
        if (err) {
            res.status(200).send({ success: false, content: 'Não foi possível persistir os dados meteorológicos.' })
            console.log(err)
        } else {
            weather.dateTime = weather.dateTime.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
            weatherBuffer = Object.assign({}, weather)
            res.status(200).send({ success: true, content: 'Dados meteorológicos persistidos com sucesso.' })
        }
    })
}

exports.getCurrentWeather = (req, res, next) => {
    if (weatherBuffer.hasOwnProperty('dateTime') && weatherBuffer.hasOwnProperty('temp') && weatherBuffer.hasOwnProperty('humidity') && weatherBuffer.hasOwnProperty('raining') && weatherBuffer.hasOwnProperty('uvIndex'))
        res.status(200).send({ success: true, content: { weather: weatherBuffer } })
    else {
        weatherModel.findOne({ }, { _id: 0, __v: 0 }, { sort: { dateTime: -1 } }).lean().exec((err, weather) => {
            if (err) {
                res.status(200).send({ success: false, content: 'Não foi possível recuperar os dados meteorológicos.' })
                console.log(err)
            } else
                if (weather) {
                    weather.dateTime = weather.dateTime.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
                    weatherBuffer = Object.assign({}, weather)
                    res.status(200).send({ success: true, content: weatherBuffer})
                } else
                    res.status(200).send({ success: false, content: 'Não há dados meteorológicos para serem mostrados.' })
        })
    }
}

exports.getWeather = (req, res, next) => {
    const day = req.params.day
    const month = req.params.month
    const year = req.params.year

    const date = new Date(year, month - 1, day)

    if (!(date instanceof Date && !isNaN(date))) {
        res.status(200).send({ success: false, content: 'Data inválida.' })
        return
    }

    if (Date.parse(date) > Date.parse(new Date())) {
        res.status(200).send({ success: false, content: 'Ainda não inventaram a máquina do tempo...' })
        return
    }
    
    weatherModel.find({ dateTime: { '$gte': date, '$lt': date.addDays(1) } }, { _id: 0, __v: 0 }).lean().exec((err, weatherList) => {
        if (err) {
            res.status(200).send({ success: false, content: `Não foi possível recuperar o histórico de dados meteorológicos para o dia ${day}/${month}/${year}.` })
            console.log(err)
        } else
            res.status(200).send({ success: true, content: weatherList.map(element => { element.dateTime = element.dateTime.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }); return element })})
    })
}

exports.getWeatherHistory = (req, res, next) => {
    weatherModel.find({  }, { _id: 0, __v: 0 }).sort({ dateTime: -1 }).lean().exec((err, weatherList) => {
        if (err) {
            res.status(200).send({ success: false, content: 'Não foi possível recuperar o histórico de dados meteorológicos.' })
            console.log(err)
        } else
            res.status(200).send({ success: true, content: weatherList.map(element => { element.dateTime = element.dateTime.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }); return element })})
    })
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}