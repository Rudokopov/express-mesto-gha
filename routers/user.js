const express = require("express")
const router = express.Router()
const {
  getUser,
  createUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require("../controllers/user")

router.get("/", getUser)
router.get("/:id", getUserById)
router.post("/", createUser)
router.patch("/me", updateUser)
router.patch("/me/avatar", updateAvatar)

module.exports = router
