import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  collection: 'users',
  strict: false,
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop()
  personalNumber: string;

  @Prop()
  identityCard: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
