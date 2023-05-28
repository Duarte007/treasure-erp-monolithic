import { CustomerAddressDTO } from 'src/controllers/dto/create-customer.dto';
import { AddressRecord } from '../models/address.entity';

export class AddressAdapter {
  static toDatabase(addressData: CustomerAddressDTO): AddressRecord {
    return {
      street: addressData.street,
      neighborhood: addressData.neighborhood,
      city: addressData.city,
      state: addressData.state,
      postal_code: addressData.postal_code,
      country: addressData.country,
    };
  }
}
