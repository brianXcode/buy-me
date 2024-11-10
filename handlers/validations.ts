/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customEmail', async: true })
export class CustomEmailValidator implements ValidatorConstraintInterface {
  async validate(email: string, args: ValidationArguments) {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email); // Returns true if valid email format
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email is not in a valid format';
  }
}

@ValidatorConstraint({ name: 'isPasswordStrong', async: true })
export class IsPasswordStrong implements ValidatorConstraintInterface {
  async validate(password: string, args: ValidationArguments) {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return strongPasswordRegex.test(password);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password must be 8-20 characters long, contain uppercase and lowercase letters, at least one number, and one special character (@, $, !, %, *, ?, &).';
  }
}
