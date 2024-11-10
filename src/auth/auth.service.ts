import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApplicationError, ErrorType } from 'handlers/share_error';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Token } from './interfaces/interface';
import { LoginDto } from './dto/login.dto';
import { HashPassword } from 'handlers/passwords';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async login(loginDto: LoginDto): Promise<Token> {
    const user = this.userModel.findOne({ email: loginDto.email }).exec();
    if (!user) {
      throw new ApplicationError(
        'User does not exists',
        ErrorType.UnauthorizedException,
        HttpStatus.UNAUTHORIZED,
      );
    }
    const password = await HashPassword.comparePassword(
      loginDto.password,
      (await user).password,
    );
    if (!password) {
      throw new ApplicationError(
        'Invalid Password',
        ErrorType.UnauthorizedException,
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = {
      sub: (await user)._id,
      username: (await user).email,
      role: (await user).role,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async logout() {}
}
