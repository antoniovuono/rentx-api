import { In, Repository } from "typeorm";

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
  }: ISpecificationsRepositoryDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findBySpecificationName(name: string): Promise<Specification> {
    const specification = await this.repository.findOneBy({ name });

    return specification;
  }

  async findById(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findBy({ id: In([ids]) });

    return specifications;
  }
}

export { SpecificationsReposiroty };
