import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'addresses' })
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  address_id: number;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postal_code: string;

  @Column()
  country: string;
}

export interface AddressRecord {
  address_id?: number;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}
