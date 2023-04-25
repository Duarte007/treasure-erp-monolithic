import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from '../controllers/dto/create-orders.dto';
import { OrdersRepository } from '../repositories/orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  async create(createOrderDto: CreateOrderDTO) {
    return this.ordersRepository.createOrder(createOrderDto);
  }
}
