const Joi = require('joi')

const weatherValidationSchema = Joi.object({
    temp: Joi.number()
        .min(-40)
        .max(80)
        .required()
        .messages({
            'number.base': 'O campo "temp" deve ser numérico.',
            'number.min': 'O campo "temp" não pode ser menor do que -40.',
            'number.max': 'O campo "temp" não pode ser maior do que 80.',
            'any.required': 'O campo "temp" é obrigatório.'
        }),
    humidity: Joi.number()
        .min(0)
        .max(100)
        .required()
        .messages({
            'number.base': 'O campo "humidity" deve ser numérico.',
            'number.min': 'O campo "humidity" não pode ser menor do que 0.',
            'number.max': 'O campo "humidity" não pode ser maior do que 100.',
            'any.required': 'O campo "humidity" é obrigatório.'
        }),
    raining: Joi.boolean()
        .required()
        .messages({
            'boolean.base': 'O campo "raining" deve ser booleano.',
            'any.required': 'O campo "raining" é obrigatório.'
        }),
    uvIndex: Joi.number()
        .min(0)
        .max(5)
        .required()
        .messages({
            'number.base': 'O campo "uvIndex" deve ser numérico.',
            'number.min': 'O campo "uvIndex" não pode ser menor do que 0.',
            'number.max': 'O campo "uvIndex" não pode ser maior do que 5.',
            'any.required': 'O campo "uvIndex" é obrigatório.'
        })
})

module.exports = { weatherValidationSchema }