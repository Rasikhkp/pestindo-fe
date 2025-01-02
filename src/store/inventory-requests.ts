import { atom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { InventoryRequest, InventoryRequestFormData, InventoryRequestFilterOptions } from '../types/inventory-request';
import requestsData from '../data/inventory-requests.json';

export const inventoryRequestsAtom = atom<InventoryRequest[]>(requestsData.requests);

export const addInventoryRequestAtom = atom(
  null,
  (get, set, formData: InventoryRequestFormData) => {
    const requests = get(inventoryRequestsAtom);
    const newRequest: InventoryRequest = {
      id: `REQ${uuidv4().substring(0, 4)}`,
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    } as InventoryRequest;
    set(inventoryRequestsAtom, [...requests, newRequest]);
    return newRequest;
  }
);

export const approveRequestAtom = atom(
  null,
  (get, set, id: string) => {
    const requests = get(inventoryRequestsAtom);
    set(inventoryRequestsAtom, requests.map(request =>
      request.id === id ? { 
        ...request, 
        status: 'approved',
        updatedAt: new Date().toISOString()
      } : request
    ));
  }
);

export const rejectRequestAtom = atom(
  null,
  (get, set, { id, reason }: { id: string; reason: string }) => {
    const requests = get(inventoryRequestsAtom);
    set(inventoryRequestsAtom, requests.map(request =>
      request.id === id ? { 
        ...request, 
        status: 'rejected', 
        rejectionReason: reason,
        updatedAt: new Date().toISOString()
      } : request
    ));
  }
);

export const getFilteredRequestsAtom = atom(
  (get) => (filters: InventoryRequestFilterOptions) => {
    const requests = get(inventoryRequestsAtom);
    return requests.filter((request) => {
      if (filters.employeeId && request.employeeId !== filters.employeeId) return false;
      if (filters.type && filters.type !== 'all' && request.type !== filters.type) return false;
      if (filters.status && filters.status !== 'all' && request.status !== filters.status) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          request.employeeName.toLowerCase().includes(searchLower) ||
          request.id.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }
);