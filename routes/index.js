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
router.get("/users", getUser)
router.get("/users/:id", getUserById)
router.post("/users", createUser)
router.patch("/users/me", updateUser)
router.patch("/users/me/avatar", updateAvatar)

router.all("*", (req, res, next) => {
  next(new NotFound("Такого адреса не существует"))
})

module.exports = router
