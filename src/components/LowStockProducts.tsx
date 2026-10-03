import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../services/productsService";

function LowStockProducts() {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Loading low stock products...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm sm:p-6 dark:border-red-900 dark:bg-red-950">
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load low stock products.
        </p>
      </div>
    );
  }

  const lowStockProducts = [...products]
    .filter((product) => product.stock <= 5)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Low Stock Products
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Products that need attention
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[450px] w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <th className="pb-3 font-medium">
                Product
              </th>

              <th className="pb-3 font-medium">
                Category
              </th>

              <th className="pb-3 font-medium">
                Stock
              </th>
            </tr>
          </thead>

          <tbody>
            {lowStockProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-slate-200 last:border-0 dark:border-slate-800"
              >
                <td className="py-4 text-sm font-medium text-slate-900 dark:text-white">
                  {product.name}
                </td>

                <td className="py-4 text-sm capitalize text-slate-600 dark:text-slate-400">
                  {product.category}
                </td>

                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      product.stock === 0
                        ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                    }`}
                  >
                    {product.stock === 0
                      ? "Out of Stock"
                      : `${product.stock} left`}
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

export default LowStockProducts;