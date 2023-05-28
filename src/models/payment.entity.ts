import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Order } from './order.entity';
import { PaymentMethod, PaymentMethodsEnum } from './payment-methods.entity';
import { PaymentStatus } from './payment-status.entity';

@Entity({ name: 'payments' })
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @ManyToOne(() => Order, (order) => order.payments)
  @JoinColumn({ name: 'order_id' })
  order?: Order;

  @Column()
  order_id: number;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: 'payment_method_id' })
  payment_method?: PaymentMethod;

  @Column()
  payment_method_id: number;

  @ManyToOne(() => PaymentStatus)
  @JoinColumn({ name: 'payment_status_id' })
  payment_status?: PaymentStatus;

  @Column()
  payment_status_id: number;

  @Column()
  payment_date: Date;

  @Column()
  payment_amount: number;
}

export interface PaymentRecord {
  payment_id?: number;
  order_id: number;
  payment_method_id: PaymentMethodsEnum;
  payment_method?: PaymentMethod;
  payment_status?: PaymentStatus;
  payment_status_id?: number;
  payment_date: Date;
  payment_amount: number;
}
