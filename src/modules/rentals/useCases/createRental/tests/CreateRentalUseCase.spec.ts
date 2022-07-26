import dayjs from "dayjs";

import { DayjsDateProvider } from "../../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../../shared/errors/AppError";
import { InMemoryCarsRepository } from "../../../../cars/repositories/in-memory/InMemoryCarsRepository";
import { InMemoryRentalsRepository } from "../../../repositories/in-memory/InMemoryRentalsRepository";
import { CreateRentalUseCase } from "../CreateRentalUseCase";

describe("Create a rental", () => {
  let createRentalUseCase: CreateRentalUseCase;
  let inMemoryRentalsRepository: InMemoryRentalsRepository;
  let inMemoryCarsRepository: InMemoryCarsRepository;
  let dayjsDateProvider: DayjsDateProvider;

  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    inMemoryCarsRepository = new InMemoryCarsRepository();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      inMemoryRentalsRepository,
      dayjsDateProvider,
      inMemoryCarsRepository
    );
  });

  it("Should be able to create a new rental", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "test",
      description: "Car description test",
      daily_rate: 100,
      license_plate: "CFS-123",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if user is already opened a rental.", async () => {
    await inMemoryRentalsRepository.create({
      car_id: "1111",
      expected_return_date: dayAdd24Hours,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "CAR111",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("there's a rental in progress for user"));
  });

  it("Should not be able to create a new rental if car is already used by another rental", async () => {
    await inMemoryRentalsRepository.create({
      car_id: "test",
      expected_return_date: dayAdd24Hours,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is not available to rentals!"));
  });

  it("Should not be able to create a new rental with a invalid return date", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "CAR123",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return date"));
  });
});
