import { Specification } from "../model/Specification";
import {
  ISpecificationsRepository,
  ISpecificationsRepositoryDTO,
} from "./ISpecificationsRepository";

class SpecificationsReposiroty implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ISpecificationsRepositoryDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  findBySpecificationName(name: string): Specification {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}

export { SpecificationsReposiroty };
