export interface Product {
  updated_at: Date;
  tax: number;
  stock: number;
  price: number;
  name: string;
  inserted_at: Date;
  id: number;
  details: object;
  brand_id: number;
}
export interface OrderItem {
  updated_at: Date;
  unitPrice: number;
  product_id: number;
  order_id: number;
  inserted_at: Date;
  id: number;
  amount: number;
}
export interface Order {
  updated_at: Date;
  message: string;
  inserted_at: Date;
  id: number;
  details: object;
  customer_id: number;
  creationDate: Date;
}
export interface Brand {
  updated_at: Date;
  name: string;
  inserted_at: Date;
  id: number;
  details: object;
}
export interface Delivery {
  updated_at: Date;
  order_id: number;
  inserted_at: Date;
  id: number;
  fare: number;
  details: object;
  customer_id: number;
  address: object;
}
export interface Customer {
  updated_at: Date;
  pincode: string;
  phone: string;
  name: string;
  inserted_at: Date;
  id: number;
  details: object;
}

class ProductImpl implements Product {
  public name: string;
  public stock: number;
  public tax: number;
  public price: number;
  public details: object;
  public brand_id: number;
  public id: number;
  public updated_at: Date;
  public inserted_at: Date;

  constructor(name = '', stock = 0, tax = 0, price = 0, details = {}, brand_id = -1, id = -1) {
    this.name = name;
    this.stock = stock;
    this.tax = tax;
    this.price = price;
    this.details = details;
    this.brand_id = brand_id;
    this.id = id;
    this.updated_at = new Date();
    this.inserted_at = new Date();
  }
}

// Factory method
export function getEmptyProduct() {
  return new ProductImpl();
}
