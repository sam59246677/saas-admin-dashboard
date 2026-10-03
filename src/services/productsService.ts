import type { Product } from "../types/product";

let products: Product[] = [
  {
    id: 1,
    name: "MacBook Pro",
    category: "laptop",
    price: 2499,
    stock: 12,
    status: "active",
  },
  {
    id: 2,
    name: "iPhone 15",
    category: "smartphone",
    price: 999,
    stock: 25,
    status: "active",
  },
  {
    id: 3,
    name: "AirPods Pro",
    category: "accessories",
    price: 249,
    stock: 40,
    status: "active",
  },
  {
    id: 4,
    name: "Samsung Galaxy S24",
    category: "smartphone",
    price: 899,
    stock: 18,
    status: "active",
  },
  {
    id: 5,
    name: "Dell XPS 15",
    category: "laptop",
    price: 1899,
    stock: 8,
    status: "active",
  },
  {
    id: 6,
    name: "Logitech MX Master 3",
    category: "accessories",
    price: 99,
    stock: 35,
    status: "active",
  },
  {
    id: 7,
    name: "iPad Pro",
    category: "laptop",
    price: 1099,
    stock: 15,
    status: "active",
  },
  {
    id: 8,
    name: "Google Pixel 9",
    category: "smartphone",
    price: 799,
    stock: 20,
    status: "active",
  },
  {
    id: 9,
    name: "Mechanical Keyboard",
    category: "accessories",
    price: 129,
    stock: 30,
    status: "active",
  },
  {
    id: 10,
    name: "Lenovo ThinkPad X1",
    category: "laptop",
    price: 1599,
    stock: 10,
    status: "active",
  },
  {
    id: 11,
    name: "OnePlus 12",
    category: "smartphone",
    price: 699,
    stock: 22,
    status: "inactive",
  },
  {
    id: 12,
    name: "USB-C Hub",
    category: "accessories",
    price: 59,
    stock: 45,
    status: "active",
  },
  {
    id: 13,
    name: "HP Spectre x360",
    category: "laptop",
    price: 1399,
    stock: 7,
    status: "active",
  },
  {
    id: 14,
    name: "Xiaomi 14",
    category: "smartphone",
    price: 649,
    stock: 16,
    status: "active",
  },
  {
    id: 15,
    name: "Wireless Mouse",
    category: "accessories",
    price: 79,
    stock: 28,
    status: "active",
  },
  {
    id: 16,
    name: "ASUS ROG Zephyrus",
    category: "laptop",
    price: 2199,
    stock: 5,
    status: "active",
  },
  {
    id: 17,
    name: "Nothing Phone 2",
    category: "smartphone",
    price: 599,
    stock: 14,
    status: "inactive",
  },
  {
    id: 18,
    name: "Webcam HD",
    category: "accessories",
    price: 89,
    stock: 32,
    status: "active",
  },
  {
    id: 19,
    name: "Microsoft Surface Laptop",
    category: "laptop",
    price: 1499,
    stock: 9,
    status: "active",
  },
  {
    id: 20,
    name: "Sony Xperia 1",
    category: "smartphone",
    price: 1099,
    stock: 11,
    status: "active",
  },
];

export function getProducts(): Promise<Product[]> {
  return Promise.resolve(products);
}

export function addProduct(
  product: Omit<Product, "id">
): Promise<Product> {
  const newId =
    products.length > 0
      ? Math.max(...products.map((product) => product.id)) + 1
      : 1;

  const newProduct: Product = {
    id: newId,
    ...product,
  };

  products = [...products, newProduct];

  return Promise.resolve(newProduct);
}

export function updateProduct(
  id: number,
  updatedProduct: Omit<Product, "id">
): Promise<Product> {
  const index = products.findIndex(
    (product) => product.id === id
  );

  if (index === -1) {
    return Promise.reject(
      new Error("Product not found")
    );
  }

  const updatedProductWithId: Product = {
    id,
    ...updatedProduct,
  };

  products = products.map((product) =>
    product.id === id ? updatedProductWithId : product
  );

  return Promise.resolve(updatedProductWithId);
}

export function deleteProduct(
  id: number
): Promise<void> {
  const productExists = products.some(
    (product) => product.id === id
  );

  if (!productExists) {
    return Promise.reject(
      new Error("Product not found")
    );
  }

  products = products.filter(
    (product) => product.id !== id
  );

  return Promise.resolve();
}