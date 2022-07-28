import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}
interface ICategoriesRepository {
  findByCategoryName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
