import { Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/typeorm";
import {
  ISpecificationsRepository,
  ISpecificationsRepositoryDTO,
} from "../../../repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";

class SpecificationsReposiroty implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ISpecificationsRepositoryDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findBySpecificationName(name: string): Promise<Specification> {
    const specification = await this.repository.findOneBy({ name });

    return specification;
  }
}

export { SpecificationsReposiroty };
