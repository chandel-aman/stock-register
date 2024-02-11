export interface Transaction {
  _id: string;
  orderId: string;
  orderDate: Date;
  orderAmount: number;
  transactionFees: number;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}
