import { Controller, Get, Post, Patch, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async showAllUsers() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.ordersService.showAll(),
    };
  }

  @Post()
  async createUsers(@Body() data: CreateOrderDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Order added successfully',
      data: await this.ordersService.create(data),
    };
  }

  @Get(':id')
  async readUser(@Param('id') id: number) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.ordersService.read(id),
    };
  }

  @Patch(':id')
  async uppdateUser(@Param('id') id: number, @Body() data: Partial<CreateOrderDto>) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Order updated successfully',
      data: await this.ordersService.update(id, data),
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.ordersService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order deleted successfully',
    };
  }
}