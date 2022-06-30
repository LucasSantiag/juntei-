import * as functions from "firebase-functions";
import {BaseError} from "../models/Error";
import {NextFunction, Request, Response} from "express";

/**
 * Handle custom and unexpected errors.
 */
class ErrorHandler {
  /**
   *
   * @param {BaseError} err receives the custom error
   * @param {Response} res receives the response object
   */
  public async handleError(err: BaseError, res: Response): Promise<void> {
    functions.logger.error(
        "Error message from: ",
        err,
    );
    res.status(err.httpCode).send({message: err.message});
  }

  /**
   *
   * @param {Error} error receives the thrown in the app
   * @return {boolean} indicating if the error is customized or unexpected
   */
  public isTrustedError(error: Error): boolean {
    if (error instanceof BaseError) {
      return true;
    }
    return false;
  }
}

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const handler = new ErrorHandler();
  if (handler.isTrustedError(error)) {
    handler.handleError(error as BaseError, res);
  }
  next(error);
};
