import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Resource extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  resourceLink: string;

  // this will be edit by user
  @Prop({ default: false })
  isResourceMustWatch: boolean;

  //this will  be edit by user
  @Prop({ default: false })
  isResourceUserFvrt: boolean;

  @Prop({ default: false })
  isResourceAdminFvrt: boolean;

  @Prop({ default: false })
  isResourceWatchLater: boolean;

  @Prop({ default: false })
  isResourceVisitedByAdmin: boolean;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
