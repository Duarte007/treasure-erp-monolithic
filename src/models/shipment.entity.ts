import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'shipments' })
export class Shipment extends BaseEntity {
  @PrimaryGeneratedColumn()
  shipment_id: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  shipment_date: Date;

  @Column()
  shipment_status: string;
}
