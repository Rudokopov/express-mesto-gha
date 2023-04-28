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

class NoAccessError extends Error {
  constructor(message) {
    super(message)
    this.name = "ReferenceError"
    this.statusCode = 401
  }
}

class UniqueError extends Error {
  constructor(message) {
    super(message)
    this.name = "UniqueError"
    this.statusCode = 409
  }
}

module.exports = { NotFound, BadRequestError, NoAccessError, UniqueError }
