import { InMemoryCarsRepository } from "../../../repositories/in-memory/InMemoryCarsRepository";
import { ListCarsUseCase } from "../ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;

describe("List cars", () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    listCarsUseCase = new ListCarsUseCase(inMemoryCarsRepository);
  });

  it("Should be able to list all available cars", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car Example 1",
      description: "Car description example",
      daily_rate: 100,
      license_plate: "DFC-1122",
      fine_amount: 60,
      brand: "car_brand_example",
      category_id: "category_id",
    });

    const carsList = await listCarsUseCase.execute({});
    expect(carsList).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car Example 2",
      description: "Car description example",
      daily_rate: 100,
      license_plate: "DBC-1132",
      fine_amount: 60,
      brand: "car_brand_example",
      category_id: "category_id",
    });

    const carsListByName = await listCarsUseCase.execute({
      name: car.name,
    });
    expect(carsListByName).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car Example 3",
      description: "Car description example",
      daily_rate: 100,
      license_plate: "DBC-1132",
      fine_amount: 60,
      brand: "car_brand_example",
      category_id: "category_id",
    });

    const carListByBrand = await listCarsUseCase.execute({
      brand: car.brand,
    });
    expect(carListByBrand).toEqual([car]);
  });
});
