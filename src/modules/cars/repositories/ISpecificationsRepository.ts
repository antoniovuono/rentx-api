import { Specification } from "../model/Specification";

interface ISpecificationsRepositoryDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ISpecificationsRepositoryDTO): void;
  findBySpecificationName(name: string): Specification;
}

export { ISpecificationsRepository, ISpecificationsRepositoryDTO };
