import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import type {
  Product,
  ProductCategory,
} from "../types/product";

// -----------------------------
// Validation Schema
// -----------------------------

const productSchema = yup.object({
  name: yup
    .string()
    .required("Product name is required"),

  category: yup
    .mixed<ProductCategory>()
    .oneOf([
      "laptop",
      "smartphone",
      "accessories",
    ])
    .required("Category is required"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),

  stock: yup
    .number()
    .typeError("Stock must be a number")
    .min(0, "Stock cannot be negative")
    .integer("Stock must be an integer")
    .required("Stock is required"),

  status: yup
    .mixed<"active" | "inactive">()
    .oneOf(["active", "inactive"])
    .required("Status is required"),
});


// Type generated from Yup schema
type ProductFormData = yup.InferType<typeof productSchema>;


// -----------------------------
// Props
// -----------------------------

interface ProductFormProps {
  initialData?: Product;

  onSubmit: (
    data: Omit<Product, "id">
  ) => void;

  onCancel: () => void;

  isSubmitting?: boolean;

  isEditMode?: boolean;
}


// -----------------------------
// Component
// -----------------------------

function ProductForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  isEditMode = false,
}: ProductFormProps) {

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),

    defaultValues: {
      name: "",
      category: "laptop",
      price: 0,
      stock: 0,
      status: "active",
    },
  });


  // -----------------------------
  // Load initial data when editing
  // -----------------------------

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        category: initialData.category,
        price: initialData.price,
        stock: initialData.stock,
        status: initialData.status,
      });
    } else {
      reset({
        name: "",
        category: "laptop",
        price: 0,
        stock: 0,
        status: "active",
      });
    }
  }, [initialData, reset]);


  // -----------------------------
  // Render
  // -----------------------------

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      {/* Product Name */}

      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Product Name
        </label>

        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>


      {/* Category */}

      <div>
        <label
          htmlFor="category"
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Category
        </label>

        <select
          id="category"
          {...register("category")}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <option value="laptop">
            laptop
          </option>

          <option value="smartphone">
            smartphone
          </option>

          <option value="accessories">
            accessories
          </option>
        </select>

        {errors.category && (
          <p className="mt-1 text-sm text-red-600">
            {errors.category.message}
          </p>
        )}
      </div>


      {/* Price */}

      <div>
        <label
          htmlFor="price"
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Price
        </label>

        <input
          id="price"
          type="number"
          {...register("price", {
            valueAsNumber: true,
          })}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />

        {errors.price && (
          <p className="mt-1 text-sm text-red-600">
            {errors.price.message}
          </p>
        )}
      </div>


      {/* Stock */}

      <div>
        <label
          htmlFor="stock"
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Stock
        </label>

        <input
          id="stock"
          type="number"
          {...register("stock", {
            valueAsNumber: true,
          })}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />

        {errors.stock && (
          <p className="mt-1 text-sm text-red-600">
            {errors.stock.message}
          </p>
        )}
      </div>


      {/* Status */}

      <div>
        <label
          htmlFor="status"
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Status
        </label>

        <select
          id="status"
          {...register("status")}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>
        </select>

        {errors.status && (
          <p className="mt-1 text-sm text-red-600">
            {errors.status.message}
          </p>
        )}
      </div>


      {/* Buttons */}

      <div className="flex justify-end gap-3 pt-2">

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Cancel
        </button>


        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          {isSubmitting
            ? isEditMode
              ? "Updating..."
              : "Adding..."
            : isEditMode
              ? "Update Product"
              : "Add Product"}
        </button>
      </div>
    </form>
  );
}
export default ProductForm;