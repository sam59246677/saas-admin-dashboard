import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import ProductFormModal from "../components/ProductFormModal";
import ProductFilters from "../components/ProductFilters";
import ProductTable from "../components/ProductTable";
import ProductPagination from "../components/ProductPagination";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import ProductSummaryCards from "../components/ProductSummaryCards";

import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../services/productsService";

import type {
  Product,
  Category,
  Status,
  SortBy,
  SortOrder,
} from "../types/product";

function Products() {
  const [category, setCategory] =
    useState<Category>("all");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [status, setStatus] =
    useState<Status>("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [deletingProduct, setDeletingProduct] =
    useState<Product | null>(null);

  const [sortBy, setSortBy] =
    useState<SortBy>("none");

  const [sortOrder, setSortOrder] =
    useState<SortOrder>("asc");

  const [toastMessage, setToastMessage] =
    useState("");

  const [toastType, setToastType] =
    useState<"success" | "error">("success");

  function showToast(
    message: string,
    type: "success" | "error"
  ) {
    setToastMessage(message);
    setToastType(type);
  }

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const totalProducts =
    products?.length ?? 0;

  const activeProducts =
    products?.filter(
      (product) =>
        product.status === "active"
    ).length ?? 0;

  const lowStockProducts =
    products?.filter(
      (product) =>
        product.stock > 0 &&
        product.stock <= 5
    ).length ?? 0;

  const outOfStockProducts =
    products?.filter(
      (product) => product.stock === 0
    ).length ?? 0;

  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: addProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setIsAddModalOpen(false);

      showToast(
        "Product added successfully.",
        "success"
      );
    },

    onError: () => {
      showToast(
        "Failed to add product.",
        "error"
      );
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({
      id,
      product,
    }: {
      id: number;
      product: Omit<Product, "id">;
    }) => updateProduct(id, product),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setEditingProduct(null);

      showToast(
        "Product updated successfully.",
        "success"
      );
    },

    onError: () => {
      showToast(
        "Failed to update product.",
        "error"
      );
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setDeletingProduct(null);

      showToast(
        "Product deleted successfully.",
        "success"
      );
    },

    onError: () => {
      showToast(
        "Failed to delete product.",
        "error"
      );
    },
  });

  function handleAddProduct(
    data: Omit<Product, "id">
  ) {
    addProductMutation.mutate(data);
  }

  function handleEditProduct(
    product: Product
  ) {
    setEditingProduct(product);
  }

  function handleUpdateProduct(
    data: Omit<Product, "id">
  ) {
    if (!editingProduct) {
      return;
    }

    updateProductMutation.mutate({
      id: editingProduct.id,
      product: data,
    });
  }

  function handleDeleteProduct(
    product: Product
  ) {
    setDeletingProduct(product);
  }

  const filteredProducts =
    products?.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesCategory =
        category === "all" ||
        product.category.toLowerCase() ===
          category;

      const matchesStatus =
        status === "all" ||
        product.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });

  const sortedProducts = [
    ...(filteredProducts ?? []),
  ].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    if (sortBy === "price") {
      return sortOrder === "asc"
        ? a.price - b.price
        : b.price - a.price;
    }

    if (sortBy === "stock") {
      return sortOrder === "asc"
        ? a.stock - b.stock
        : b.stock - a.stock;
    }

    return 0;
  });

  const productsPerPage = 5;

  const totalPages = Math.ceil(
    sortedProducts.length /
      productsPerPage
  );

  const safeCurrentPage =
    totalPages > 0
      ? Math.min(currentPage, totalPages)
      : 1;

  const startIndex =
    (safeCurrentPage - 1) *
    productsPerPage;

  const endIndex =
    startIndex + productsPerPage;

  const paginatedProducts =
    sortedProducts.slice(
      startIndex,
      endIndex
    );

  if (isLoading) {
    return (
      <LoadingState message="Loading products..." />
    );
  }

  if (isError) {
    return (
      <ErrorState message="Failed to load products." />
    );
  }

  return (
    <div>
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() =>
            setToastMessage("")
          }
        />
      )}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Products
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Manage your products.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsAddModalOpen(true)
          }
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          + Add Product
        </button>
      </div>

      <ProductSummaryCards
        totalProducts={totalProducts}
        activeProducts={activeProducts}
        lowStockProducts={
          lowStockProducts
        }
        outOfStockProducts={
          outOfStockProducts
        }
      />

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <ProductFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            category={category}
            setCategory={setCategory}
            status={status}
            setStatus={setStatus}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            setCurrentPage={
              setCurrentPage
            }
          />

          <div className="mt-4 px-4 text-sm text-slate-500 sm:px-6 dark:text-slate-400">
            Showing{" "}
            {filteredProducts?.length ?? 0}{" "}
            of {products?.length ?? 0}{" "}
            products
          </div>

          <ProductTable
            products={paginatedProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />

          {filteredProducts &&
            filteredProducts.length > 0 && (
              <ProductPagination
                currentPage={
                  safeCurrentPage
                }
                totalPages={totalPages}
                onPageChange={
                  setCurrentPage
                }
              />
            )}

          {isAddModalOpen && (
            <ProductFormModal
              title="Add Product"
              description="Create a new product."
              onSubmit={handleAddProduct}
              onCancel={() =>
                setIsAddModalOpen(false)
              }
              isSubmitting={
                addProductMutation.isPending
              }
            />
          )}

          {editingProduct && (
            <ProductFormModal
              title="Edit Product"
              description="Update product information."
              initialData={
                editingProduct
              }
              onSubmit={
                handleUpdateProduct
              }
              onCancel={() =>
                setEditingProduct(null)
              }
              isSubmitting={
                updateProductMutation.isPending
              }
              isEditMode={true}
            />
          )}

          {deletingProduct && (
            <ConfirmModal
              title="Delete Product?"
              message={
                <>
                  Are you sure you want
                  to delete{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {
                      deletingProduct.name
                    }
                  </span>
                  ?
                </>
              }
              confirmText="Delete"
              isLoading={
                deleteProductMutation.isPending
              }
              onConfirm={() => {
                deleteProductMutation.mutate(
                  deletingProduct.id
                );
              }}
              onCancel={() =>
                setDeletingProduct(null)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;