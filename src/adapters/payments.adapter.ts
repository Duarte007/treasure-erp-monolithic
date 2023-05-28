import { CreateOrderDTO } from '../controllers/dto/create-orders.dto';
import { PaymentRecord } from '../models/payment.entity';

export class PaymentsAdapter {
  static fromOrderEventToDatabase(
    orderData: CreateOrderDTO,
    orderId: number,
  ): PaymentRecord {
    return {
      order_id: orderId,
      payment_method_id: orderData.payment.method,
      payment_date: orderData.payment.date,
      payment_amount: orderData.payment.amount,
    };
  }
}
