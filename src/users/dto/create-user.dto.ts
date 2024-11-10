import { IsString, Validate } from 'class-validator';
import { CustomEmailValidator, IsPasswordStrong } from 'handlers/validations';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @Validate(CustomEmailValidator, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @Validate(IsPasswordStrong)
  password: string;
}
