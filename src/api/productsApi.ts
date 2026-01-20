import { get, post, put, del, ApiResponse } from "./apiClient";
import { Product } from "@/data/products";

export async function getProducts(): Promise<ApiResponse<Product[]>> {
  return get<Product[]>("products");
}

export async function getProductById(id: number): Promise<ApiResponse<Product>> {
  return get<Product>(`products/${id}`);
}

export async function createProduct(product: Omit<Product, "id">): Promise<ApiResponse<Product>> {
  return post<Product>("products", product);
}

export async function updateProduct(id: number, product: Product): Promise<ApiResponse<Product>> {
  return put<Product>(`products/${id}`, product);
}

export async function deleteProduct(id: number): Promise<ApiResponse<{}>> {
  return del<{}>(`products/${id}`);
}
