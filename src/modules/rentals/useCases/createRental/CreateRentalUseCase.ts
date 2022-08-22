interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: string;
}

class CreateRentalUseCase {
  execute({ user_id, car_id, expected_return_date }: IRequest): Promise<void> {}

  // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
  // Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo usuário.
  // Aluguel deve ter duração minima de 24 horas.
}

export { CreateRentalUseCase };
