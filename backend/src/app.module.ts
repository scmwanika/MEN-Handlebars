import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controller
import { AppController } from './app.controller';

// Service
import { AppService } from './app.service';

// Module
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { GuestsModule } from './guests/guests.module';

@Module({
  imports: [TypeOrmModule.forRoot(), OrdersModule, ProductsModule, UsersModule, CustomersModule, GuestsModule],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule { }