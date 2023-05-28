import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { PaymentHistory } from '../models/payment-history.entity';
import { PaymentStatusEnum } from '../models/payment-status.entity';
import { Payment, PaymentRecord } from '../models/payment.entity';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  private _buildPaymentEntity(payment: PaymentRecord) {
    const paymentEntity = new Payment();
    paymentEntity.order_id = payment.order_id;
    paymentEntity.payment_method_id = payment.payment_method_id;
    paymentEntity.payment_status_id = PaymentStatusEnum.PENDING;
    paymentEntity.payment_date = payment.payment_date;
    paymentEntity.payment_amount = payment.payment_amount;
    return paymentEntity;
  }

  private _buildPaymentHistoryEntity(payment: Payment): PaymentHistory {
    const paymentHistory = new PaymentHistory();
    paymentHistory.order_id = payment.order_id;
    paymentHistory.payment_method_id = payment.payment_method_id;
    paymentHistory.payment_status_id = payment.payment_status_id;
    paymentHistory.payment_date = payment.payment_date;
    paymentHistory.payment_amount = payment.payment_amount;
    return paymentHistory;
  }

  async createPayment(payment: PaymentRecord): Promise<Payment> {
    return this.paymentsRepository.manager.transaction(
      async (transaction: EntityManager) => {
        const paymentEntity = this._buildPaymentEntity(payment);

        const newPayment = await transaction.save(paymentEntity);

        const paymentHistoryEntity =
          this._buildPaymentHistoryEntity(newPayment);

        await transaction.save(PaymentHistory, paymentHistoryEntity);

        return newPayment;
      },
    );
  }
}
