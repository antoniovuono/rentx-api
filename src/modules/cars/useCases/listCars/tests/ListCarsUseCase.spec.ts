import { InMemoryCarsRepository } from "../../../repositories/in-memory/InMemoryCarsRepository";
import { ListCarsUseCase } from "../ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;

describe("List cars", () => {
  inMemoryCarsRepository = new InMemoryCarsRepository();
  listCarsUseCase = new ListCarsUseCase(inMemoryCarsRepository);

  it("Should be able to list all available cars", async () => {
    await inMemoryCarsRepository.create({
      name: "Car Example 2",
      description: "Car description example",
      daily_rate: 100,
      license_plate: "ABC-1322",
      fine_amount: 60,
      brand: "Brand Example",
      category_id: "category example",
    });

    await inMemoryCarsRepository.create({
      name: "Car Example 1",
      description: "Car description example",
      daily_rate: 100,
      license_plate: "ABC-1322",
      fine_amount: 60,
      brand: "Brand Example",
      category_id: "category example",
    });
    const cars = await listCarsUseCase.execute();
    console.log(cars);
  });
});
