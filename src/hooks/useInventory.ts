import { useAtom, useAtomValue } from 'jotai';
import {
  inventoryAtom,
  addInventoryItemAtom,
  updateInventoryItemAtom,
  deleteInventoryItemsAtom,
  getInventoryItemByIdAtom,
  filteredInventoryItemsAtom,
} from '../store/inventory';
import { InventoryFormData, InventoryFilterOptions } from '../types/inventory';

export function useInventory() {
  const [items] = useAtom(inventoryAtom);
  const [, addItem] = useAtom(addInventoryItemAtom);
  const [, updateItem] = useAtom(updateInventoryItemAtom);
  const [, deleteItems] = useAtom(deleteInventoryItemsAtom);
  const getItemById = useAtomValue(getInventoryItemByIdAtom);
  const getFilteredItems = useAtomValue(filteredInventoryItemsAtom);

  return {
    items,
    addItem,
    updateItem,
    deleteItems,
    getItemById,
    getFilteredItems,
  };
}