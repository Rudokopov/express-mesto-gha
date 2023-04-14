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

// Убился об написание функции для объеденения логики, думаю проблема в алгоритме который я пытаюсь реализовать
// Функция получает на вход определенные параметры имя, о себе, аватарка, id юзака и делает запрос в БД, при ошибке возвращает return(err)
// Функция обновления аватарки которая собирает данные с req и отправляет их в основную функцию которая их обновляет
// Функция обновления имени и о себе, работает по тому же алгоритму что и выше

/* Возникла проблема с передачей данных запроса в мейн функцию (те я делаю const updateUserNameAndBio = (req, res, next) => {
  let data = {name: req.body.name, about: req.body.about}
  // Вызываю мейн функцию где аргументом передаю дату
  return mainFunctionOfRequest.call(data)
  // Логика работы осовной функции изменена, так что при получении данных они передаются в запрос к БД в виде this.name, this.about, this.avatar
  // Первая проблема возникла с undefined которые выбрасываются в мейн функции при получении data, но когда отправляю их в виде mainFunctionOfRequest(data)
  // Проблема уходит, но появляется следующая с next, next is not a function
  // Не смог победить, если у вас есть возможность дать мне больше подсказок или материала, я буду очень вам благодарен, спрашивал в группе, куратора, ответа пока не получил
  // Но т.к сегодня ласт день на сдачу, и стартует новый спринт, я решил отправить вам в таком виде.
})

*/

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
