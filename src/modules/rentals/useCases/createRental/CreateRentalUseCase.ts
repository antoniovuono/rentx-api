import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../infra/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const minimumRentalsTime = 24;

    const carIsUnavailable = await this.rentalsRepository.findRentalByCar(
      car_id
    );

    if (carIsUnavailable) {
      throw new AppError("Car is not available to rentals!", 400);
    }

    const userIsUnavailable = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (userIsUnavailable) {
      throw new AppError("there's a rental in progress for user", 400);
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
