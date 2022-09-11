import { IsNull, Repository } from "typeorm";

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
    const searchByCar = await this.repository.findOneBy({
      car_id,
      end_date: IsNull(),
    });

    return searchByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rentalByUsers = await this.repository.findOneBy({
      user_id,
      end_date: IsNull(),
    });

    return rentalByUsers;
  }

  async findById(id: string): Promise<Rental> {
    const rentalById = await this.repository.findOneBy({ id });

    return rentalById;
  }

  async listByUser(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.repository.find({
      where: { user_id },
      relations: ["car"],
    });

    return rentalsByUser;
  }
}

export { RentalsRepository };
