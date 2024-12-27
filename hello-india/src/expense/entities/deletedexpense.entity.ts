import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expense } from './expense.entity';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class DeleteExpense extends Expense {
  @Prop({ required: true })
  deleteBy: string;

  @Prop({ type: Types.ObjectId, ref: 'Expense', required: true })
  referedEntry: string;

  @Prop({ default: new Date() })
  deleteDate: Date;

  @Prop({ default: 'User deleted' })
  deleteMessage: string;
}

export const DeleteExpenseSchema = SchemaFactory.createForClass(DeleteExpense);
