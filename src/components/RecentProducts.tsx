import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../services/productsService";

function RecentProducts() {
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
          Loading products...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm sm:p-6 dark:border-red-900 dark:bg-red-950">
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load products.
        </p>
      </div>
    );
  }

  const recentProducts = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Recent Products
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Recently added products
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[500px] w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <th className="pb-3 font-medium">
                Product
              </th>

              <th className="pb-3 font-medium">
                Category
              </th>

              <th className="pb-3 font-medium">
                Price
              </th>

              <th className="pb-3 font-medium">
                Stock
              </th>
            </tr>
          </thead>

          <tbody>
            {recentProducts.map((product) => (
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

                <td className="py-4 text-sm text-slate-900 dark:text-white">
                  ${product.price.toLocaleString()}
                </td>

                <td className="py-4 text-sm text-slate-600 dark:text-slate-400">
                  {product.stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default RecentProducts;