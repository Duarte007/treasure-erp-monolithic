import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../controllers/dto/create-address.dto';
import { UpdateAddressDto } from '../controllers/dto/update-address.dto';
import { AddressRepository } from '../repositories/address.repository';

@Injectable()
export class AddressesService {
  constructor(private addressRepository: AddressRepository) {}

  create(createAddressDto: CreateAddressDto) {
    return this.addressRepository.createAddress(createAddressDto);
  }

  findAll() {
    return this.addressRepository.getAllAddresses();
  }

  findOne(id: number) {
    return this.addressRepository.getAddressById(id);
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return this.addressRepository.updateAddress(id, updateAddressDto);
  }

  remove(id: number) {
    return this.addressRepository.deleteAddress(id);
  }
}
