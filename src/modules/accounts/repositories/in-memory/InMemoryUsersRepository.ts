import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class InMemoryUsersRepository implements IUsersRepository {
  users: User[] = [];

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUsersDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });

    this.users.push(user);
  }
  async findUserByEmail(email: string): Promise<User> {
    const userByEmail = this.users.find((user) => user.email === email);

    return userByEmail;
  }
  async findUserById(id: string): Promise<User> {
    const userById = this.users.find((user) => user.id === id);

    return userById;
  }
}

export { InMemoryUsersRepository };
