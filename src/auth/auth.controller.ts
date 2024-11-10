import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApplicationError, ErrorType } from 'handlers/share_error';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post()
  login(@Body() body: LoginDto) {
    try {
      const accessToken = this.auth.login(body);
      if (!accessToken) {
        throw new ApplicationError(
          'Internal Server Error',
          ErrorType.InternalServerErrorException,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return accessToken;
    } catch (e) {
      console.log(e);
      throw new ApplicationError(
        'Internal Server Error',
        ErrorType.InternalServerErrorException,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
