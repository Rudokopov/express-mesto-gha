// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  "http://mesto-rudokopov.nomoredomains.monster",
  "https://mesto-rudokopov.nomoredomains.monster",
  "http://localhost:3000",
  "http://localhost:3002",
]

const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE"

// eslint-disable-next-line consistent-return
const checkCors = (req, res, next) => {
  const { method } = req
  const { origin } = req.headers
  const requestHeaders = req.headers["access-control-request-headers"]
  res.header("Access-Control-Allow-Credentials", true)
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin)
  }
  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS)
    res.header("Access-Control-Allow-Headers", requestHeaders)
    return res.end()
  }
  next()
}

// const checkCors = (req, res, next) => {
//   console.log(req.headers)
//   const { origin } = req.headers // Сохраняем источник запроса в переменную origin
//   const { method } = req // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
//   const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE" // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)

//   // проверяем, что источник запроса есть среди разрешённых
//   if (allowedCors.includes(origin)) {
//     // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
//     res.header("Access-Control-Allow-Origin", origin)
//   }
//   // Если это предварительный запрос, добавляем нужные заголовки
//   if (method === "OPTIONS") {
//     // разрешаем кросс-доменные запросы любых типов (по умолчанию)
//     res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS)
//     return res.end()
//   }
//   next()
// }

export default checkCors
