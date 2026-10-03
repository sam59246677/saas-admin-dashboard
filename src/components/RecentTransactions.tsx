import { useQuery } from "@tanstack/react-query";

import type { Transaction } from "../types/dashboard";

import { getRecentTransactions } from "../services/dashboardService";

function RecentTransactions() {
  const {
    data: transactions = [],
    isLoading,
    isError,
  } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: getRecentTransactions,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Loading transactions...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm sm:p-6 dark:border-red-900 dark:bg-red-950">
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load transactions.
        </p>
      </div>
    );
  }

  function getStatusClass(
    status: Transaction["status"]
  ) {
    switch (status) {
      case "Completed":
        return `
          bg-green-100
          text-green-700
          dark:bg-green-950
          dark:text-green-400
        `;

      case "Pending":
        return `
          bg-yellow-100
          text-yellow-700
          dark:bg-yellow-950
          dark:text-yellow-400
        `;

      case "Failed":
        return `
          bg-red-100
          text-red-700
          dark:bg-red-950
          dark:text-red-400
        `;
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Recent Transactions
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Latest transactions from your customers
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[600px] w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <th className="pb-3 font-medium">
                Customer
              </th>

              <th className="pb-3 font-medium">
                Product
              </th>

              <th className="pb-3 font-medium">
                Amount
              </th>

              <th className="pb-3 font-medium">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-slate-200 last:border-0 dark:border-slate-800"
              >
                <td className="py-4 text-sm font-medium text-slate-900 dark:text-white">
                  {transaction.customer}
                </td>

                <td className="py-4 text-sm text-slate-600 dark:text-slate-400">
                  {transaction.product}
                </td>

                <td className="py-4 text-sm text-slate-900 dark:text-white">
                  {transaction.amount}
                </td>

                <td className="py-4">
                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-medium
                      ${getStatusClass(transaction.status)}
                    `}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransactions;