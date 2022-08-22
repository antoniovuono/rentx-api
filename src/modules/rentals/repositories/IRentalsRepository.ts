import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/entities/Rental";

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findRentalByCar(car_id: string): Promise<Rental>;
  findRentalByUsers(user_id: string): Promise<Rental[]>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
}

export { IRentalsRepository };
