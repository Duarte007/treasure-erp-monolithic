import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
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

@Injectable()
export class DataBaseConnectionService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      synchronize: false,
      logging: false,
      entities: DATABASE_ENTITIES,
    };
  }
}
