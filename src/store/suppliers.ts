import { atom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { Supplier, SupplierFormData } from '../types/supplier';
import suppliersData from '../data/suppliers.json';

export const suppliersAtom = atom<Supplier[]>(suppliersData.suppliers);

export const addSupplierAtom = atom(
  null,
  (get, set, formData: SupplierFormData) => {
    const suppliers = get(suppliersAtom);
    const newSupplier: Supplier = {
      id: `SUP${uuidv4().substring(0, 4)}`,
      ...formData,
      totalOrders: 0,
      createdAt: new Date().toISOString(),
    };
    set(suppliersAtom, [...suppliers, newSupplier]);
    return newSupplier;
  }
);

export const updateSupplierAtom = atom(
  null,
  (get, set, { id, data }: { id: string; data: SupplierFormData }) => {
    const suppliers = get(suppliersAtom);
    const updatedSuppliers = suppliers.map((supplier) =>
      supplier.id === id
        ? { ...supplier, ...data }
        : supplier
    );
    set(suppliersAtom, updatedSuppliers);
  }
);

export const deleteSuppliersAtom = atom(
  null,
  (get, set, ids: string[]) => {
    const suppliers = get(suppliersAtom);
    set(suppliersAtom, suppliers.filter((supplier) => !ids.includes(supplier.id)));
  }
);

export const getSupplierByIdAtom = atom(
  (get) => (id: string) => {
    const suppliers = get(suppliersAtom);
    return suppliers.find((supplier) => supplier.id === id);
  }
);