import { useAtom, useAtomValue } from 'jotai';
import {
  customersAtom,
  addCustomerAtom,
  updateCustomerAtom,
  deleteCustomersAtom,
  getCustomerByIdAtom,
} from '../store/customers';
import { CustomerFormData } from '../types/customer';

export function useCustomers() {
  const [customers] = useAtom(customersAtom);
  const [, addCustomer] = useAtom(addCustomerAtom);
  const [, updateCustomer] = useAtom(updateCustomerAtom);
  const [, deleteCustomers] = useAtom(deleteCustomersAtom);
  const getCustomerById = useAtomValue(getCustomerByIdAtom);

  return {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomers,
    getCustomerById,
  };
}