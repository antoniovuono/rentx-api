import { inject, injectable } from "tsyringe";

import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  name?: string;
  brand?: string;
}

@injectable()
class ListCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ name, brand, category_id }: IRequest): Promise<Car[]> {
    const car = await this.carsRepository.list(name, brand, category_id);

    return car;
  }
}

export { ListCarsUseCase };
