import { atom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { Employee, EmployeeFormData, EmployeeFilterOptions } from '../types/employee';
import employeesData from '../data/employees.json';

export const employeesAtom = atom<Employee[]>(employeesData.employees);

export const addEmployeeAtom = atom(
  null,
  (get, set, formData: EmployeeFormData) => {
    const employees = get(employeesAtom);
    const newEmployee: Employee = {
      id: `EMP${uuidv4().substring(0, 4)}`,
      ...formData,
      createdAt: new Date().toISOString(),
    };
    set(employeesAtom, [...employees, newEmployee]);
    return newEmployee;
  }
);

export const updateEmployeeAtom = atom(
  null,
  (get, set, { id, data }: { id: string; data: EmployeeFormData }) => {
    const employees = get(employeesAtom);
    const updatedEmployees = employees.map((employee) =>
      employee.id === id
        ? { ...employee, ...data }
        : employee
    );
    set(employeesAtom, updatedEmployees);
  }
);

export const deleteEmployeesAtom = atom(
  null,
  (get, set, ids: string[]) => {
    const employees = get(employeesAtom);
    set(employeesAtom, employees.filter((employee) => !ids.includes(employee.id)));
  }
);

export const getEmployeeByIdAtom = atom(
  (get) => (id: string) => {
    const employees = get(employeesAtom);
    return employees.find((employee) => employee.id === id);
  }
);

export const filteredEmployeesAtom = atom(
  (get) => (filters: EmployeeFilterOptions) => {
    const employees = get(employeesAtom);
    return employees.filter(employee => {
      if (filters.position && filters.position !== 'all' && employee.position !== filters.position) {
        return false;
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          employee.name.toLowerCase().includes(searchLower) ||
          employee.email.toLowerCase().includes(searchLower) ||
          employee.phone.includes(searchLower) ||
          employee.id.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }
);