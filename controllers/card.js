const Card = require("../models/card")
const { NotFound, BadRequestErr } = require("../customErrors/customErrors")

module.exports.getCards = async (req, res, next) => {
  try {
    const response = await Card.find({})
    res.send(response)
  } catch (err) {
    next(err)
  }
}

module.exports.createCard = async (req, res, next) => {
  try {
    const id = req.user._id
    const { name, link } = req.body
    const response = await Card.create({ name, link, owner: id })
    res.send(response)
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new BadRequestErr("Переданы некорректные данные"))
      return
    }
    next(err)
  }
}

module.exports.deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await Card.findByIdAndRemove(id)
    if (!response) {
      throw new NotFound("Карточка с похожим ID не найдена")
    }
    res.send(response)
  } catch (err) {
    if (err.name === "CastError") {
      next(new BadRequestErr("Переданы некорректные данные"))
      return
    }
    next(err)
  }
}

module.exports.likeCard = async (req, res, next) => {
  try {
    const ownerId = req.user._id
    const { id } = req.params
    const response = await Card.findByIdAndUpdate(
      id,
      { $addToSet: { likes: ownerId } },
      { new: true }
    )
    if (!response) {
      throw new NotFound("Карточка с похожим ID не найдена")
    }
    res.send({ likes: response.likes.length })
  } catch (err) {
    if (err.name === "CastError") {
      next(new BadRequestErr("Переданы некорректные данные"))
      return
    }
    next(err)
  }
}

module.exports.dislakeCard = async (req, res, next) => {
  try {
    const ownerId = req.user._id
    const { id } = req.params
    const response = await Card.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    if (!response) {
      throw new NotFound("Карточка с похожим ID не найдена")
    }
    res.send({ likes: response.likes.length })
  } catch (err) {
    if (err.name === "CastError") {
      next(new BadRequestErr("Переданы некорректные данные"))
      return
    }
    next(err)
  }
}
