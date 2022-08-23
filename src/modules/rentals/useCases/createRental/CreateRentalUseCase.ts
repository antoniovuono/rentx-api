import "reflect-metadata";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../infra/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

dayjs.extend(utc);

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

    const expectedReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format();

    const dateNow = dayjs().utc().local().format();

    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");

    if (compare < minimumRentalsTime) {
      throw new AppError("Invalid return date", 400);
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
