import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from 'src/guests/entities/guest.entity';
import { CreateGuestDto } from './dto/create-guest.dto';
// import { UpdateGuestDto } from './dto/update-guest.dto';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guest)
    private guestsRepository: Repository<Guest>,
  ) {}

  async showAll() {
    return await this.guestsRepository.find();
  }

  async create(data: CreateGuestDto) {
    const guest = this.guestsRepository.create(data);
    await this.guestsRepository.save(data);
    return guest;
  }

  async read(id: number) {
    return await this.guestsRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<CreateGuestDto>) {
    await this.guestsRepository.update({ id }, data);
    return await this.guestsRepository.findOne({ id });
  }

  async destroy(id: number) {
    await this.guestsRepository.delete({ id });
    return { deleted: true };
  }
}
