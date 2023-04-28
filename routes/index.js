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

// Импорт контроллера ошибок
const {
  validateRegister,
  validateLogin,
  validateCreateCard,
  validateId,
  validateCardId,
  validateProfile,
  validateAvatar,
} = require("../middlewares/handleErrors")

const { checkAuth } = require("../middlewares/auth")

// Роуты для карточек
router.get("/cards", checkAuth, getCards)
router.post("/cards", checkAuth, validateCreateCard, createCard)
router.delete("/cards/:id", checkAuth, validateCardId, deleteCard)
router.put("/cards/:id/likes", checkAuth, validateCardId, likeCard)
router.delete("/cards/:id/likes", checkAuth, validateCardId, dislakeCard)

// Роуты юзера
router.get("/users/me", checkAuth, getUserMe)
router.get("/users", checkAuth, getUser)
router.get("/users/:id", checkAuth, validateId, getUserById)
router.post("/signup", validateRegister, createUser)
router.post("/signin", validateLogin, login)
router.patch("/users/me", checkAuth, validateProfile, updateUser)
router.patch("/users/me/avatar", checkAuth, validateAvatar, updateAvatar)

router.all("*", (req, res, next) => {
  next(new NotFound("Такого адреса не существует"))
})

module.exports = router
