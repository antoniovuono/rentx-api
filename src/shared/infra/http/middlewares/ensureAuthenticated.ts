import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Error - Token missing from request", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "d041ef5adef06de7192e919281268875"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findUserById(user_id);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    throw new AppError("Not authorized - Invalid token", 401);
  }
}
