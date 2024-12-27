import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// import { User } from 'src/user/entities/user.entity';

@Schema({ timestamps: true })
export class Expense extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: string;

  @Prop({ required: true })
  expenseType: string;

  @Prop({ required: true })
  expenseAmount: string;

  @Prop({ required: true })
  expenseDate: string;

  @Prop({ required: true })
  expenseCategory: string;

  @Prop({ default: 'none' })
  expenseDesc: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
