const User = require("../models/user")

module.exports.getUser = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) =>
      res.send(500, { message: `Произошла неизвестная ошибка ${err.name}` })
    )
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.send(404, { message: "Пользователь не найден" })
        return
      }
      res.send(500, { message: `Произошла неизвестная ошибка ${err.name}` })
    })
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.send(400, { message: "Ошибка при отправке данных" })
        return
      }
      res.send(500, { message: `Произошла неизвестная ошибка ${err.name}` })
    })
}

module.exports.updateUser = (req, res) => {
  const { name, about, id } = req.body

  User.findByIdAndUpdate(
    req.user._id,
    { name, about, id },
    { new: true, runValidators: true, upsert: true }
  )
    .then(() => res.send({ data: name, about }))
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

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: true }
  )
    .then(() => res.send({ data: avatar }))
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
