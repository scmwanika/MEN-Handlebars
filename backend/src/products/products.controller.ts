import { Controller, Get, Post, Patch, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async showAllUsers() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.productsService.showAll(),
    };
  }

  @Post()
  async createUsers(@Body() data: CreateProductDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Product added successfully',
      data: await this.productsService.create(data),
    };
  }

  @Get(':id')
  async readUser(@Param('id') id: number) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.productsService.read(id),
    };
  }

  @Patch(':id')
  async uppdateUser(@Param('id') id: number, @Body() data: Partial<CreateProductDto>) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Product updated successfully',
      data: await this.productsService.update(id, data),
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.productsService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product deleted successfully',
    };
  }
}