import { HttpException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
const date = new Date();

export enum ErrorType {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
  NotAcceptableException,
  RequestTimeoutException,
  ConflictException,
  GoneException,
  HttpVersionNotSupportedException,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
  UnprocessableEntityException,
  InternalServerErrorException,
  NotImplementedException,
  ImATeapotException,
  MethodNotAllowedException,
  BadGatewayException,
  ServiceUnavailableException,
  GatewayTimeoutException,
  PreconditionFailedException,
}

export class ApplicationError extends HttpException {
  errorType: ErrorType;
  errorReference: string;
  errors: object;
  timestamp: string;
  statusCode: number;

  constructor(
    response: string,
    errorType: ErrorType,
    statusCode: number,
    errors: object = {},
  ) {
    // Ensure statusCode is provided as the first parameter
    super(response, statusCode);

    this.errorType = errorType;
    this.errorReference = uuidv4(); // Generates a unique ID for the error
    this.timestamp = date.toISOString();
    this.statusCode = statusCode;
    this.errors = response ? { message: [response] } : errors;
  }
}
