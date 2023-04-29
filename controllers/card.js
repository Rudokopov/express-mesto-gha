const Card = require("../models/card")
const mongoose = require("mongoose")
const {
  NotFound,
  BadRequestError,
  AccessError,
} = require("../customErrors/customErrors")

module.exports.getCards = async (req, res, next) => {
  try {
    const response = await Card.find({}).populate(["owner", "likes"])
    res.send(response)
  } catch (err) {
    next(err)
  }
}

module.exports.createCard = async (req, res, next) => {
  try {
    const id = req.userId
    const { name, link } = req.body
    const response = await (
      await Card.create({ name, link, owner: id })
    ).populate(["owner"])

    res.send(201, response)
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError("Переданы некорректные данные"))
      return
    }
    next(err)
  }
}

module.exports.deleteCard = async (req, res, next) => {
  try {
    const userId = req.userId
    const { id } = req.params
    const card = await Card.findById(id).populate(["owner", "likes"])
    if (!card) {
      throw new NotFound("Карточка с таким ID не найдена")
    }
    if (card.owner.id === userId) {
      const response = await Card.findOneAndDelete(card).populate([
        "owner",
        "likes",
      ])
      res.send(201, response)
    }
    throw new AccessError("У вас нет на это прав")
  } catch (err) {
    next(err)
  }
}

module.exports.likeCard = async (req, res, next) => {
  try {
    const ownerId = req.userId
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
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError("Переданы некорректные данные"))
      return
    }
    next(err)
  }
}

module.exports.dislakeCard = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await Card.findByIdAndUpdate(
      id,
      { $pull: { likes: req.userId } },
      { new: true }
    )
    if (!response) {
      throw new NotFound("Карточка с похожим ID не найдена")
    }
    res.send({ likes: response.likes.length })
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError("Переданы некорректные данные"))
      return
    }
    next(err)
  }
}
