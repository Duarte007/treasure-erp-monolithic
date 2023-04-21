import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payment_status' })
export class PaymentStatus extends BaseEntity {
  @PrimaryGeneratedColumn()
  payment_status_id: number;

  @Column()
  payment_status_name: string;
}
