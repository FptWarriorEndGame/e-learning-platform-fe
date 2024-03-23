export interface IOrder {
  _id: string;
  items: IOrderItem[];
  user: {
    _id: string;
    email: string;
    name: string;
    phone?: string;
    avatar?: string;
    createdAt?: string;
  };
  transaction: ITransaction;
  totalPrice: number;
  vatFee: number;
  note?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
}

interface ITransaction {
  transactionId?: string;
  status?: string;
  paidAt?: string;
  isPaid?: boolean;
  method: string; // STRIPE, PAYPAL, VNPAY, MOMO
}

export interface IOrderItem {
  courseId: string;
  name?: string;
  finalPrice?: number;
  thumbnail?: string;
  reviewed?: boolean;
}

export interface IOrderHistory {
  _id: string;
  items: IOrderHistoryItem[];
  user: {
    _id: string;
    email: string;
    name: string;
    phone?: string;
    avatar?: string;
    createdAt?: string;
  };
  transaction: ITransaction;
  totalPrice: number;
  vatFee: number;
  note?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
}

export interface IOrderHistoryItem {
  _id: string;
  name?: string;
  finalPrice?: number;
  thumbnail?: string;
  reviewed?: boolean;
}
