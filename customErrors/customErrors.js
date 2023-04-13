class NotFound extends Error {
  constructor(message) {
    super(message)
    this.name = "Not Found"
    this.statusCode = 404
  }
}

class BadRequestErr extends Error {
  constructor(message) {
    super(message)
    this.name = "Bad request"
    this.statusCode = 400
  }
}

module.exports = { NotFound, BadRequestErr }
