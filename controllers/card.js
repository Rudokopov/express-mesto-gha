const Card = require("../models/card")
const mongoose = require("mongoose")
const { NotFound, BadRequestError } = require("../customErrors/customErrors")

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

    res.send(response)
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
    const response = await Card.findByIdAndRemove(id)
      .populate(["owner", "likes"])
      .then((card) => {
        if (!card.owner === userId) {
          throw new Error("У вас нет прав на это")
        }
      })
      .catch(next(err))
    if (!response) {
      throw new NotFound("Карточка с похожим ID не найдена")
    }
    res.send(response)
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError("Переданы некорректные данные"))
      return
    }
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
