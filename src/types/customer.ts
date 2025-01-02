// Extend existing types
export type CustomerType = 'individual' | 'company';

export interface Address {
  provinceId: string;
  regencyId: string;
  districtId: string;
  details: string;
}

export interface Customer {
  id: string;
  type: CustomerType;
  name: string;
  identityNumber: string; // NPWP/NIK
  legalAddress: Address;
  currentAddress: Address;
  phone: string;
  totalJobs: number;
  createdAt: string;
}

export interface CustomerFormData {
  type: CustomerType;
  name: string;
  identityNumber: string;
  legalAddress: Address;
  currentAddress: Address;
  phone: string;
}

export interface CustomerFilterOptions {
  type: CustomerType | 'all';
  minJobs: number;
  maxJobs: number;
}