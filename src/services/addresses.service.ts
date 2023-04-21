import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../controllers/dto/create-address.dto';
import { UpdateAddressDto } from '../controllers/dto/update-address.dto';
import { AddressesRepository } from '../repositories/addresses.repository';

@Injectable()
export class AddressesService {
  constructor(private addressesRepository: AddressesRepository) {}

  create(createAddressDto: CreateAddressDto) {
    return this.addressesRepository.createAddress(createAddressDto);
  }

  findAll() {
    return this.addressesRepository.getAllAddresses();
  }

  findOne(id: number) {
    return this.addressesRepository.getAddressById(id);
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return this.addressesRepository.updateAddress(id, updateAddressDto);
  }

  remove(id: number) {
    return this.addressesRepository.deleteAddress(id);
  }
}
