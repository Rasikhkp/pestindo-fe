export interface InventoryLog {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  type: 'in' | 'out';
  timestamp: string;
  createdAt: string;
}

export interface InventoryLogFilterOptions {
  itemId?: string;
  startDate?: string;
  endDate?: string;
  type?: 'in' | 'out' | 'all';
  search?: string;
}