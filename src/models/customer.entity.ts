import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address, AddressRecord } from './address.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'customers' })
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ length: 255 })
  customer_name: string;

  @Column({ length: 255, unique: true })
  customer_document: string;

  @Column({ length: 255, unique: true })
  customer_email: string;

  @Column({ length: 255, unique: true })
  customer_phone: string;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address?: Address;
}

export interface CustomerRecord {
  customer_name: string;
  customer_document: string;
  customer_email: string;
  customer_phone: string;
  address: AddressRecord;
}
