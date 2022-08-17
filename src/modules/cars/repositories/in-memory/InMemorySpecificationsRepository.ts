import { Specification } from "../../infra/typeorm/entities/Specification";
import {
  ISpecificationsRepository,
  ISpecificationsRepositoryDTO,
} from "../ISpecificationsRepository";

class InMemorySpecificationsRepository implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ISpecificationsRepositoryDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);
  }

  async findBySpecificationName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }

  async findById(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return allSpecifications;
  }
}

export { InMemorySpecificationsRepository };
