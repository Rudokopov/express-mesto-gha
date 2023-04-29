import express from "express"
import mongoose from "mongoose"
import { router } from "./routes/index.js"
import celebrate from "celebrate"
import { handleErrors } from "./middlewares/handleErrors.js"
import { PORT, DATA_BASE } from "./config.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(DATA_BASE)

app.use(router)

app.use(celebrate.errors())
app.use(handleErrors)

app.listen(PORT, () => {
  console.log("Ссылка на сервер")
})
