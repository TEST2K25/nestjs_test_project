import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expense } from './expense.entity';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class EditExpense extends Expense {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  editBy: string;

  @Prop({ default: new Date() })
  editDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'Expense', required: true })
  referedEntry: string;

  @Prop({ default: 'User edited' })
  editMessage: string;
}

export const EditExpenseSchema = SchemaFactory.createForClass(EditExpense);
