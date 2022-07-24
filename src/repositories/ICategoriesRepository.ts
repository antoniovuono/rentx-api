import { Category } from "../model/Category";

interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create(name: string, description: string): void;
}

export { ICategoriesRepository };
