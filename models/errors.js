const { models } = require("mongoose")

const errChecker = (err, res) => {
  if (err.name === "ValidationError") {
    return res.send(400, { message: "Ошибка при отправке данных" })
  }
  if (err.name === "CastError") {
    return res.send(404, { message: "Пользователь или карточка не найдена" })
  }

  return res.send(500, { message: "Неизвестная ошибка" })
}

module.exports = { errChecker }
