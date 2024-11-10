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
    await product.save();
    return product;
  }

  findAll() {
    const users = this.productModel.find().exec();
    return users;
  }

  findOne(id: string): Promise<Product> {
    const user = this.productModel.findOne({ _id: id }).exec();
    return user;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const user = await this.productModel
      .findOneAndUpdate(
        { _id: id }, // Assuming `id` is the MongoDB `_id` field
        updateProductDto,
        { new: true }, // This option returns the updated document
      )
      .exec();

    return user;
  }

  remove(id: string) {
    const user = this.productModel.deleteOne({ _id: id });
    return user;
  }
}
