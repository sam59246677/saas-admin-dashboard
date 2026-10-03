import { TrendingUp, TrendingDown, } from "lucide-react";
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType?: "positive" | "negative";
}

function StatCard({
  title,
  value,
  change,
  changeType = "positive",
}: StatCardProps) {
  const ChangeIcon =
    changeType === "positive"
      ? TrendingUp
      : TrendingDown;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>

      <div
        className={`mt-2 flex items-center gap-1 text-sm font-medium ${changeType === "positive"
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
          }`}
      >
        <ChangeIcon
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        <span>{change}</span>
      </div>
    </div>
  );
}

export default StatCard;