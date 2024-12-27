import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ResetPassword extends Document {
  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  otp: string;

  @Prop()
  expiredAt: Date;
}

export const ResetPasswordSchema = SchemaFactory.createForClass(ResetPassword);
