const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const routes = require("./routes")
const { errors } = require("celebrate")
const { handleErrors } = require("./middlewares/handleErrors")

const { PORT = 3000 } = process.env

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb://localhost:27017/mestodb")
app.use(routes)

app.use((req, res, next) => {
  req.user = {
    _id: "64369cda4d63fdeb810f9ed4",
  }
  next()
})

app.use(errors())
app.use(handleErrors)

app.listen(PORT, () => {
  console.log("Ссылка на сервер")
})
