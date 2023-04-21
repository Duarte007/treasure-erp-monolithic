import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../models/address.entity';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async createAddress(addressData: Partial<Address>): Promise<Address> {
    const address = this.addressRepository.create(addressData);
    return this.addressRepository.save(address);
  }

  async updateAddress(
    id: number,
    addressData: Partial<Address>,
  ): Promise<Address> {
    const address = await this.getAddressById(id);
    if (!address) {
      return null;
    }
    this.addressRepository.merge(address, addressData);
    return this.addressRepository.save(address);
  }

  async deleteAddress(address_id: number): Promise<void> {
    await this.addressRepository.delete(address_id);
  }

  async getAddressById(address_id: number): Promise<Address> {
    return this.addressRepository.findOne({ where: { address_id } });
  }

  async getAllAddresses(): Promise<Address[]> {
    return this.addressRepository.find();
  }
}
