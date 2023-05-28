import { CreateCustomerDTO } from '../controllers/dto/create-customer.dto';
import { CustomerRecord } from '../models/customer.entity';
import { AddressAdapter } from './address.adapter';

export class CustomerAdapter {
  static toDatabase(customerData: Partial<CreateCustomerDTO>): CustomerRecord {
    return {
      customer_name: customerData.name,
      customer_document: customerData.document,
      customer_email: customerData.email,
      customer_phone: customerData.phone,
      address: AddressAdapter.toDatabase(customerData.address),
    };
  }
}
