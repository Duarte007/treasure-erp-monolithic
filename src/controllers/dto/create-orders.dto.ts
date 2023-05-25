import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class OrderItemsDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  quantity: number;
}

export class OrderCustomerDTO {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  document: string;
}

export class OrderPaymentDTO {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  method: string;
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  amount: number;
  @ApiProperty()
  @IsDefined()
  @IsDateString()
  @IsNotEmpty()
  date: Date;
}

export class CreateOrderDTO {
  @ApiProperty()
  @IsDefined()
  @ValidateNested()
  customer: OrderCustomerDTO;
  @ApiProperty()
  @IsDefined()
  @ValidateNested()
  payment: OrderPaymentDTO;
  @ApiProperty()
  @IsDefined()
  @ValidateNested()
  items: OrderItemsDTO;
  @ApiProperty()
  @IsDefined()
  @IsDateString()
  date: Date;
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  value: number;
}
