export interface RevenueData {
  month: string;
  revenue: number;
}

export interface Transaction {
  id: number;
  customer: string;
  product: string;
  amount: string;
  status: "Completed" | "Pending" | "Failed";
}
export interface DashboardStats {
  revenue: string;
  users: string;
  orders: string;
  revenueChange: string;
  usersChange: string;
  ordersChange: string;
}