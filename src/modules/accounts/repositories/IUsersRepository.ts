import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>;
  findUserByEmail(email: string): Promise<User>;
  findUserById(id: string): Promise<User>;
}

export { IUsersRepository };
