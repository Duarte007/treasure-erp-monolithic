export class OrderItemsDB {
  id: number;
  quantity: number;
}

export class OrderCustomerDB {
  document: string;
}

export class OrderPaymentDB {
  method: string;
  amount: number;
  date: Date;
}

export class OrderDB {
  customer: OrderCustomerDB;
  payment: OrderPaymentDB;
  items: OrderItemsDB;
  date: Date;
  value: number;
}
