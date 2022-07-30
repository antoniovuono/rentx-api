import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    });

    await this.repository.save(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });
    return user;
  }
}

export { UsersRepository };
