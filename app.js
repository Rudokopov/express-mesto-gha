import express from "express"
import mongoose from "mongoose"
import { router } from "./routes/index.js"
import celebrate from "celebrate"
import { handleErrors } from "./middlewares/handleErrors.js"
// import checkCors from "./middlewares/checkCORS.js"
import { PORT, DATA_BASE } from "./config.js"

import { requestLogger, errorLogger } from "./middlewares/logger.js"
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(DATA_BASE)

app.use(requestLogger)
// app.use(checkCors)
app.use(router)

app.use(errorLogger)
app.use(celebrate.errors())
app.use(handleErrors)

app.listen(PORT, () => {
  console.log("Ссылка на сервер")
})
