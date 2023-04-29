const { Joi, celebrate } = require("celebrate")

const checkLink =
  /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/

module.exports.handleErrors = (err, req, res, next) => {
  const { statusCode = 500 } = err
  let { message } = err

  if (statusCode === 500) {
    message = "Внутренняя ошибка сервера"
  }

  res.send(statusCode, { message })
}

module.exports.validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),

    avatar: Joi.string().pattern(checkLink),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
})

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
})

module.exports.validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(checkLink),
  }),
})

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
})

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
})

module.exports.validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
})

module.exports.validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(checkLink),
  }),
})
