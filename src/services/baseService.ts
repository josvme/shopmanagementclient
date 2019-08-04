import axios, { AxiosPromise } from 'axios';

export abstract class BaseService<T> {

  /*
   * endpoint is the actual endpoint like http://localhost:8080/api/v1
   * entity is the identifier to find the entity we target. For eg: http://localhost:8080/{endpoint}
   * requestPrefix is used when we send data for creation and updating.
   * like {${requestPrefix}: data}
   */
  private endpoint: string;
  private entity: string;
  private requestPrefix: string;

  constructor(endpoint: string, entity: string, requestPrefix: string) {
    this.endpoint = endpoint;
    this.entity = entity;
    this.requestPrefix = requestPrefix;
  }

  public getAllRequest(): AxiosPromise<{ 'data': T[] }> {
    const response = axios.get(`${this.endpoint}${this.entity}`);
    return response;
  }

  public create(data: T): AxiosPromise<{ 'data': T}> {
    const request: {[key:string]: T} = {};
    request[this.requestPrefix] = data;
    return axios.post(`${this.endpoint}${this.entity}`, request);
  }

  public update(identifier: number, data: T): AxiosPromise<{ 'data': T}> {
    const request: {[key:string]: T} = {};
    request[this.requestPrefix] = data;
    return axios.put(`${this.endpoint}${this.entity}/${identifier}`, request);
  }

  public get(identifier: number): AxiosPromise<{ 'data': T}> {
    return axios.get(`${this.endpoint}${this.entity}/${identifier}`);
  }

  public delete(identifier: number): AxiosPromise<any> {
    return axios.delete(`${this.endpoint}${this.entity}/${identifier}`);
  }

  public search(searchTerm: {'term': string}): AxiosPromise<{'data': T[]}> {
    const response = axios.get(`${this.endpoint}${this.entity}/search?term=${searchTerm.term}`);
    return response;
  }

  public abstract getEmpty(): T;
}
