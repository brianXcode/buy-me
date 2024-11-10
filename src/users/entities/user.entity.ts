import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  IsEmail,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @Prop()
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @Prop({ required: true })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Prop({ default: 'User' })
  @IsEmail({}, { message: 'Invalid email format' })
  role: string;

  @Prop({ required: true })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @Prop()
  @IsBoolean()
  @IsOptional()
  verified: boolean;

  @Prop()
  @IsBoolean()
  @IsOptional()
  Otp: boolean;

  @Prop()
  @IsBoolean()
  @IsOptional()
  preferenceConsent: boolean;

  @Prop()
  @IsString()
  @IsOptional()
  accessToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
