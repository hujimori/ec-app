export interface Price {
  active: boolean;
  billing_scheme: string;
  currency: string;
  description: string;
  interval: string;
  interval_count: number;
  metadata: {
    product: string;
    recurring: {
      interval: string;
      interval_count: number;
    };
    tax_behavior: string;
    tiers: {
      flat_amount: number;
      unit_amount: number;
      up_to: number;
    }[];
    tiers_mode: string;
    transform_quantity: {
      divide_by: number;
      round: string;
    };
    trial_period_days: number;
    type: string;
    unit_amount: number;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: Price;
}
