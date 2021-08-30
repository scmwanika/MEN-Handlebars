import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateGuestDto {
  @IsNumber()
  id: Number;

  @IsString()
  name: String;

  @IsString()
  email: String;

  @IsString()
  phone: String;

  @IsNumber()
  guestNum: Number;

  @IsString()
  accommodationType: String;

  @IsDate()
  checkin: String;

  @IsDate()
  checkout: String;
}