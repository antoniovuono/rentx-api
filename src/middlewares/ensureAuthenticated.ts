import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

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
    throw new Error("Token missing from request");
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
      throw new Error("User does not exists");
    }

    next();
  } catch (err) {
    throw new Error("Invalid token");
  }
}
