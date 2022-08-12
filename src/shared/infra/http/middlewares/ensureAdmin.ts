import { Request, Response, NextFunction } from "express";

import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const userRepository = new UsersRepository();

  const user = await userRepository.findUserById(id);

  if (!user.isAdmin) {
    throw new AppError("User is not an administrator");
  }

  return next();
}
