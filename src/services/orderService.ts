import { Order, getEmptyOrder } from '@/types/types';
import { BaseService } from './baseService';

export class OrderService extends BaseService<Order> {

  // constructors should call parent class with super()
  constructor(endpoint: string, entity: string, requestPrefix: string) {
    super(endpoint, entity, requestPrefix);
  }

  public getEmpty(): Order {
    return getEmptyOrder();
  }
}
