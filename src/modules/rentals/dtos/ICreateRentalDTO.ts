export interface ICreateRentalDTO {
  id?: string;
  car_id: string;
  user_id: string;
  end_date?: Date;
  expect_return_date: Date;
  total?: number;
}
