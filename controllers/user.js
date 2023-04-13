const User = require("../models/user")
const mongoose = require("mongoose")
const { NotFound, BadRequestError } = require("../customErrors/customErrors")

module.exports.getUser = async (req, res, next) => {
  try {
    const response = await User.find({})
    res.send(response)
  } catch (err) {
    next(err)
  }
}

module.exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await User.findById(id)

    if (!response) {
      throw new NotFound("Пользователь с похожим id не найден")
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

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, about, avatar } = req.body
    const response = await User.create({ name, about, avatar })
    res.send(201, {
      data: response,
    })
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError("Переданы некорректные данные"))
      return
    }
    next(err)
  }
}

module.exports.updateUser = async (req, res, next) => {
  try {
    const id = req.user._id
    const { name, about } = req.body
    const response = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true, runValidators: true }
    )
    if (!response) {
      next(new NotFound("Пользователь с похожим ID не найден"))
      return
    }
    res.send(response)
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError("Переданы некорректные данные"))
      return
    }
    next(err)
  }
}

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const id = req.user._id
    const { avatar } = req.body
    const response = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true, runValidators: true }
    )
    if (!response) {
      next(new NotFound("Пользователь с похожим ID не найден"))
      return
    }
    res.send({ avatar: response.avatar })
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError("Переданы некорректные данные"))
      return
    }
    next(err)
  }
}
