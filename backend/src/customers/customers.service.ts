import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async showAll() {
    return await this.customersRepository.find();
  }

  async create(data: CreateCustomerDto) {
    const user = this.customersRepository.create(data);
    await this.customersRepository.save(data);
    return user;
  }

  async read(id: number) {
    return await this.customersRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<CreateCustomerDto>) {
    await this.customersRepository.update({ id }, data);
    return await this.customersRepository.findOne({ id });
  }

  async destroy(id: number) {
    await this.customersRepository.delete({ id });
    return { deleted: true };
  }
}