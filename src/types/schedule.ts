import { Employee } from './employee';

export interface Schedule {
  id: string;
  jobId: string;
  customerId: string;
  customerName: string;
  date: string;
  employees: Employee[];
  createdAt: string;
}

export interface ScheduleFormData {
  jobId: string;
  customerId: string;
  date: string;
  employeeIds: string[];
}

export interface ScheduleFilterOptions {
  jobId?: string;
  customerId?: string;
  startDate?: string;
  endDate?: string;
  employeeId?: string;
  search?: string;
}