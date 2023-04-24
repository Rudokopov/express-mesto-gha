const jwt = require("jsonwebtoken")
module.exports.checkAuth = async (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s/, "")
  try {
    if (!token) {
      throw new Error("У вас нет доступа")
    }

    const decoded = jwt.verify(token, "secret-key-word")
    console.log(decoded)
    req.userId = decoded._id
    next()
  } catch (err) {
    next(err)
    return
  }
}
