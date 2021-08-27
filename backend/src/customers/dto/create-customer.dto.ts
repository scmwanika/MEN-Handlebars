import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateCustomerDto {
  @IsNumber()
  id: number;

  @IsString()
  customerName: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;
}