const express = require('express')
const router = express.Router()
const controller = require('../controllers/weatherController')

router.get('/', controller.getCurrentWeather)
router.put('/new', controller.newWeather)
router.get('/getCurrent', controller.getCurrentWeather)
router.get('/get/:day/:month/:year', controller.getWeather)
router.get('/getHistory', controller.getWeatherHistory)

module.exports = router