import { useAtomValue } from 'jotai';
import { getSupplierOrdersAtom } from '../store/supplier-orders';

export function useSupplierOrders() {
  const getSupplierOrders = useAtomValue(getSupplierOrdersAtom);

  return {
    getSupplierOrders,
  };
}