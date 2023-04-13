const user = require("express").Router()

const {
  getUser,
  createUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require("../controllers/user")

user.get("/", getUser)
user.get("/:id", getUserById)
user.post("/", createUser)
user.patch("/me", updateUser)
user.patch("/me/avatar", updateAvatar)

module.exports = user
