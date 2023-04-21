import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'order_status' })
export class OrderStatus extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_status_id: number;

  @Column({ length: 255 })
  order_status_name: string;
}
