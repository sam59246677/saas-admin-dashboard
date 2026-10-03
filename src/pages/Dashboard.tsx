import { useQuery } from "@tanstack/react-query";

import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import RecentTransactions from "../components/RecentTransactions";
import RecentProducts from "../components/RecentProducts";
import LowStockProducts from "../components/LowStockProducts";

import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  if (isLoading) {
    return (
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Loading dashboard...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
        Failed to load dashboard data.
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-sm text-slate-500 dark:text-slate-400">
        No dashboard data available.
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Welcome back, Sam.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Revenue"
          value={stats.revenue}
          change={stats.revenueChange}
        />

        <StatCard
          title="Users"
          value={stats.users}
          change={stats.usersChange}
        />

        <StatCard
          title="Orders"
          value={stats.orders}
          change={stats.ordersChange}
        />
      </div>

      {/* Revenue Chart */}
      <div className="mt-6">
        <RevenueChart />
      </div>

      {/* Products */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <RecentProducts />
        <LowStockProducts />
      </div>

      {/* Recent Transactions */}
      <div className="mt-6">
        <RecentTransactions />
      </div>
    </div>
  );
}
export default Dashboard;