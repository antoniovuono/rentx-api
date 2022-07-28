import { injectable, inject } from "tsyringe";

import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    username,
    email,
    password,
    driver_license,
  }: ICreateUsersDTO): Promise<void> {
    const usernameAlreadyExists = await this.usersRepository.findUserByUsername(
      username
    );

    const emailAlreadyExists = await this.usersRepository.findUserByEmail(
      email
    );

    if (usernameAlreadyExists) {
      throw new Error(`Username:${username} already exists`);
    }
    if (emailAlreadyExists) {
      throw new Error(`Email:${email} already exists`);
    }

    this.usersRepository.create({
      name,
      username,
      email,
      password,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
