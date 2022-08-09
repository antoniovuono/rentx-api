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
    await createCarUseCase.execute({
      name: "Car Example",
      description: "Car description example",
      daily_rate: 100,
      license_plate: "ABC-1322",
      fine_amount: 60,
      brand: "Brand Example",
      category_id: "category example",
    });
  });
});
