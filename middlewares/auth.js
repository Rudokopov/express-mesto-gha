const jwt = require("jsonwebtoken")
const { ReferenceError } = require("../customErrors/customErrors")

module.exports.checkAuth = async (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s/, "")
  try {
    const decoded = jwt.verify(token, "secret-key-word")
    req.userId = decoded._id
    next()
  } catch (err) {
    next(new ReferenceError("У вас нет доступа"))
    return
  }
}
