import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { OrderItem } from './order-items.entity';
import { Stock } from './stock.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ length: 255 })
  product_name: string;

  @Column('text')
  product_description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  product_price: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Stock, (stock) => stock.product)
  stock: Stock[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order) // Relacionamento One-to-Many com a entidade OrderItem
  orderItems: OrderItem[];
}
