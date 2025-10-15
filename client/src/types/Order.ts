export interface OrderItem {
 
  _id: string;
  quantity: number;
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };


}

export interface Shipping {
  method: string;
  address: string;
  cost: number;
}

export interface Totals {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface Customer {
  firstName: string;
  email: string;
  phone?: string;
}

export interface Order {
  _id: string;
  customer: Customer;
  items: OrderItem[];
  shipping: Shipping;
  totals: Totals;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}


