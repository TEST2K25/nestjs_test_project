import { IsNotEmpty, IsString } from 'class-validator';

export class EditExpenseDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  expenseType: string;

  @IsString()
  @IsNotEmpty()
  expenseAmount: string;

  @IsString()
  @IsNotEmpty()
  expenseCategory: string;

  @IsString()
  @IsNotEmpty()
  expenseDate: string;

  @IsString()
  expenseDesc: string;
}
