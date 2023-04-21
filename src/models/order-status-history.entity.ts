import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from './order-status.entity';
import { Order } from './order.entity';

@Entity({ name: 'order_status_history' })
export class OrderStatusHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  history_id: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: 'order_status_id' })
  orderStatus: OrderStatus;
}
