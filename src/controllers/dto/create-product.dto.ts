import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  product_name: string;
  @ApiProperty()
  @IsDefined()
  @IsString()
  product_description: string;
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  product_price: number;
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  quantity: number;
}
