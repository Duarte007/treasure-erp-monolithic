import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemsDTO } from 'src/controllers/dto/create-orders.dto';
import { EntityManager, Repository } from 'typeorm';
import { Product } from '../models/product.entity';
import { Stock } from '../models/stock.entity';
import { ProductDB } from './interfaces/products.interface';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  private _buildProductEntity(product: ProductDB) {
    const productEntity = new Product();
    productEntity.product_name = product.product_name;
    productEntity.product_description = product.product_description;
    productEntity.product_price = product.product_price;
    return productEntity;
  }

  async addProductAndUpdateStock(productToSave: ProductDB) {
    try {
      return this.productRepository.manager.transaction(
        async (transaction: EntityManager) => {
          const productEntity = this._buildProductEntity(productToSave);
          const savedProduct = await transaction.save(productEntity);

          await transaction.save(Stock, {
            product_id: savedProduct.product_id,
            quantity: productToSave.quantity,
          });

          return savedProduct;
        },
      );
    } catch (err) {
      Logger.error({
        message: err.detail,
        error: err.data,
      });
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async subtractStockInBatch(items: OrderItemsDTO[]): Promise<void> {
    const productIds = items.map((item) => item.product_id);
    const stocks = await this.stockRepository.findByIds(productIds);

    const promises = stocks.map(async (stock) => {
      const item = items.find((item) => item.product_id === stock.product_id);
      if (item) {
        stock.quantity -= item.quantity;
        await this.stockRepository.save(stock);
      }
    });

    await Promise.all(promises);
  }
}
