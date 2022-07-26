import { hash } from "bcryptjs";
import { injectable, inject } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
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
    email,
    password,
    driver_license,
  }: ICreateUsersDTO): Promise<void> {
    const emailAlreadyExists = await this.usersRepository.findUserByEmail(
      email
    );

    if (emailAlreadyExists) {
      throw new AppError(`Email already exists`);
    }

    const passwordHash = await hash(password, 8);

    this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
