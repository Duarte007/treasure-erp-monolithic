import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../models/address.entity';
import { Customer, CustomerRecord } from '../models/customer.entity';

@Injectable()
export class CustomersRepository {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
  ) {}

  async createCustomer(customerData: CustomerRecord): Promise<Customer> {
    const customer = new Customer();
    customer.customer_name = customerData.customer_name;
    customer.customer_document = customerData.customer_document;
    customer.customer_email = customerData.customer_email;
    customer.customer_phone = customerData.customer_phone;

    const address = new Address();
    address.street = customerData.address.street;
    address.city = customerData.address.city;
    address.state = customerData.address.state;
    address.country = customerData.address.country;
    address.postal_code = customerData.address.postal_code;
    address.neighborhood = customerData.address.neighborhood;

    const savedAddress = await this.addressesRepository.save(address);
    customer.address = savedAddress;

    const savedCustomer = await this.customersRepository.save(customer);

    return savedCustomer;
  }

  async updateCustomer(
    id: number,
    customerData: CustomerRecord,
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
