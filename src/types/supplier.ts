import { Address } from './customer';

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  address: Address;
  totalOrders: number;
  createdAt: string;
}

export interface SupplierFormData {
  name: string;
  phone: string;
  address: Address;
}

export interface SupplierOrder {
  id: string;
  supplierId: string;
  totalItems: number;
  totalPrice: number;
  createdAt: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  receivedPercentage: number;
}