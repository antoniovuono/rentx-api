import { AppError } from "../../../../../shared/errors/AppError";
import { InMemoryCarsRepository } from "../../../repositories/in-memory/InMemoryCarsRepository";
import { CreateCarUseCase } from "../CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;

describe("Create car", () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    createCarUseCase = new CreateCarUseCase(inMemoryCarsRepository);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Example",
      description: "Car description example",
      daily_rate: 100,
      license_plate: "ABC-1322",
      fine_amount: 60,
      brand: "Brand Example",
      category_id: "category example",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with a same license_plate", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Example 1",
      description: "Car description example",
      daily_rate: 100,
      license_plate: "ABC-1322",
      fine_amount: 60,
      brand: "Brand Example",
      category_id: "category example",
    });

    await expect(
      createCarUseCase.execute({
        name: "Car Example 2",
        description: "Car description example",
        daily_rate: 100,
        license_plate: car.license_plate,
        fine_amount: 60,
        brand: "Brand Example",
        category_id: "category example",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("Should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Example 1",
      description: "Car description example",
      daily_rate: 100,
      license_plate: "ABCD-1322",
      fine_amount: 60,
      brand: "Brand Example",
      category_id: "category example",
    });

    expect(car.available).toBe(true);
  });
});
