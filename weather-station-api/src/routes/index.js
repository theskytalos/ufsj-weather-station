const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "UFSJ Weather Station API",
        version: "0.9.0"
    })
})

module.exports = router