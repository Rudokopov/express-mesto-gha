// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  "http://mesto-rudokopov.nomoredomains.monster",
  "https://mesto-rudokopov.nomoredomains.monster",
  "localhost:3000",
]

const checkCors = (req, res, next) => {
  const { origin } = req.headers // Сохраняем источник запроса в переменную origin
  const { method } = req // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE" // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header("Access-Control-Allow-Origin", origin)
  }
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === "OPTIONS") {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS)
    return res.end()
  }

  next()
}

export default checkCors
