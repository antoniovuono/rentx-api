import { AppError } from "../../../../../errors/AppError";
import { ICreateUsersDTO } from "../../../dtos/ICreateUsersDTO";
import { InMemoryUsersRepository } from "../../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUserRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUsersDTO = {
      name: "User Example",
      email: "user@example.com",
      password: "01020304",
      driver_license: "423324234324",
    };

    await createUserUseCase.execute(user);

    const resultAuthentication = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(resultAuthentication).toHaveProperty("token");
  });

  it("Should not be able to authenticate a non existing user", async () => {
    const user: ICreateUsersDTO = {
      name: "User Example",
      email: "user@example.com",
      password: "01020304",
      driver_license: "423324234324",
    };

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate a user with a invalid password", () => {
    const user: ICreateUsersDTO = {
      name: "User Example",
      email: "user@example.com",
      password: "01020304",
      driver_license: "423324234324",
    };

    expect(async () => {
      await createUserUseCase.execute(user);

      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
