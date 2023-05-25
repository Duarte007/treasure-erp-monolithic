import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../models/address.entity';
import { Customer } from '../models/customer.entity';

@Injectable()
export class CustomersRepository {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async createCustomer(
    customerData: Partial<Customer>,
    address: Address,
  ): Promise<Customer> {
    if (address) customerData.address = address;
    const customer = this.customersRepository.create(customerData);
    return this.customersRepository.save(customer);
  }

  async updateCustomer(
    id: number,
    customerData: Partial<Customer>,
    address?: Address,
  ): Promise<Customer> {
    const customer = await this.getCustomerById(id);
    if (!customer) {
      return null;
    }
    if (address) customerData.address = address;
    this.customersRepository.merge(customer, customerData);
    return this.customersRepository.save(customer);
  }

  async deleteCustomer(customer_id: number): Promise<void> {
    await this.customersRepository.delete(customer_id);
  }

  async getCustomerById(customer_id: number): Promise<Customer> {
    return this.customersRepository.findOne({
      where: { customer_id },
      relations: ['address'],
    });
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.customersRepository.find({ relations: ['address'] });
  }
}
