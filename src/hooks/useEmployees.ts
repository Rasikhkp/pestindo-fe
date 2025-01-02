import { useAtom, useAtomValue } from 'jotai';
import {
  employeesAtom,
  addEmployeeAtom,
  updateEmployeeAtom,
  deleteEmployeesAtom,
  getEmployeeByIdAtom,
  filteredEmployeesAtom,
} from '../store/employees';
import { EmployeeFormData, EmployeeFilterOptions } from '../types/employee';

export function useEmployees() {
  const [employees] = useAtom(employeesAtom);
  const [, addEmployee] = useAtom(addEmployeeAtom);
  const [, updateEmployee] = useAtom(updateEmployeeAtom);
  const [, deleteEmployees] = useAtom(deleteEmployeesAtom);
  const getEmployeeById = useAtomValue(getEmployeeByIdAtom);
  const getFilteredEmployees = useAtomValue(filteredEmployeesAtom);

  return {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployees,
    getEmployeeById,
    getFilteredEmployees,
  };
}