import { atom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { InventoryLog, InventoryLogFilterOptions } from '../types/inventory-log';
import logsData from '../data/inventory-logs.json';

export const inventoryLogsAtom = atom<InventoryLog[]>(logsData.logs);

export const addInventoryLogAtom = atom(
  null,
  (get, set, log: Omit<InventoryLog, 'id' | 'createdAt'>) => {
    const logs = get(inventoryLogsAtom);
    const newLog: InventoryLog = {
      id: `LOG${uuidv4().substring(0, 4)}`,
      ...log,
      createdAt: new Date().toISOString(),
    };
    set(inventoryLogsAtom, [...logs, newLog]);
    return newLog;
  }
);

export const getFilteredLogsAtom = atom(
  (get) => (filters: InventoryLogFilterOptions) => {
    const logs = get(inventoryLogsAtom);
    return logs.filter((log) => {
      if (filters.itemId && log.itemId !== filters.itemId) return false;
      if (filters.type && filters.type !== 'all' && log.type !== filters.type) return false;
      if (filters.startDate && new Date(log.timestamp) < new Date(filters.startDate)) return false;
      if (filters.endDate && new Date(log.timestamp) > new Date(filters.endDate)) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          log.itemName.toLowerCase().includes(searchLower) ||
          log.id.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }
);