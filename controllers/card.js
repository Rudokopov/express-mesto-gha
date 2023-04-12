const Card = require("../models/card")
const { errChecker } = require("../models/errors")

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => errChecker(err, res))
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => errChecker(err, res))
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => errChecker(err, res))
  return
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send({ likes: card.likes.length }))
    .catch((err) => errChecker(err, res))
}

module.exports.dislakeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send({ likes: card.likes.length }))
    .catch((err) => errChecker(err, res))
}
