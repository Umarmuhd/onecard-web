export interface Card {
  expires: string;
  network: string;
  origin: string;
  owner_name: string;
  payment_gateway_id: number | string;
  default_card: number;
}

export interface IssueCard {
  email: string;
  otp: string;
  last6Digit: string;
  cvc: string;
  pin: string;
}
