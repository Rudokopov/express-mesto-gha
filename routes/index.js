const router = require("express").Router()
const { NotFound } = require("../customErrors/customErrors")

// Импорт контроллеров для карточек
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislakeCard,
} = require("../controllers/card")

// Импорт контроллеров для юзера
const {
  getUser,
  createUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require("../controllers/user")

// Роуты для карточек
router.get("/cards", getCards)
router.post("/cards", createCard)
router.delete("/cards/:id", deleteCard)
router.put("/cards/:id/likes", likeCard)
router.delete("/cards/:id/likes", dislakeCard)

// Роуты юзера
router.get("/user", getUser)
router.get("/user/:id", getUserById)
router.post("/user", createUser)
router.patch("/user/me", updateUser)
router.patch("/user/me/avatar", updateAvatar)

router.all("*", (req, res, next) => {
  next(new NotFound("Такого адреса не существует"))
})

module.exports = router
