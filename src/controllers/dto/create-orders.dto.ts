import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaymentMethodsEnum } from '../../models/payment-methods.entity';

export class OrderItemsDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  product_id: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  quantity: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  price: number;
}

export class OrderCustomerDTO {
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  customer_id: number;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  document: string;
}

export class OrderPaymentDTO {
  @ApiProperty({ enum: PaymentMethodsEnum })
  @IsEnum(PaymentMethodsEnum)
  @IsDefined()
  @IsNotEmpty()
  method: PaymentMethodsEnum;
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
  @ApiProperty({ type: OrderCustomerDTO })
  @IsDefined()
  @ValidateNested()
  customer: OrderCustomerDTO;
  @ApiProperty({ type: OrderPaymentDTO })
  @IsDefined()
  @ValidateNested()
  payment: OrderPaymentDTO;
  @ApiProperty({ type: OrderItemsDTO, isArray: true })
  @IsDefined()
  @ValidateNested()
  items: OrderItemsDTO[];
  @ApiProperty()
  @IsDefined()
  @IsDateString()
  date: Date;
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  value: number;
}
