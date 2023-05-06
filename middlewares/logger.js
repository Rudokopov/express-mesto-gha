// middlewares/logger.js

// импортируем нужные модули
const winston = require("winston")
const expressWinston = require("express-winston")

// Создадим logger запросов
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "request.log" })],
  format: winston.format.json(),
})

// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
  meta: true, // включите метаданные запроса, включая тело запроса
  msg: "HTTP {{req.method}} {{req.url}}",
})

module.exports = {
  requestLogger,
  errorLogger,
}
