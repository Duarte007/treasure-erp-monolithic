import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { OrderItem } from '../models/order-items.entity';
import { OrderStatusHistory } from '../models/order-status-history.entity';
import { OrderStatus, OrderStatusEnum } from '../models/order-status.entity';
import { Order, OrderRecord } from '../models/order.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(OrderStatus)
    private orderStatusRepository: Repository<OrderStatus>,
    @InjectRepository(OrderStatusHistory)
    private orderStatusHistoryRepository: Repository<OrderStatusHistory>,
  ) {}

  // @TODO: Remover opcional do paymentId
  private _buildOrderEntity(order: OrderRecord, paymentId?: number) {
    const orderEntity = new Order();
    orderEntity.customer_id = order.customer.customer_id;
    orderEntity.payment_id = paymentId;
    orderEntity.order_status_id = OrderStatusEnum.PENDING;
    orderEntity.order_date = order.date;
    orderEntity.order_total = order.value;
    return orderEntity;
  }

  private _buildOrderItemsEntity(
    order: OrderRecord,
    orderId: number,
  ): OrderItem[] {
    return order.items.map((item) => {
      const orderItemEntity = new OrderItem();
      orderItemEntity.order_id = orderId;
      orderItemEntity.product_id = item.product_id;
      orderItemEntity.quantity = item.quantity;
      orderItemEntity.price = item.price;
      return orderItemEntity;
    });
  }

  private _buildOrderStatusHistoryEntity(
    orderId: number,
    orderStatusId: number,
  ): OrderStatusHistory {
    const orderStatusHistoryEntity = new OrderStatusHistory();
    orderStatusHistoryEntity.order_id = orderId;
    orderStatusHistoryEntity.order_status_id = orderStatusId;
    return orderStatusHistoryEntity;
  }

  async createOrder(order: OrderRecord): Promise<Order> {
    return this.orderRepository.manager.transaction(
      async (transaction: EntityManager) => {
        const orderEntity = this._buildOrderEntity(order);

        const newOrder = await transaction.save(orderEntity);

        const orderItemsEntity = this._buildOrderItemsEntity(
          order,
          newOrder.order_id,
        );

        await transaction.save(OrderItem, orderItemsEntity);

        const orderStatusHistoryEntity = this._buildOrderStatusHistoryEntity(
          newOrder.order_id,
          newOrder.order_status_id,
        );

        await transaction.save(OrderStatusHistory, orderStatusHistoryEntity);

        return newOrder;
      },
    );
  }
}
