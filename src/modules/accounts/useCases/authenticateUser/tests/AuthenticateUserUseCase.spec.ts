import { AppError } from "../../../../../shared/errors/AppError";
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
    await expect(
      authenticateUserUseCase.execute({
        email: "nonuseremail@test.com",
        password: "correct_password",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });
});
