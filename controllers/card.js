const Card = require("../models/card")

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) =>
      res.send(500, { message: `Произошла неизвестная ошибка ${err.name}` })
    )
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.send(400, { message: "Ошибка при отправке данных" })
        return
      }
      res.send(500, { message: `Произошла неизвестная ошибка ${err.name}` })
    })
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.send(404, { message: "Указаная карточка не найдена" })
        return
      }
      res.send(500, { message: `Произошла неизвестная ошибка ${err.name}` })
    })
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send({ likes: card.likes.length }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.send(400, { message: "Ошибка при отправке данных" })
        return
      }
      if (err.name === "CastError") {
        res.send(404, { message: "Пользователь не найден" })
        return
      }
      res.send(500, { message: `Произошла неизвестная ошибка ${err.name}` })
    })
}

module.exports.dislakeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send({ likes: card.likes.length }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.send(400, { message: "Ошибка при отправке данных" })
        return
      }
      if (err.name === "CastError") {
        res.send(404, { message: "Пользователь не найден" })
        return
      }
      res.send(500, { message: `Произошла неизвестная ошибка ${err.name}` })
    })
}
