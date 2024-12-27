import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './entities/expense.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import {
  EditExpense,
  EditExpenseSchema,
} from './entities/editedexpense.entity';
import {
  DeleteExpense,
  DeleteExpenseSchema,
} from './entities/deletedexpense.entity';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Expense.name, schema: ExpenseSchema },
      { name: EditExpense.name, schema: EditExpenseSchema },
      { name: DeleteExpense.name, schema: DeleteExpenseSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ExpenseService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
