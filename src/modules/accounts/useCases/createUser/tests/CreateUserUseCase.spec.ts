import { AppError } from "../../../../../errors/AppError";
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

  it("should not be able to create users with the same emai", async () => {
    expect(async () => {
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

      const userExists = await inMemoryUsersRepository.findUserByEmail(
        users.email
      );

      if (userExists) {
        await createUserUseCase.execute({
          name: users.name,
          email: users.email,
          password: users.password,
          driver_license: users.driver_license,
        });
      }
    }).rejects.toBeInstanceOf(AppError);
  });
});
