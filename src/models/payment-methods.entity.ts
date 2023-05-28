import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'payment_methods' })
export class PaymentMethod extends BaseEntity {
  @PrimaryGeneratedColumn()
  payment_method_id: number;

  @Column()
  payment_method_name: string;

  @Column()
  payment_method_description: string;
}

export enum PaymentMethodsEnum {
  CASH = 1,
  CREDIT_CARD = 2,
  DEBIT_CARD = 3,
  BANK_TRANSFER = 4,
  PAYPAL = 5,
  ONLINE_WALLET = 6,
  CRYPTOCURRENCY = 7,
  GIFT_CARD = 8,
}
