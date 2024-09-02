class CustomError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

class CustomValidationError extends Error {
    constructor(message, statusCode) {
        super()
        this.message = message.map((item) => {
            return item.msg
        }).join(" | ")
        this.statusCode = statusCode
    }
}

module.exports = {CustomError, CustomValidationError}