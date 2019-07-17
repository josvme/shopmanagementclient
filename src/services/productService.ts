import { Product, getEmptyProduct } from '@/types/types';
import { BaseService } from './baseService';

export class ProductService extends BaseService<Product> {

  // constructors should call parent class with super()
  constructor(endpoint: string, entity: string, requestPrefix: string) {
    super(endpoint, entity, requestPrefix);
  }

  public getEmpty(): Product {
    return getEmptyProduct();
  }
}
