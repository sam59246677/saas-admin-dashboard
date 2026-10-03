import type {RevenueData,Transaction, DashboardStats,} from "../types/dashboard";
const revenueData: RevenueData[] = [
  {
    month: "Jan",
    revenue: 12000,
  },
  {
    month: "Feb",
    revenue: 15000,
  },
  {
    month: "Mar",
    revenue: 13500,
  },
  {
    month: "Apr",
    revenue: 18000,
  },
  {
    month: "May",
    revenue: 21000,
  },
  {
    month: "Jun",
    revenue: 24500,
  },
];

const transactions: Transaction[] = [
  {
    id: 1,
    customer: "John Smith",
    product: "Laptop",
    amount: "$1,200",
    status: "Completed",
  },
  {
    id: 2,
    customer: "Sarah Wilson",
    product: "Headphones",
    amount: "$250",
    status: "Pending",
  },
  {
    id: 3,
    customer: "David Brown",
    product: "Keyboard",
    amount: "$120",
    status: "Failed",
  },
  {
    id: 4,
    customer: "Emily Johnson",
    product: "Monitor",
    amount: "$450",
    status: "Completed",
  },
];
const dashboardStats: DashboardStats = {
  revenue: "$24,500",
  users: "1,240",
  orders: "856",
  revenueChange: "+12.5%",
  usersChange: "+8.2%",
  ordersChange: "+5.4%",
};
export async function getRevenueData(): Promise<RevenueData[]> {
  return revenueData;
}
export async function getRecentTransactions(): Promise<Transaction[]> {
  return transactions;
}
export async function getDashboardStats(): Promise<DashboardStats> {
  return dashboardStats;
}
