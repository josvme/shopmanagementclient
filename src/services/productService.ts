import axios, { AxiosPromise } from 'axios';
import { Product, getEmptyProduct } from '@/types/types';

export class ProductService {

  private endpoint: string;
  private entity: string;

  constructor(endpoint: string, entity: string) {
    this.endpoint = endpoint;
    this.entity = entity;
  }

  public getAllRequest(): AxiosPromise<{ 'products': Product[] }> {
    const response = axios.get(`${this.endpoint}${this.entity}`);
    return response;
  }

  public createProduct(data: Product): AxiosPromise<{ 'product': Product }> {
    return axios.post(`${this.endpoint}${this.entity}`, { product: data });
  }

  public updateProduct(identifier: number, data: Product): AxiosPromise<{ 'product': Product }> {
    return axios.put(`${this.endpoint}${this.entity}/${identifier}`, { product: data });
  }

  public getProduct(identifier: number): AxiosPromise<{ 'product': Product }> {
    return axios.get(`${this.endpoint}${this.entity}/${identifier}`);
  }

  public deleteProduct(identifier: number): AxiosPromise<any> {
    return axios.delete(`${this.endpoint}${this.entity}/${identifier}`);
  }

  public getEmpty(): Product {
    return getEmptyProduct();
  }

}
