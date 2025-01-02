import { atom } from 'jotai';
import { SupplierOrder } from '../types/supplier';
import ordersData from '../data/supplier-orders.json';

export const supplierOrdersAtom = atom<SupplierOrder[]>(ordersData.orders);

export const getSupplierOrdersAtom = atom(
  (get) => (supplierId: string) => {
    const orders = get(supplierOrdersAtom);
    return orders.filter((order) => order.supplierId === supplierId);
  }
);