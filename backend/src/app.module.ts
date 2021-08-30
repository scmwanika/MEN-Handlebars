import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controller
import { AppController } from './app.controller';

// Service
import { AppService } from './app.service';

// Module
import { GuestsModule } from './guests/guests.module';
import { ReviewsModule } from './reviews/reviews.module';
import { EmployeesModule } from './employees/employees.module';
import { ActivitiesModule } from './activities/activities.module';
import { AccommodationsModule } from './accommodations/accommodations.module';

@Module({
  imports: [TypeOrmModule.forRoot(), GuestsModule, ReviewsModule, EmployeesModule, ActivitiesModule, AccommodationsModule],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule { }