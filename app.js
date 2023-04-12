const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const { PORT = 3000 } = process.env
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb://localhost:27017/mestodb")

app.use((req, res, next) => {
  req.user = {
    _id: "64369cda4d63fdeb810f9ed4", // вставьте сюда _id созданного в предыдущем пункте пользователя
  }
  next()
})
app.use("/users", require("./routers/user"))
app.use("/cards", require("./routers/card"))

app.listen(PORT, () => {
  console.log("Ссылка на сервер")
})
