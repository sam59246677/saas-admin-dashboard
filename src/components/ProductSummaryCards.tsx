import {Package,CheckCircle, AlertTriangle,XCircle,} from "lucide-react";

interface ProductSummaryCardsProps {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
}

function ProductSummaryCards({
  totalProducts,
  activeProducts,
  lowStockProducts,
  outOfStockProducts,
}: ProductSummaryCardsProps) {
  const cards = [
    {
      title: "Total Products",
      value: totalProducts,
      description: "All products",
      icon: Package,
      iconClassName:"bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      title: "Active Products",
      value: activeProducts,
      description: "Currently active",
      icon: CheckCircle,
      iconClassName:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
    {
      title: "Low Stock",
      value: lowStockProducts,
      description: "Need attention",
      icon: AlertTriangle,
      iconClassName:"bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    },
    {
      title: "Out of Stock",
      value: outOfStockProducts,
      description: "Currently unavailable",
      icon: XCircle,
      iconClassName:"bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    },
  ];

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div key={card.title}className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {card.title}
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {card.value}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg ${card.iconClassName}`}>
                <Icon
                  size={22}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default ProductSummaryCards;