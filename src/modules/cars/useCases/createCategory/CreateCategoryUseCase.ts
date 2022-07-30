import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists =
      await this.categoriesRepository.findByCategoryName(name);

    if (categoryAlreadyExists) {
      throw new AppError(`Category ${name} already exists`);
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
