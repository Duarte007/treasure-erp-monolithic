import { Injectable } from '@nestjs/common';
import { CustomerAdapter } from '../adapters/customer.adapter';
import { CreateCustomerDTO } from '../controllers/dto/create-customer.dto';
import { Customer } from '../models/customer.entity';
import { AddressesRepository } from '../repositories/addresses.repository';
import { CustomersRepository } from '../repositories/customer.repository';

@Injectable()
export class CustomersService {
  constructor(
    private customersRepository: CustomersRepository,
    private addressRepository: AddressesRepository,
  ) {}

  async create(customerData: CreateCustomerDTO): Promise<Customer> {
    const customerToSave = CustomerAdapter.toDatabase(customerData);
    return this.customersRepository.createCustomer(customerToSave);
  }

  async update(
    id: number,
    customerData: Partial<CreateCustomerDTO>,
  ): Promise<Customer> {
    const customerToSave = CustomerAdapter.toDatabase(customerData);
    return this.customersRepository.updateCustomer(id, customerToSave);
  }

  async delete(id: number): Promise<void> {
    await this.customersRepository.deleteCustomer(id);
  }

  async findOne(id: number): Promise<Customer> {
    return this.customersRepository.getCustomerById(id);
  }

  async findAll(): Promise<Customer[]> {
    return this.customersRepository.getAllCustomers();
  }
}
