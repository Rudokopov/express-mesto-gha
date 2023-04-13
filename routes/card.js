const card = require("express").Router()

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislakeCard,
} = require("../controllers/card")

card.get("/", getCards)
card.post("/", createCard)
card.delete("/:id", deleteCard)

card.put("/:id/likes", likeCard)
card.delete("/:id/likes", dislakeCard)

module.exports = card
