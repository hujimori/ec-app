export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  prices: {
    metadata: {
      unit_amount: number;
    };
  };
}
