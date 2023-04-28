const jwt = require("jsonwebtoken")
const { NoAccessError } = require("../customErrors/customErrors")

module.exports.checkAuth = async (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s/, "")
  try {
    const decoded = jwt.verify(token, "secret-key-word")
    req.userId = decoded._id
    next()
  } catch (err) {
    next(new NoAccessError("У вас нет доступа"))
    return
  }
}
