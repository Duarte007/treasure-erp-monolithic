import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressesController } from './controllers/addresses.controller';
import { CustomersController } from './controllers/customers.controller';
import { AddressesService } from './services/addresses.service';
import { CustomersService } from './services/customers.service';

@Module({
  imports: [],
  controllers: [AppController, CustomersController, AddressesController],
  providers: [AppService, CustomersService, AddressesService],
})
export class AppModule {}
