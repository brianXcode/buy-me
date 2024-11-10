import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product;
  }

  findAll() {
    const users = this.productModel.find().exec();
    return users;
  }

  findOne(id: number): Promise<Product> {
    const user = this.productModel.findOne({ _id: id }).exec();
    return user;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = this.productModel.findOneAndUpdate(
      { id },
      updateProductDto,
    );
    return product;
  }

  remove(id: number) {
    const user = this.productModel.deleteOne({ id });
    return user;
  }
}
