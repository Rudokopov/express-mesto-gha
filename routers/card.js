const router = require("express").Router()

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislakeCard,
} = require("../controllers/card")

router.get("/", getCards)
router.post("/", createCard)
router.delete("/:id", deleteCard)

router.put("/:id/likes", likeCard)
router.delete("/:id/likes", dislakeCard)

module.exports = router
