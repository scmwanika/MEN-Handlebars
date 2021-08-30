import { Controller, Post, Get, Patch, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { GuestsService } from './guests.service';
import { CreateGuestDto } from './dto/create-guest.dto';
// import { UpdateGuestDto } from './dto/update-guest.dto';

@Controller('guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}
  
  @Get()
  async showAllGuests() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.guestsService.showAll(),
    };
  }

  @Post()
  async createGuests(@Body() data: CreateGuestDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Booking added successfully',
      data: await this.guestsService.create(data),
    };
  }

  @Get(':id')
  async readGuest(@Param('id') id: number) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.guestsService.read(id),
    };
  }

  @Patch(':id')
  async updateGuest(@Param('id') id: number, @Body() data: Partial<CreateGuestDto>) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Booking updated successfully',
      data: await this.guestsService.update(id, data),
    };
  }

  @Delete(':id')
  async deleteGuest(@Param('id') id: number) {
    await this.guestsService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Booking deleted successfully',
    };
  }
}
