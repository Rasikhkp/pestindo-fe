import { atom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { Customer, CustomerFormData } from '../types/customer';
import customersData from '../data/customers.json';

export const customersAtom = atom<Customer[]>(customersData.customers);

export const addCustomerAtom = atom(
  null,
  (get, set, formData: CustomerFormData) => {
    const customers = get(customersAtom);
    const newCustomer: Customer = {
      id: `CUS${uuidv4().substring(0, 4)}`,
      ...formData,
      totalJobs: 0,
      createdAt: new Date().toISOString(),
    };
    set(customersAtom, [...customers, newCustomer]);
    return newCustomer;
  }
);

export const updateCustomerAtom = atom(
  null,
  (get, set, { id, data }: { id: string; data: CustomerFormData }) => {
    const customers = get(customersAtom);
    const updatedCustomers = customers.map((customer) =>
      customer.id === id
        ? { ...customer, ...data }
        : customer
    );
    set(customersAtom, updatedCustomers);
  }
);

export const deleteCustomersAtom = atom(
  null,
  (get, set, ids: string[]) => {
    const customers = get(customersAtom);
    set(customersAtom, customers.filter((customer) => !ids.includes(customer.id)));
  }
);

export const getCustomerByIdAtom = atom(
  (get) => (id: string) => {
    const customers = get(customersAtom);
    return customers.find((customer) => customer.id === id);
  }
);