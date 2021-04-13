import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { OrdersController } from './orders.controller';
import { OrdersRespository } from './orders.respository';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersRespository]), UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
