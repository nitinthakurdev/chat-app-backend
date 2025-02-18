import { StatusCodes } from 'http-status-codes';
export class CustomError extends Error {
    comingFrom;
    constructor(message, comingFrom) {
        super(message);
        this.comingFrom = comingFrom;
    }
    serializeErrors() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            status: this.status,
            comingFrom: this.comingFrom,
        };
    }
}
export class BadRequestError extends CustomError {
    statusCode = StatusCodes.BAD_REQUEST;
    status = 'error';
    constructor(message, comingFrom) {
        super(message, comingFrom);
    }
}
export class NotFoundError extends CustomError {
    statusCode = StatusCodes.NOT_FOUND;
    status = 'error';
    constructor(message, comingFrom) {
        super(message, comingFrom);
    }
}
export class NotAuthorizedError extends CustomError {
    statusCode = StatusCodes.UNAUTHORIZED;
    status = 'error';
    constructor(message, comingFrom) {
        super(message, comingFrom);
    }
}
export class FileTooLargeError extends CustomError {
    statusCode = StatusCodes.REQUEST_TOO_LONG;
    status = 'error';
    constructor(message, comingFrom) {
        super(message, comingFrom);
    }
}
export class ServerError extends CustomError {
    statusCode = StatusCodes.SERVICE_UNAVAILABLE;
    status = 'error';
    constructor(message, comingFrom) {
        super(message, comingFrom);
    }
}
