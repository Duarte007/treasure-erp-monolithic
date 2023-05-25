import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../../models/address.entity';
import { Customer } from '../../models/customer.entity';
import { OrderItem } from '../../models/order-items.entity';
import { OrderStatusHistory } from '../../models/order-status-history.entity';
import { OrderStatus } from '../../models/order-status.entity';
import { Order } from '../../models/order.entity';
import { PaymentHistory } from '../../models/payment-history.entity';
import { PaymentMethod } from '../../models/payment-methods.entity';
import { PaymentStatus } from '../../models/payment-status.entity';
import { PaymentTransaction } from '../../models/payment-transaction.entity';
import { Payment } from '../../models/payment.entity';
import { Product } from '../../models/product.entity';
import { Shipment } from '../../models/shipment.entity';
import { Stock } from '../../models/stock.entity';
import { DataBaseConnectionService } from './typeorm.config';

const DATABASE_ENTITIES = [
  Customer,
  Address,
  Order,
  OrderItem,
  OrderStatus,
  OrderStatusHistory,
  Product,
  Stock,
  Shipment,
  Payment,
  PaymentHistory,
  PaymentMethod,
  PaymentTransaction,
  PaymentStatus,
];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DataBaseConnectionService,
    }),
    TypeOrmModule.forFeature(DATABASE_ENTITIES),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
