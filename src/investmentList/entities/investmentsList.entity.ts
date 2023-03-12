export class InvestmentList {
  id?: string;
  startDate: Date;
  endDate: Date;
  amount: Number;
  active: Boolean;
  investmentId: String;
  ownerId: String;
}

export interface InvestmentListInterface {
  startDate: Date;
  endDate: Date;
  active: Boolean;
  amount: Number;
  investmentId: String;
}
