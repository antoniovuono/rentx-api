import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../infra/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class InMemoryRentalsRepository implements IRentalsRepository {
  rentals: Rental[] = [];

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      ...data,
      start_date: new Date(),
    });

    this.rentals.push(rental);
    return rental;
  }

  async findRentalByCar(car_id: string): Promise<Rental> {
    const rentalByCar = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );

    return rentalByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openRentalByUser = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );

    return openRentalByUser;
  }

  async findRentalByUsers(user_id: string): Promise<Rental[]> {
    const rentalsBuyUsers = this.rentals.filter(
      (rental) => rental.user_id === user_id
    );

    return rentalsBuyUsers;
  }

  async findById(id: string): Promise<Rental> {
    const rentalById = this.rentals.find(
      (rental) => rental.id === id && !rental.end_date
    );

    return rentalById;
  }

  async listByUser(user_id: string): Promise<Rental[]> {
    const rentalsBuyUsers = this.rentals.filter(
      (rental) => rental.user_id === user_id
    );

    return rentalsBuyUsers;
  }
}

export { InMemoryRentalsRepository };
