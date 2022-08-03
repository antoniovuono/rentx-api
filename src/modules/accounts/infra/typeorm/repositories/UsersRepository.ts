import { Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICreateUsersDTO } from "../../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    id,
    name,
    email,
    password,
    driver_license,
    avatar,
  }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      email,
      password,
      driver_license,
      avatar,
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
