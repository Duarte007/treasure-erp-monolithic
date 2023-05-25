import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerAdapter } from '../adapters/customer.adapter';
import { CreateCustomerDTO } from '../controllers/dto/create-customer.dto';
import { Address } from '../models/address.entity';
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
    const address = await this.addressRepository.getAddressById(
      customerData.address.id,
    );

    if (!address) throw new NotFoundException('Address not found');

    const customerToSave = CustomerAdapter.toDatabase(customerData);
    return this.customersRepository.createCustomer(customerToSave, address);
  }

  async update(
    id: number,
    customerData: Partial<CreateCustomerDTO>,
  ): Promise<Customer> {
    let address: Address;
    if (customerData?.address?.id) {
      address = await this.addressRepository.getAddressById(
        customerData.address.id,
      );

      if (!address) throw new NotFoundException('Address not found');
    }
    const customerToSave = CustomerAdapter.toDatabase(customerData);
    return this.customersRepository.updateCustomer(id, customerToSave, address);
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
