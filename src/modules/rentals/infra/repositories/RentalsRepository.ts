import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
  findRentalByCar(car_id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
  findRentalByUsers(user_id: string): Promise<Rental[]> {
    throw new Error("Method not implemented.");
  }
  findOpenRentalByUser(user_id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
}

export { RentalsRepository };
