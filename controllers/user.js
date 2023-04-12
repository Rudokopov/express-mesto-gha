const User = require("../models/user")
const { errChecker } = require("../models/errors")

module.exports.getUser = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => errChecker(err, res))
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => errChecker(err, res))
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => errChecker(err, res))
}

module.exports.updateUser = (req, res) => {
  const { name, about, id } = req.body

  User.findByIdAndUpdate(
    req.user._id,
    { name, about, id },
    { new: true, runValidators: true, upsert: true }
  )
    .then(() => res.send({ data: name, about }))
    .catch((err) => errChecker(err, res))
}

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: true }
  )
    .then(() => res.send({ data: avatar }))
    .catch((err) => errChecker(err, res))
}
