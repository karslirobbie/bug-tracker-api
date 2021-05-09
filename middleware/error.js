
const winston = require('winston')

module.exports = function (err, req, res, next) {
  winston.loggers.get('errors').error(err.message)
  res.status(500).send(`Something went wrong. ${err}`)
}