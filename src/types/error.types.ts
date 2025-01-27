export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
  serializeErrors(): IError;
}

export interface IError {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
}
