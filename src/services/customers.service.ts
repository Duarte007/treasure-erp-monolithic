import { Injectable } from '@nestjs/common';
import { Customer } from '../models/customer.entity';
import { CustomerRepository } from '../repositories/customer.repository';

@Injectable()
export class CustomersService {
  constructor(private customerRepository: CustomerRepository) {}

  async create(customerData: Partial<Customer>): Promise<Customer> {
    return this.customerRepository.createCustomer(customerData);
  }

  async update(id: number, customerData: Partial<Customer>): Promise<Customer> {
    return this.customerRepository.updateCustomer(id, customerData);
  }

  async delete(id: number): Promise<void> {
    await this.customerRepository.deleteCustomer(id);
  }

  async findOne(id: number): Promise<Customer> {
    return this.customerRepository.getCustomerById(id);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.getAllCustomers();
  }
}
