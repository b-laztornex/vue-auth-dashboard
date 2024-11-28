// Interface for Asset
export interface Asset {
  type: string;
  market_worth: number;
  valuation_history: { date: Date; value: number }[];
}

// Interface for User
export interface User {
  _id: string;
  username: string;
  role: string;
  assets: Asset[];
}

// Example of additional interfaces for other components
export interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
  }>;
}
