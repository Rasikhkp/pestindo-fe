import { atom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { InventoryOrder, InventoryOrderFormData, InventoryOrderFilterOptions, ReceiveOrderFormData } from '../types/inventory-order';
import ordersData from '../data/inventory-orders.json';

export const inventoryOrdersAtom = atom<InventoryOrder[]>(ordersData.orders);

export const addInventoryOrderAtom = atom(
  null,
  (get, set, formData: InventoryOrderFormData) => {
    const orders = get(inventoryOrdersAtom);
    const newOrder: InventoryOrder = {
      id: `ORD${uuidv4().substring(0, 4)}`,
      ...formData,
      totalItems: formData.items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
      receivedPercentage: 0,
      status: 'pending',
      createdAt: new Date().toISOString(),
    } as InventoryOrder;
    set(inventoryOrdersAtom, [...orders, newOrder]);
    return newOrder;
  }
);

export const updateInventoryOrderAtom = atom(
  null,
  (get, set, { id, data }: { id: string; data: Partial<InventoryOrder> }) => {
    const orders = get(inventoryOrdersAtom);
    set(inventoryOrdersAtom, orders.map(order =>
      order.id === id ? { ...order, ...data } : order
    ));
  }
);

export const deleteInventoryOrdersAtom = atom(
  null,
  (get, set, ids: string[]) => {
    const orders = get(inventoryOrdersAtom);
    set(inventoryOrdersAtom, orders.filter(order => !ids.includes(order.id)));
  }
);

export const receiveInventoryOrderAtom = atom(
  null,
  (get, set, { id, data }: { id: string; data: ReceiveOrderFormData }) => {
    const orders = get(inventoryOrdersAtom);
    set(inventoryOrdersAtom, orders.map(order => {
      if (order.id !== id) return order;

      const updatedItems = order.items.map(item => {
        const receivedItem = data.items.find(i => i.itemId === item.itemId);
        return receivedItem ? { ...item, receivedQuantity: receivedItem.receivedQuantity } : item;
      });

      const totalReceived = updatedItems.reduce((sum, item) => sum + item.receivedQuantity, 0);
      const totalOrdered = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const receivedPercentage = Math.round((totalReceived / totalOrdered) * 100);

      return {
        ...order,
        items: updatedItems,
        receivedPercentage,
        status: receivedPercentage === 100 ? 'completed' : 'processing',
      };
    }));
  }
);

export const getInventoryOrderByIdAtom = atom(
  (get) => (id: string) => {
    const orders = get(inventoryOrdersAtom);
    return orders.find(order => order.id === id);
  }
);

export const filteredInventoryOrdersAtom = atom(
  (get) => (filters: InventoryOrderFilterOptions) => {
    const orders = get(inventoryOrdersAtom);
    return orders.filter(order => {
      if (filters.supplierId && order.supplierId !== filters.supplierId) return false;
      if (filters.status && filters.status !== 'all' && order.status !== filters.status) return false;
      if (filters.startDate && new Date(order.createdAt) < new Date(filters.startDate)) return false;
      if (filters.endDate && new Date(order.createdAt) > new Date(filters.endDate)) return false;
      if (filters.minPercentage && order.receivedPercentage < filters.minPercentage) return false;
      if (filters.maxPercentage && order.receivedPercentage > filters.maxPercentage) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          order.id.toLowerCase().includes(searchLower) ||
          order.supplierName.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }
);