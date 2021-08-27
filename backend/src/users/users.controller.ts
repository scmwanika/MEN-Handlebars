import { Controller, Get, Post, Patch, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async showAllUsers() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.usersService.showAll(),
    };
  }

  @Post()
  async createUsers(@Body() data: CreateUserDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'User added successfully',
      data: await this.usersService.create(data),
    };
  }

  @Get(':id')
  async readUser(@Param('id') id: number) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.usersService.read(id),
    };
  }

  @Patch(':id')
  async uppdateUser(@Param('id') id: number, @Body() data: Partial<CreateUserDto>) {
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      data: await this.usersService.update(id, data),
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.usersService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}