import type { Product } from "../types/product";
import ProductForm from "./ProductForm";

interface ProductFormModalProps {
  title: string;
  description: string;
  initialData?: Product;
  onSubmit: (data: Omit<Product, "id">) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  isEditMode?: boolean;
}

function ProductFormModal({
  title,
  description,
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
  isEditMode = false,
}: ProductFormModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2
              id="product-modal-title"
              className="text-xl font-semibold text-slate-900 dark:text-white"
            >
              {title}
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            ✕
          </button>
        </div>

        <ProductForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onCancel}
          isSubmitting={isSubmitting}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
}
export default ProductFormModal;