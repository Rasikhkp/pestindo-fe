import { atom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { InventoryItem, InventoryFormData, InventoryFilterOptions } from '../types/inventory';
import inventoryData from '../data/inventory.json';

export const inventoryAtom = atom<InventoryItem[]>(inventoryData.items);

export const addInventoryItemAtom = atom(
  null,
  (get, set, formData: InventoryFormData) => {
    const items = get(inventoryAtom);
    const newItem: InventoryItem = {
      id: `INV${uuidv4().substring(0, 4)}`,
      ...formData,
      createdAt: new Date().toISOString(),
    };
    set(inventoryAtom, [...items, newItem]);
    return newItem;
  }
);

export const updateInventoryItemAtom = atom(
  null,
  (get, set, { id, data }: { id: string; data: InventoryFormData }) => {
    const items = get(inventoryAtom);
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, ...data } : item
    );
    set(inventoryAtom, updatedItems);
  }
);

export const deleteInventoryItemsAtom = atom(
  null,
  (get, set, ids: string[]) => {
    const items = get(inventoryAtom);
    set(inventoryAtom, items.filter((item) => !ids.includes(item.id)));
  }
);

export const getInventoryItemByIdAtom = atom(
  (get) => (id: string) => {
    const items = get(inventoryAtom);
    return items.find((item) => item.id === id);
  }
);

export const filteredInventoryItemsAtom = atom(
  (get) => (filters: InventoryFilterOptions) => {
    const items = get(inventoryAtom);
    return items.filter((item) => {
      if (filters.minPrice && item.price < filters.minPrice) return false;
      if (filters.maxPrice && item.price > filters.maxPrice) return false;
      if (filters.minStock && item.stock < filters.minStock) return false;
      if (filters.maxStock && item.stock > filters.maxStock) return false;
      if (filters.unit && item.unit !== filters.unit) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.id.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }
);