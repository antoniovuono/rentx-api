import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>;
  findUserByUsername(username: string): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
