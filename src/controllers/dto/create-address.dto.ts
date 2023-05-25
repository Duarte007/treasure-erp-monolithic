import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateAddressDTO {
  @ApiProperty()
  @IsString()
  @IsDefined()
  street: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  neighborhood: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  city: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  state: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  postal_code: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  country: string;
}
