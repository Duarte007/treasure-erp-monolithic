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

  @Column()
  customer_id: number;

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: 'order_status_id' })
  orderStatus: OrderStatus;

  @Column()
  order_status_id: number;

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

export class OrderItemsRecord {
  product_id: number;
  quantity: number;
  price: number;
}

export class OrderCustomerRecord {
  customer_id: number;
}

export class OrderRecord {
  order_id?: number;
  customer: OrderCustomerRecord;
  items: OrderItemsRecord[];
  date: Date;
  value: number;
}
