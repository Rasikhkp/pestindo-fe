import { useAtom, useAtomValue } from 'jotai';
import {
  activitiesAtom,
  addActivityAtom,
  getFilteredActivitiesAtom,
} from '../store/activities';
import { ActivityFormData, ActivityFilterOptions } from '../types/activity';

export function useActivities() {
  const [activities] = useAtom(activitiesAtom);
  const [, addActivity] = useAtom(addActivityAtom);
  const getFilteredActivities = useAtomValue(getFilteredActivitiesAtom);

  return {
    activities,
    addActivity,
    getFilteredActivities,
  };
}