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
  login,
  getUserById,
  getUserMe,
  updateUser,
  updateAvatar,
} = require("../controllers/user")

const { checkAuth } = require("../middlewares/auth")

// Роуты для карточек
router.get("/cards", checkAuth, getCards)
router.post("/cards", checkAuth, createCard)
router.delete("/cards/:id", checkAuth, deleteCard)
router.put("/cards/:id/likes", checkAuth, likeCard)
router.delete("/cards/:id/likes", checkAuth, dislakeCard)

// Роуты юзера
router.get("/users/me", checkAuth, getUserMe)
router.get("/users", checkAuth, getUser)
router.get("/users/:id", checkAuth, getUserById)
router.post("/signup", createUser)
router.post("/signin", login)
router.patch("/users/me", checkAuth, updateUser)
router.patch("/users/me/avatar", checkAuth, updateAvatar)

router.all("*", (req, res, next) => {
  next(new NotFound("Такого адреса не существует"))
})

module.exports = router
