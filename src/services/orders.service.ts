import { Injectable, Logger } from '@nestjs/common';
import { PaymentsAdapter } from 'src/adapters/payments.adapter';
import { PaymentsRepository } from 'src/repositories/payments.repository';
import { ProductsRepository } from 'src/repositories/products.repository';
import { OrdersAdapter } from '../adapters/orders.adapter';
import { CreateOrderDTO } from '../controllers/dto/create-orders.dto';
import { OrdersRepository } from '../repositories/orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly paymentsRepository: PaymentsRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async create(createOrderDto: CreateOrderDTO): Promise<void> {
    try {
      const orderToSave = OrdersAdapter.toDatabase(createOrderDto);
      const newOrder = await this.ordersRepository.createOrder(orderToSave);

      await this.productsRepository.subtractStockInBatch(createOrderDto.items);

      const paymentToSave = PaymentsAdapter.fromOrderDTOToDatabase(
        createOrderDto,
        newOrder.order_id,
      );

      const payment = await this.paymentsRepository.createPayment(
        paymentToSave,
      );
      Logger.log({
        message: 'Create order succefully',
        order: newOrder,
        payment,
      });
    } catch (error) {
      Logger.error({ message: 'Error creating order', error: error.message });
      throw error;
    }
  }
}
