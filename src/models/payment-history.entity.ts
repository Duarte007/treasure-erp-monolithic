import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Order } from './order.entity';
import { PaymentMethod } from './payment-methods.entity';
import { PaymentStatus } from './payment-status.entity';

@Entity({ name: 'payment_history' })
export class PaymentHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  history_id: number;

  @ManyToOne(() => Order, (order) => order.paymentHistory)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: 'payment_method_id' })
  payment_method: PaymentMethod;

  @Column()
  payment_date: Date;

  @Column()
  payment_amount: number;

  @ManyToOne(() => PaymentStatus)
  @JoinColumn({ name: 'payment_status_id' })
  payment_status: PaymentStatus;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
