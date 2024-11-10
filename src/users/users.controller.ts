import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApplicationError, ErrorType } from 'handlers/share_error';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(201)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const emailExist = await this.usersService.emailExist(
        createUserDto.email,
      );
      if (emailExist) {
        throw new ApplicationError(
          'Email already exist',
          ErrorType.UnauthorizedException,
          HttpStatus.UNAUTHORIZED,
        );
      }
      await this.usersService.create(createUserDto);
      return { message: 'User successfully created' };
    } catch (e) {
      console.log(e);
      throw new ApplicationError(
        e,
        ErrorType.InternalServerErrorException,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
