export interface InventoryRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'check_in' | 'check_out';
  status: 'pending' | 'approved' | 'rejected';
  items: {
    itemId: string;
    itemName: string;
    quantity: number;
  }[];
  rejectionReason?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface InventoryRequestFormData {
  employeeId: string;
  type: 'check_in' | 'check_out';
  items: {
    itemId: string;
    quantity: number;
  }[];
}

export interface InventoryRequestFilterOptions {
  employeeId?: string;
  type?: 'check_in' | 'check_out' | 'all';
  status?: 'pending' | 'approved' | 'rejected' | 'all';
  search?: string;
}