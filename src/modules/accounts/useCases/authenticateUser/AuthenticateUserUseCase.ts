import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }
    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, "d041ef5adef06de7192e919281268875", {
      subject: user.id,
      expiresIn: "1d",
    });

    const authenticateSessionResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return authenticateSessionResponse;
  }
}

export { AuthenticateUserUseCase };
