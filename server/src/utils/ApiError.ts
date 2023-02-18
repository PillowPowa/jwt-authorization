import {StatusCode} from './types/StatusCode';
import type {APIErrorJSON} from './types/AuthorizationTypes';
import type {ValidationError} from 'express-validator';

@Log
export default class ApiError extends Error {
  public readonly code: StatusCode;
  public readonly createdAt: Date = new Date();
  public readonly errors: ValidationError[];

  static unhandledError() {
    return new ApiError(
      StatusCode.INTERNAL_SERVER_ERROR,
      'Unhandled error occured!'
    );
  }
  constructor(
    code: StatusCode,
    message: string,
    errors: ValidationError[] = []
  ) {
    super(message);
    this.code = code;
    this.errors = errors;
  }
  public toJSON(): APIErrorJSON {
    return {
      message: this.message,
      errors: this.errors,
    };
  }
}

function Log(constructor: Function) {
  console.log('Constructor', constructor);
}
