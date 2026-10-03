import type { Product } from "../types/product";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function getStockStatus(stock: number) {
  if (stock === 0) {
    return {
      label: "Out of Stock",
      className:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
  }

  if (stock <= 5) {
    return {
      label: "Low Stock",
      className:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    };
  }

  return {
    label: "In Stock",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  };
}

function getCategoryLabel(category: Product["category"]) {
  if (category === "laptop") {
    return {
      label: "Laptop",
      className:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    };
  }

  if (category === "smartphone") {
    return {
      label: "Smartphone",
      className:
        "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
    };
  }

  return {
    label: "Accessories",
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  };
}

function getStatusLabel(status: Product["status"]) {
  if (status === "active") {
    return {
      label: "Active",
      className:
        "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    };
  }

  return {
    label: "Inactive",
    className:
      "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  };
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[900px] w-full text-left">
        <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Product
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Category
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Price
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Stock
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Status
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {products.length > 0 ? (
            products.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              const categoryStatus = getCategoryLabel(product.category);
              const statusInfo = getStatusLabel(product.status);

              return (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                    {product.name}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${categoryStatus.className}`}
                    >
                      {categoryStatus.label}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                    {formatPrice(product.price)}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {product.stock}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${stockStatus.className}`}
                      >
                        {stockStatus.label}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusInfo.className}`}
                    >
                      {statusInfo.label}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onEdit(product)}
                        aria-label={`Edit ${product.name}`}
                        className="rounded px-2 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-800 dark:text-blue-400 dark:hover:bg-blue-950 dark:hover:text-blue-300"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(product)}
                        aria-label={`Delete ${product.name}`}
                        className="rounded px-2 py-1 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-800 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default ProductTable;