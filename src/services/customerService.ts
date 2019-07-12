import axios, { AxiosPromise } from 'axios';
import { Customer, getEmptyCustomer } from '@/types/types';

export class CustomerService{

  private endpoint: string;
  private entity: string;

  constructor(endpoint: string, entity: string) {
    this.endpoint = endpoint;
    this.entity = entity;
  }

  public getAllRequest(): AxiosPromise<{ 'customers': Customer[] }> {
    const response = axios.get(`${this.endpoint}${this.entity}`);
    return response;
  }

  public createCustomer(data: Customer): AxiosPromise<{ 'customer': Customer }> {
    return axios.post(`${this.endpoint}${this.entity}`, { customer: data });
  }

  public updateCustomer(identifier: number, data: Customer): AxiosPromise<{ 'customer': Customer }> {
    return axios.put(`${this.endpoint}${this.entity}/${identifier}`, { customer: data });
  }

  public getCustomer(identifier: number): AxiosPromise<{ 'customer': Customer }> {
    return axios.get(`${this.endpoint}${this.entity}/${identifier}`);
  }

  public deleteCustomer(identifier: number): AxiosPromise<any> {
    return axios.delete(`${this.endpoint}${this.entity}/${identifier}`);
  }

  public getEmpty(): Customer {
    return getEmptyCustomer();
  }

}
