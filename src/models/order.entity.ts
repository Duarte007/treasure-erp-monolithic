import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Customer } from './customer.entity';
import { OrderItem } from './order-items.entity';
import { OrderStatus } from './order-status.entity';
import { PaymentHistory } from './payment-history.entity';
import { Payment } from './payment.entity';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_id: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: 'order_status_id' })
  orderStatus: OrderStatus;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @OneToMany(() => PaymentHistory, (paymentHistory) => paymentHistory.order)
  paymentHistory: OrderItem[];

  @Column()
  order_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  order_total: number;
}
