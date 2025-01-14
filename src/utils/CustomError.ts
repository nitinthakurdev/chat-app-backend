
export class CustomError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number = 500) {
      super(message);
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }
  
  
  export class NotFoundError extends CustomError {
    constructor(message: string = "Resource not found") {
      super(message, 404);
    }
  }
  
  
  export class ValidationError extends CustomError {
    constructor(message: string = "Validation error") {
      super(message, 400);
    }
  }
  