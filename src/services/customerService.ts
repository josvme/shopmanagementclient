import { Customer, getEmptyCustomer } from '@/types/types';
import { BaseService } from './baseService';

export class CustomerService extends BaseService<Customer> {

  // constructors should call parent class with super()
  constructor(endpoint: string, entity: string, requestPrefix: string) {
    super(endpoint, entity, requestPrefix);
  }

  public getEmpty(): Customer {
    return getEmptyCustomer();
  }
}
