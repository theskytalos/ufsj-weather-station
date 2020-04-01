const mongoose = require('mongoose')

let weatherBuffer = []

const weatherSchema = mongoose.Schema({
    dateTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    temp: {
        type: Number,
        required: true
    },
    umidity: {
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

exports.newWeather = (req, res, next) => {
    console.log(req.body)
    const weather = Object.assign({}, req.body)

    weatherModel.create(weather, (err, stocks) => {
        if (err) {
            res.status(200).send({ success: false, content: 'Não foi possível persistir os dados meteorológicos.' })
            console.log(err)
        } else
            res.status(200).send({ success: true, content: 'Dados meteorológicos persistidos com sucesso.' })
    })

    weatherBuffer = [weather.dateTime, weather.temp, weather.umidity, weather.raining, weather.uvIndex]
}

exports.getCurrentWeather = (req, res, next) => {
    if (weatherBuffer.length != 0)
        res.status(200).send({ success: true, content: { weather: { dateTime: weatherBuffer.dateTime, temp: weatherBuffer.temp, umidity: weatherBuffer.umidity, raining: weatherBuffer.raining, uvIndex: weatherBuffer.uvIndex } } })
    else {
        weatherModel.findOne({}, {}, { sort: { 'dateTime': -1 } }, (err, weather) => {
            if (err) {
                res.status(200).send({ success: false, content: 'Não foi possível recuperar os dados meteorológicos.' })
                console.log(err)
            } else
                if (weather) {
                    res.status(200).send({ success: true, content: { weather: { dateTime: weather.dateTime, temp: weather.temp, umidity: weather.umidity, raining: weather.raining, uvIndex: weather.uvIndex } } })
                } else
                    res.status(200).send({ success: false, content: 'Não foi possível recuperar os dados meteorológicos.' })
        })
    }
}

exports.getWeather = (req, res, next) => {
    const day = req.params.day
    const month = req.params.month
    const year = req.params.year

    const date = new Date(year, month, day)

    weatherModel.find({ dateTime: date }, (err, weatherList) => {
        if (err) {
            res.status(200).send({ success: false, content: `Não foi possível recuperar o histórico de dados meteorológicos para o dia ${day}/${month}/${year}.` })
            console.log(err)
        } else
            res.status(200).send({ success: true, content: weatherList })
    })
}

exports.getWeatherHistory = (req, res, next) => {
    weatherModel.find({}, (err, weatherList) => {
        if (err) {
            res.status(200).send({ success: false, content: 'Não foi possível recuperar o histórico de dados meteorológicos.' })
            console.log(err)
        } else
            res.status(200).send({ success: true, content: weatherList })
    })
}