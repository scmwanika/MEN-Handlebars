import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  id: number;

  @IsString()
  productName: string;

  @IsString()
  date: string;

  @IsString()
  price: number;

  @IsString()
  quantity: number;

  @IsString()
  produceType: string;

  @IsString()
  category: string;

  @IsString()
  paymentMode: string;

  @IsString()
  deliveryType: string;

  @IsString()
  customerName: string;

  @IsString()
  customerContact: string;
}