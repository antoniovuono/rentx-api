import { Category } from "../../infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class InMemoryCategoriesRepository implements ICategoriesRepository {
  categories: Category[] = [];

  async findByCategoryName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
  async list(): Promise<Category[]> {
    const categoriesList = this.categories;

    return categoriesList;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categories.push(category);
  }
}

export { InMemoryCategoriesRepository };
