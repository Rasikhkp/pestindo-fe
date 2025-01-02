import { useAtom, useAtomValue } from 'jotai';
import {
  suppliersAtom,
  addSupplierAtom,
  updateSupplierAtom,
  deleteSuppliersAtom,
  getSupplierByIdAtom,
} from '../store/suppliers';
import { SupplierFormData } from '../types/supplier';

export function useSuppliers() {
  const [suppliers] = useAtom(suppliersAtom);
  const [, addSupplier] = useAtom(addSupplierAtom);
  const [, updateSupplier] = useAtom(updateSupplierAtom);
  const [, deleteSuppliers] = useAtom(deleteSuppliersAtom);
  const getSupplierById = useAtomValue(getSupplierByIdAtom);

  return {
    suppliers,
    addSupplier,
    updateSupplier,
    deleteSuppliers,
    getSupplierById,
  };
}