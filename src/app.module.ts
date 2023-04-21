import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { AddressesController } from './controllers/addresses.controller';
import { CustomersController } from './controllers/customers.controller';
import { OrdersController } from './controllers/orders.controller';
import { PaymentsController } from './controllers/payments.controller';
import { ProductsController } from './controllers/products.controller';
import { AddressesRepository } from './repositories/addresses.repository';
import { CustomersRepository } from './repositories/customer.repository';
import { OrdersRepository } from './repositories/orders.repository';
import { PaymentsRepository } from './repositories/payments.repository';
import { ProductsRepository } from './repositories/products.repository';
import { AddressesService } from './services/addresses.service';
import { CustomersService } from './services/customers.service';
import { OrdersService } from './services/orders.service';
import { PaymentsService } from './services/payments.service';
import { ProductsService } from './services/products.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    AppController,
    CustomersController,
    AddressesController,
    ProductsController,
    OrdersController,
    PaymentsController,
  ],
  providers: [
    AppService,
    CustomersRepository,
    AddressesRepository,
    ProductsRepository,
    OrdersRepository,
    PaymentsRepository,
    CustomersService,
    AddressesService,
    ProductsService,
    OrdersService,
    PaymentsService,
  ],
})
export class AppModule {}
