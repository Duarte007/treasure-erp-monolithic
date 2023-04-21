import { Injectable } from '@nestjs/common';
import { Customer } from '../models/customer.entity';
import { CustomersRepository } from '../repositories/customer.repository';

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomersRepository) {}

  async create(customerData: Partial<Customer>): Promise<Customer> {
    return this.customersRepository.createCustomer(customerData);
  }

  async update(id: number, customerData: Partial<Customer>): Promise<Customer> {
    return this.customersRepository.updateCustomer(id, customerData);
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
