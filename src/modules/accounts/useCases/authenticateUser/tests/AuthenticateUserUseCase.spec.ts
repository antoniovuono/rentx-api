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
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "nonuseremail@test.com",
        password: "correct_password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  // it("should not be able to authenticate a user with incorrect password", async () => {
  //   const createdUser: ICreateUsersDTO = {
  //     name: "User Name Test",
  //     email: "useremail@test.com",
  //     driver_license: "USER_DRIVER_LICENSE_TEST",
  //     password: "correct_password",
  //     avatar: null,
  //   };
  //   await createUserUseCase.execute(createdUser);
  //   await expect(
  //     authenticateUserUseCase.execute({
  //       email: createdUser.email,
  //       password: "incorrect_password",
  //     })
  //   ).rejects.toEqual(new AppError("Credentials incorrect!", 400));
  // });
});
