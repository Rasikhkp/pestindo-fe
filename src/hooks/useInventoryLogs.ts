import { useAtom, useAtomValue } from 'jotai';
import {
  inventoryLogsAtom,
  addInventoryLogAtom,
  getFilteredLogsAtom,
} from '../store/inventory-logs';
import { InventoryLogFilterOptions } from '../types/inventory-log';

export function useInventoryLogs() {
  const [logs] = useAtom(inventoryLogsAtom);
  const [, addLog] = useAtom(addInventoryLogAtom);
  const getFilteredLogs = useAtomValue(getFilteredLogsAtom);

  return {
    logs,
    addLog,
    getFilteredLogs,
  };
}