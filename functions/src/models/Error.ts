export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

/**
 * Custom error object
 */
export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;

  /**
   * Construtor of BaseError
   * @param {string} name represents the error name
   * @param {HttpStatusCode} httpCode represents the error http status
   * @param {string} description erro description to compose error message
   */
  constructor(name: string, httpCode: HttpStatusCode, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}

/**
 * CustomError class for Internal Server Error
 */
export class APIError extends BaseError {
  /**
   *
   * @param {string} description error description
   */
  constructor(description: string) {
    super("INTERNAL SERVER ERROR", HttpStatusCode.INTERNAL_SERVER, description);
  }
}

/**
 * CustomError class for Entity not Found
 */
export class NotFoundError extends BaseError {
  /**
   * Not found error constructor
   */
  constructor() {
    super("NOT FOUND", HttpStatusCode.NOT_FOUND, "Entity not found");
  }
}

/**
 * CustomError class for Bad Request
 */
export class MalformedBodyError extends BaseError {
  /**
   * Malformd error constructor
   */
  constructor() {
    super("MALFORMED BODY", HttpStatusCode.BAD_REQUEST, "Malformed body request");
  }
}

/**
 * CustomError class for Invalid token in relationship
 */
export class InvalidTokenError extends BaseError {
  /**
   * Invalid token error constructor
   */
  constructor() {
    super("INVALID TOKEN", HttpStatusCode.BAD_REQUEST, "Token is invalid, generate again");
  }
}

