import { useAtom, useAtomValue } from 'jotai';
import {
  inventoryOrdersAtom,
  addInventoryOrderAtom,
  updateInventoryOrderAtom,
  deleteInventoryOrdersAtom,
  receiveInventoryOrderAtom,
  getInventoryOrderByIdAtom,
  filteredInventoryOrdersAtom,
} from '../store/inventory-orders';
import { InventoryOrderFormData, InventoryOrderFilterOptions, ReceiveOrderFormData } from '../types/inventory-order';

export function useInventoryOrders() {
  const [orders] = useAtom(inventoryOrdersAtom);
  const [, addOrder] = useAtom(addInventoryOrderAtom);
  const [, updateOrder] = useAtom(updateInventoryOrderAtom);
  const [, deleteOrders] = useAtom(deleteInventoryOrdersAtom);
  const [, receiveOrder] = useAtom(receiveInventoryOrderAtom);
  const getOrderById = useAtomValue(getInventoryOrderByIdAtom);
  const getFilteredOrders = useAtomValue(filteredInventoryOrdersAtom);

  return {
    orders,
    addOrder,
    updateOrder,
    deleteOrders,
    receiveOrder,
    getOrderById,
    getFilteredOrders,
  };
}