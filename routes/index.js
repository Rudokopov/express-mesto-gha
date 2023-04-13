const router = require("express").Router()
const { NotFound } = require("../customErrors/customErrors")

router.all("*", (req, res, next) => {
  next(new NotFound("Неверный адрес запроса"))
})

module.exports = router
