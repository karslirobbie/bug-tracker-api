const winston = require('winston')
const { format } = winston;
const { combine, label, timestamp, printf, prettyPrint, colorize } = format;
require('winston-mongodb')
require('express-async-errors')


module.exports = () => {
  const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
  })

  winston.loggers.add('errors', {
    format: combine(label({ label: 'Errors' }), timestamp(), colorize(), prettyPrint(), logFormat),
    transports: [
      new winston.transports.File({ filename: 'error.log' }),
      new winston.transports.MongoDB({ db: "mongodb://localhost:27017/bug-tracker", level: 'error' })
    ],
    exceptionHandlers: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'exceptions.log' })
    ],
    rejectionHandlers: [
      new winston.transports.File({ filename: 'rejections.log' })
    ]
  })

}