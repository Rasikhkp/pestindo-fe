export interface InventoryItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  unit: string;
  createdAt: string;
}

export interface InventoryFormData {
  name: string;
  price: number;
  stock: number;
  unit: string;
}

export interface InventoryFilterOptions {
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
  unit?: string;
  search?: string;
}