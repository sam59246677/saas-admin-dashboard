interface EmptyStateProps {
  message?: string;
}

function EmptyState({
  message = "No data found.",
}: EmptyStateProps) {
  return (
    <div
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-6
        text-center
        shadow-sm
        sm:p-8
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <h2
        className="
          text-lg
          font-semibold
          text-slate-900
          dark:text-white
        "
      >
        No Data
      </h2>

      <p
        className="
          mt-2
          text-sm
          text-slate-500
          dark:text-slate-400
        "
      >
        {message}
      </p>
    </div>
  );
}
export default EmptyState;