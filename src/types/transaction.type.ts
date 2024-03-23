export interface ITransaction {
  method: string;
  amount: number;
  bankCode: string;
  bankTranNo: string;
  cardType: string;
  payDate: Date;
  orderInfo: string;
  transactionNo: string;
}
