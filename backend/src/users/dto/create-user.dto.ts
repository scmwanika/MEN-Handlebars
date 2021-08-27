import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  national_id: string;

  @IsString()
  reguser: string;

  @IsString()
  gender: string;

  @IsString()
  bornon: string;

  @IsString()
  registeredon: string;

  @IsString()
  role: string;

  @IsString()
  activities: string;

  @IsString()
  wardName: string;

  @IsString()
  residenceType: string;

  @IsString()
  residencePeriod: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}