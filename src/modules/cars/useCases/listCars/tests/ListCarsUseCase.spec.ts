import { InMemoryCarsRepository } from "../../../repositories/in-memory/InMemoryCarsRepository";
import { ListCarsUseCase } from "../ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;

describe("List cars", () => {
  inMemoryCarsRepository = new InMemoryCarsRepository();
  listCarsUseCase = new ListCarsUseCase(inMemoryCarsRepository);

  it("Should be able to list all available cars", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car Example 2",
      description: "Car description example",
      daily_rate: 100,
      license_plate: "ABC-1322",
      fine_amount: 60,
      brand: "Brand Example",
      category_id: "category example",
    });

    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("Should be able to list available cars by name", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car Example 2",
      description: "Car description example",
      daily_rate: 100,
      license_plate: "ABC-1322",
      fine_amount: 60,
      brand: "Brand Example Test",
      category_id: "category example",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Brand Example Test",
    });
    expect(cars).toEqual([car]);
  });
});
