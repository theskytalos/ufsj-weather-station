const express = require('express')
const router = express.Router()
const controller = require('../controllers/weatherController')

router.get('/', controller.getCurrentWeather)
router.put('/newWeather', controller.newWeather)
router.get('/getCurrentWeather', controller.getCurrentWeather)
router.get('/getWeather/:day/:month/:year', controller.getWeather)
router.get('/getWeatherHistory', controller.getWeatherHistory)

module.exports = router