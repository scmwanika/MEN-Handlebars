import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  id: number;

  @IsString()
  productName: string;

  @IsString()
  ward: string;

  @IsString()
  date: string;

  @IsString()
  unitPrice: number;

  @IsString()
  quantity: number;

  @IsString()
  paymentMode: string;

  @IsString()
  direction: string;

  @IsString()
  deliveryType: string;

  @IsString()
  produceType: string;

  @IsString()
  category: string;

  @IsString()
  productImage: string;
}