export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status: "active" | "inactive";
}

export type ProductCategory =
  | "laptop"
  | "smartphone"
  | "accessories";

export type Category =
  | "all"
  | "laptop"
  | "smartphone"
  | "accessories";

export type Status =
  | "all"
  | "active"
  | "inactive";

export type SortBy =
  | "none"
  | "name"
  | "price"
  | "stock";

export type SortOrder = "asc" | "desc";