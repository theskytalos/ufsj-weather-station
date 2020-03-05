const express = require('express')
const router = express.Router()
const controller = require('../controllers/weatherController')

router.get('/', controller.getCurrentWeather)
router.get('/getCurrentWeather', controller.getCurrentWeather)
router.get('/getWeather/:day/:month/:year', controller.getWeather)
router.get('/getAllWeather', controller.getWeatherHistory)
router.get('/newWeather', controller.newWeather)

module.exports = router