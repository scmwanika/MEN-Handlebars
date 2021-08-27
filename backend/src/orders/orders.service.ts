import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async showAll() {
    return await this.ordersRepository.find();
  }

  async create(data: CreateOrderDto) {
    const user = this.ordersRepository.create(data);
    await this.ordersRepository.save(data);
    return user;
  }

  async read(id: number) {
    return await this.ordersRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<CreateOrderDto>) {
    await this.ordersRepository.update({ id }, data);
    return await this.ordersRepository.findOne({ id });
  }

  async destroy(id: number) {
    await this.ordersRepository.delete({ id });
    return { deleted: true };
  }
}