interface ErrorStateProps {
  message?: string;
}

function ErrorState({
  message = "Something went wrong.",
}: ErrorStateProps) {
  return (
    <div
      className="
        rounded-xl
        border
        border-red-200
        bg-red-50
        p-4
        sm:p-6
        dark:border-red-900
        dark:bg-red-950
      "
    >
      <h2
        className="
          font-semibold
          text-red-700
          dark:text-red-400
        "
      >
        Error
      </h2>

      <p
        className="
          mt-1
          text-sm
          text-red-600
          dark:text-red-400
        "
      >
        {message}
      </p>
    </div>
  );
}
export default ErrorState;