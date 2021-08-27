import { Controller, Get, Post, Patch, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  async showAllUsers() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.customersService.showAll(),
    };
  }

  @Post()
  async createUsers(@Body() data: CreateCustomerDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Customer added successfully',
      data: await this.customersService.create(data),
    };
  }

  @Get(':id')
  async readUser(@Param('id') id: number) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.customersService.read(id),
    };
  }

  @Patch(':id')
  async uppdateUser(@Param('id') id: number, @Body() data: Partial<CreateCustomerDto>) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Customer updated successfully',
      data: await this.customersService.update(id, data),
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.customersService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Customer deleted successfully',
    };
  }
}