import { verify } from "jsonwebtoken";
import { inject } from "tsyringe";

import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

class refreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  execute(token: string) {}
}

export { refreshTokenUseCase };
