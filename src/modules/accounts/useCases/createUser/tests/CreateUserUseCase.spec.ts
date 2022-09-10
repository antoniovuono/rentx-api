import { AppError } from "../../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("Should be able to create a new user", async () => {
    const users = {
      name: "Example User Name",
      email: "examlpe@user.com",
      password: "examblpe03",
      driver_license: "398736278423",
    };

    await createUserUseCase.execute({
      name: users.name,
      email: users.email,
      password: users.password,
      driver_license: users.driver_license,
    });

    const userCreated = await inMemoryUsersRepository.findUserByEmail(
      users.email
    );

    expect(userCreated).toHaveProperty("id");
  });

  it("should not be able to create users with the same email", async () => {
    const users1 = {
      name: "Example User1 Name",
      email: "examlpe@user.com",
      password: "example1",
      driver_license: "398736278423",
    };

    const users2 = {
      name: "Example User2 Name",
      email: "examlpe@user.com",
      password: "example2",
      driver_license: "3987362784321",
    };

    await createUserUseCase.execute({
      name: users1.name,
      email: users1.email,
      password: users1.password,
      driver_license: users1.driver_license,
    });

    expect(
      createUserUseCase.execute({
        name: users2.name,
        email: users2.email,
        password: users2.password,
        driver_license: users2.driver_license,
      })
    ).rejects.toEqual(new AppError("Email already exists"));
  });
});
