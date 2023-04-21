import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { AddressesController } from './controllers/addresses.controller';
import { CustomersController } from './controllers/customers.controller';
import { AddressesRepository } from './repositories/addresses.repository';
import { CustomersRepository } from './repositories/customer.repository';
import { AddressesService } from './services/addresses.service';
import { CustomersService } from './services/customers.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, CustomersController, AddressesController],
  providers: [
    AppService,
    CustomersRepository,
    AddressesRepository,
    CustomersService,
    AddressesService,
  ],
})
export class AppModule {}
