import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async showAll() {
    return await this.productsRepository.find();
  }

  async create(data: CreateProductDto) {
    const user = this.productsRepository.create(data);
    await this.productsRepository.save(data);
    return user;
  }

  async read(id: number) {
    return await this.productsRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<CreateProductDto>) {
    await this.productsRepository.update({ id }, data);
    return await this.productsRepository.findOne({ id });
  }

  async destroy(id: number) {
    await this.productsRepository.delete({ id });
    return { deleted: true };
  }
}