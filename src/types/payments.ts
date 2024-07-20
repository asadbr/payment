export type TPayment = {
  default_currency: string;
  currencies: {
    CRYPTO: TPaymentMethod[];
    RUB: TPaymentMethod[];
    USD: TPaymentMethod[];
  };
};

export type TPaymentMethod = {
  title: string;
  commission: string;
  min_amount: number;
  description: string;
  sort_order: number;
};
