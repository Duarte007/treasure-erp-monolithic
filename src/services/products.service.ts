import { Injectable } from '@nestjs/common';
import { Product } from 'src/models/product.entity';
import { CreateProductDto } from '../controllers/dto/create-product.dto';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    return this.productsRepository.addProductAndUpdateStock(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }
}
