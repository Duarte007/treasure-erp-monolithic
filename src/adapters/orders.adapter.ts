import { DateUtils } from '../common/utils/date.utils';
import { CreateOrderDTO } from '../controllers/dto/create-orders.dto';
import { OrderRecord } from '../models/order.entity';

export class OrdersAdapter {
  static toDatabase(orderData: CreateOrderDTO): OrderRecord {
    return {
      customer: { customer_id: orderData.customer.customer_id },
      items: orderData.items,
      date: DateUtils.now(),
      value: orderData.value,
    };
  }
}
