import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  description: string;

  @Prop({ default: 0.0 })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
