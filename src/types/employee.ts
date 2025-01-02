import { Address } from './customer';

export type Position = 'manager' | 'supervisor' | 'staff' | 'technician' | 'admin' | 'sales';

export interface Employee {
  id: string;
  name: string;
  nik: string;
  email: string;
  phone: string;
  position: Position;
  legalAddress: Address;
  currentAddress: Address;
  createdAt: string;
}

export interface EmployeeFormData {
  name: string;
  nik: string;
  email: string;
  phone: string;
  position: Position;
  legalAddress: Address;
  currentAddress: Address;
}

export interface EmployeeFilterOptions {
  position?: Position | 'all';
  search?: string;
}