import { useAtom, useAtomValue } from 'jotai';
import {
  schedulesAtom,
  addScheduleAtom,
  updateScheduleAtom,
  deleteSchedulesAtom,
  getScheduleByIdAtom,
  filteredSchedulesAtom,
} from '../store/schedules';
import { ScheduleFormData, ScheduleFilterOptions } from '../types/schedule';

export function useSchedules() {
  const [schedules] = useAtom(schedulesAtom);
  const [, addSchedule] = useAtom(addScheduleAtom);
  const [, updateSchedule] = useAtom(updateScheduleAtom);
  const [, deleteSchedules] = useAtom(deleteSchedulesAtom);
  const getScheduleById = useAtomValue(getScheduleByIdAtom);
  const getFilteredSchedules = useAtomValue(filteredSchedulesAtom);

  return {
    schedules,
    addSchedule,
    updateSchedule,
    deleteSchedules,
    getScheduleById,
    getFilteredSchedules,
  };
}