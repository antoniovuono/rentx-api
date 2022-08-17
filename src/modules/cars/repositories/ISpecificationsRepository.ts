import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationsRepositoryDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ISpecificationsRepositoryDTO): Promise<void>;
  findBySpecificationName(name: string): Promise<Specification>;
  findById(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, ISpecificationsRepositoryDTO };
