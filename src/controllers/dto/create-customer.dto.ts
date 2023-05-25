import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CustomerAddressDTO {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  id: number;
}

export class CreateCustomerDTO {
  @ApiProperty()
  @IsString()
  @IsDefined()
  name: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  document: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  email: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  phone: string;
  @ApiProperty({ type: CustomerAddressDTO })
  @IsObject()
  @IsDefined()
  @ValidateNested()
  address: CustomerAddressDTO;
}
