import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class InMemoryCarsRepository implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const carAlreadyExists = this.cars.find(
      (car) => car.license_plate === license_plate
    );

    return carAlreadyExists;
  }

  async list(): Promise<Car[]> {
    const carList = await this.cars.filter((car) => car.available === true);
    return carList;
  }
}

export { InMemoryCarsRepository };
