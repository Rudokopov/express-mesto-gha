class NotFound extends Error {
  constructor(message) {
    super(message)
    this.name = "NotFound"
    this.statusCode = 404
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = "CastError"
    this.statusCode = 400
  }
}

module.exports = { NotFound, BadRequestError }
