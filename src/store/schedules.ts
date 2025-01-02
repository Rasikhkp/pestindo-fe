import { atom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { Schedule, ScheduleFormData, ScheduleFilterOptions } from '../types/schedule';
import schedulesData from '../data/schedules.json';

export const schedulesAtom = atom<Schedule[]>(schedulesData.schedules);

export const addScheduleAtom = atom(
  null,
  (get, set, formData: ScheduleFormData) => {
    const schedules = get(schedulesAtom);
    const newSchedule: Schedule = {
      id: `SCH${uuidv4().substring(0, 4)}`,
      jobId: formData.jobId,
      customerId: formData.customerId,
      customerName: 'Customer Name', // This should be fetched from customer data
      date: formData.date,
      employees: [], // This should be populated with employee data
      createdAt: new Date().toISOString(),
    };
    set(schedulesAtom, [...schedules, newSchedule]);
    return newSchedule;
  }
);

export const updateScheduleAtom = atom(
  null,
  (get, set, { id, data }: { id: string; data: Partial<Schedule> }) => {
    const schedules = get(schedulesAtom);
    set(schedulesAtom, schedules.map(schedule => 
      schedule.id === id ? { ...schedule, ...data } : schedule
    ));
  }
);

export const deleteSchedulesAtom = atom(
  null,
  (get, set, ids: string[]) => {
    const schedules = get(schedulesAtom);
    set(schedulesAtom, schedules.filter(schedule => !ids.includes(schedule.id)));
  }
);

export const getScheduleByIdAtom = atom(
  (get) => (id: string) => {
    const schedules = get(schedulesAtom);
    return schedules.find(schedule => schedule.id === id);
  }
);

export const filteredSchedulesAtom = atom(
  (get) => (filters: ScheduleFilterOptions) => {
    const schedules = get(schedulesAtom);
    return schedules.filter(schedule => {
      if (filters.jobId && schedule.jobId !== filters.jobId) return false;
      if (filters.customerId && schedule.customerId !== filters.customerId) return false;
      if (filters.startDate && new Date(schedule.date) < new Date(filters.startDate)) return false;
      if (filters.endDate && new Date(schedule.date) > new Date(filters.endDate)) return false;
      if (filters.employeeId && !schedule.employees.some(emp => emp.id === filters.employeeId)) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          schedule.id.toLowerCase().includes(searchLower) ||
          schedule.jobId.toLowerCase().includes(searchLower) ||
          schedule.customerName.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }
);