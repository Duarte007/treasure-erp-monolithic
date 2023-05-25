import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../models/address.entity';

@Injectable()
export class AddressesRepository {
  constructor(
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
  ) {}

  async createAddress(addressData: Partial<Address>): Promise<Address> {
    const address = this.addressesRepository.create(addressData);
    return this.addressesRepository.save(address);
  }

  async updateAddress(
    id: number,
    addressData: Partial<Address>,
  ): Promise<Address> {
    const address = await this.getAddressById(id);
    if (!address) {
      return null;
    }
    this.addressesRepository.merge(address, addressData);
    return this.addressesRepository.save(address);
  }

  async deleteAddress(address_id: number): Promise<void> {
    await this.addressesRepository.delete(address_id);
  }

  async getAddressById(address_id: number): Promise<Address> {
    return this.addressesRepository.findOne({ where: { address_id } });
  }

  async getAllAddresses(): Promise<Address[]> {
    return this.addressesRepository.find();
  }
}
