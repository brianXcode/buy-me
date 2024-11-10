import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { HashPassword } from 'handlers/passwords';
// import { SignupResponse } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const password = await HashPassword.hashPassword(createUserDto.password);
    const createUser = {
      ...createUserDto,
      password,
    };
    const user = new this.userModel(createUser);
    await user.save();
    return user;
  }

  findAll() {
    const users = this.userModel.find().select('-password');
    return users;
  }

  findOne(id: string): Promise<User> {
    const user = this.userModel.findOne({ _id: id }).exec();
    return user;
  }

  emailExist(email: string): Promise<User> {
    const userEmail = this.userModel.findOne({ email: email }).exec();
    return userEmail;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate(
        { _id: id }, // Assuming `id` is the MongoDB `_id` field
        updateUserDto,
        { new: true }, // This option returns the updated document
      )
      .exec();

    return user;
  }

  remove(id: string) {
    const user = this.userModel.deleteOne({ id });
    return user;
  }
}
