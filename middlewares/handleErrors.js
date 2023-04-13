function handleErrors(err, req, res, next) {
  const { statusCode = 500 } = err
  let { message } = err

  if (statusCode === 500) {
    message = "Внутренняя ошибка сервера"
  }

  res.send(statusCode, { message })
}

module.exports = { handleErrors }
