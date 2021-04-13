import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRespository } from './orders.respository';
import { Orders } from './orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { ProductOrder } from './interfaces/productOrder.interface';
import { Product } from 'src/products/product.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRespository)
    private orderRespository: OrdersRespository,
  ) {}

  async getOrder(req: any): Promise<Orders[]> {
    const { id } = req;

    if (id) {
      return this.orderRespository.find({
        where: { id: id, deleted_at: null },
        relations: ['user'],
      });
    }
    return this.orderRespository.find({
      where: { deleted_at: null },
      relations: ['user'],
    });
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Orders> {
    const {
      name,
      address,
      phone,
      totalMoney,
      productOrder,
      id_user,
    } = createOrderDto;
    try {
      const order = new Orders();
      order.name_receive = name;
      order.address_receive = address;
      order.phone_receive = phone;
      order.totalMoney = totalMoney;
      order.user = await User.findOne({ where: { id: id_user } });
      order.orderDetail = await this.getProduct(productOrder);
      order.created_at = new Date();
      order.save();

      return order;
    } catch (error) {
      console.log(error);
    }
  }
  
  async deleteOrder(id: number): Promise<void> {
    const order = await this.orderRespository.findOne({ where: { id: id } });
    if (!order) {
      throw new NotFoundException(`Order with "${id}" not found`);
    }
    await this.orderRespository.update(id, { deleted_at: new Date() });
  }

  async getProduct(order_product: any[]): Promise<ProductOrder[]> {
    return Promise.all(
      order_product.map(async item => {
        const product: Product = await Product.findOne({
          where: { id: item.id_product },
        });
        return {
          quantity: item.quantity,
          product: product,
        };
      }),
    );
  }

  async getMoney(year: Date): Promise<Orders[]> {
    const allOrder = this.orderRespository.find({
      where: { created_at: year },
      relations: ['user'],
    });

    return;
  }
}
