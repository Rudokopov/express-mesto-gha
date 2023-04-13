const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes/index")
const { errors } = require("celebrate")
const { handleErrors } = require("./middlewares/handleErrors")

const { PORT = 3000 } = process.env

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb://localhost:27017/mestodb")

app.use((req, res, next) => {
  req.user = {
    _id: "64369cda4d63fdeb810f9ed4",
  }
  next()
})

app.use(routes)

app.use(errors())
app.use(handleErrors)

app.listen(PORT, () => {
  console.log("Ссылка на сервер")
})
