import type {
  Category,
  Status,
  SortBy,
  SortOrder,
} from "../types/product";

interface ProductFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  category: Category;
  setCategory: (value: Category) => void;

  status: Status;
  setStatus: (value: Status) => void;

  sortBy: SortBy;
  setSortBy: (value: SortBy) => void;

  sortOrder: SortOrder;
  setSortOrder: (value: SortOrder) => void;

  setCurrentPage: (value: number) => void;
}

function ProductFilters({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  status,
  setStatus,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  setCurrentPage,
}: ProductFiltersProps) {
  return (
    <div className="mt-6 flex flex-col flex-wrap gap-3 sm:flex-row">
      {/* Search */}
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search products..."
        className="w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
      />

      {/* Category */}
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value as Category)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:w-52"
      >
        <option value="all">All Categories</option>
        <option value="laptop">Laptop</option>
        <option value="smartphone">Smartphone</option>
        <option value="accessories">Accessories</option>
      </select>

      {/* Status */}
      <select
        value={status}
        onChange={(event) => setStatus(event.target.value as Status)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:w-40"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      {/* Sort By */}
      <select
        value={sortBy}
        onChange={(event) => {
          setSortBy(event.target.value as SortBy);
          setCurrentPage(1);
        }}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:w-52"
      >
        <option value="none">Sort By</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="stock">Stock</option>
      </select>

      {/* Sort Order */}
      <select
        value={sortOrder}
        onChange={(event) => {
          setSortOrder(event.target.value as SortOrder);
          setCurrentPage(1);
        }}
        disabled={sortBy === "none"}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:w-40"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
export default ProductFilters;