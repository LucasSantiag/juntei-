import {NextFunction, Request, Response} from "express";

const getAllLineups = async (req: Request, res: Response, next: NextFunction) => {}

const get = async (req: Request, res: Response, next: NextFunction) => {};

const getCurrentLineups = async (req: Request, res: Response, next: NextFunction) => {};

const getNextLineup = async (req: Request, res: Response, next: NextFunction) => {};

const getPreviousLineup = async (req: Request, res: Response, next: NextFunction) => {};

const create = async (req: Request, res: Response, next: NextFunction) => {};

const update = async (req: Request, res: Response, next: NextFunction) => {};

const approve = async (req: Request, res: Response, next: NextFunction) => {};

const decline = async (req: Request, res: Response, next: NextFunction) => {};

export default {
  getAllLineups,
  get,
  getCurrentLineups,
  getNextLineup,
  getPreviousLineup,
  create,
  update,
  approve,
  decline,
};
