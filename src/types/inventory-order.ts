export interface InventoryOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  items: {
    itemId: string;
    itemName: string;
    quantity: number;
    price: number;
    receivedQuantity: number;
  }[];
  totalItems: number;
  totalPrice: number;
  receivedPercentage: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface InventoryOrderFormData {
  supplierId: string;
  items: {
    itemId: string;
    quantity: number;
    price: number;
  }[];
}

export interface InventoryOrderFilterOptions {
  supplierId?: string;
  startDate?: string;
  endDate?: string;
  status?: 'pending' | 'processing' | 'completed' | 'cancelled' | 'all';
  minPercentage?: number;
  maxPercentage?: number;
  search?: string;
}

export interface ReceiveOrderFormData {
  items: {
    itemId: string;
    receivedQuantity: number;
  }[];
}