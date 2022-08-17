import { AppError } from "../../../../../shared/errors/AppError";
import { InMemoryCarsRepository } from "../../../repositories/in-memory/InMemoryCarsRepository";
import { CreateCarSpecificationUseCase } from "../CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;

describe("Create car specification", () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      inMemoryCarsRepository
    );
  });

  it("Should be able to create a new specification to a non-existing car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["12345"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a new specification to the car", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car Example",
      description: "Car description example",
      daily_rate: 100,
      license_plate: "ABC-1322",
      fine_amount: 60,
      brand: "Brand Example",
      category_id: "category example",
    });

    const specifications_id = ["12345"];

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });
});
