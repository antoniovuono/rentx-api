import { Repository } from "typeorm";

import { AppDataSource } from "../../../../shared/infra/typeorm";
import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = AppDataSource.getRepository(Rental);
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const createRental = this.repository.create(data);

    await this.repository.save(createRental);

    return createRental;
  }

  async findRentalByCar(car_id: string): Promise<Rental> {
    const searchByCar = await this.repository.findOneBy({ car_id });

    return searchByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rentalByUsers = await this.repository.findOneBy({ user_id });

    return rentalByUsers;
  }

  async findRentalByUsers(user_id: string): Promise<Rental[]> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
}

export { RentalsRepository };
