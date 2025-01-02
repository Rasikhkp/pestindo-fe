import { useAtom, useAtomValue } from 'jotai';
import {
  inventoryRequestsAtom,
  addInventoryRequestAtom,
  approveRequestAtom,
  rejectRequestAtom,
  getFilteredRequestsAtom,
} from '../store/inventory-requests';
import { InventoryRequestFormData, InventoryRequestFilterOptions } from '../types/inventory-request';

export function useInventoryRequests() {
  const [requests] = useAtom(inventoryRequestsAtom);
  const [, addRequest] = useAtom(addInventoryRequestAtom);
  const [, approveRequest] = useAtom(approveRequestAtom);
  const [, rejectRequest] = useAtom(rejectRequestAtom);
  const getFilteredRequests = useAtomValue(getFilteredRequestsAtom);

  return {
    requests,
    addRequest,
    approveRequest,
    rejectRequest,
    getFilteredRequests,
  };
}