import { atom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { Activity, ActivityFormData, ActivityFilterOptions } from '../types/activity';
import activitiesData from '../data/activities.json';

export const activitiesAtom = atom<Activity[]>(activitiesData.activities);

export const addActivityAtom = atom(
  null,
  (get, set, formData: ActivityFormData) => {
    const activities = get(activitiesAtom);
    const newActivity: Activity = {
      id: `ACT${uuidv4().substring(0, 4)}`,
      description: formData.description,
      images: formData.images.map(file => URL.createObjectURL(file)),
      createdAt: new Date().toISOString(),
    };
    set(activitiesAtom, [newActivity, ...activities]);
    return newActivity;
  }
);

export const getFilteredActivitiesAtom = atom(
  (get) => (filters: ActivityFilterOptions) => {
    const activities = get(activitiesAtom);
    return activities.filter((activity) => {
      if (filters.startDate && new Date(activity.createdAt) < new Date(filters.startDate)) return false;
      if (filters.endDate && new Date(activity.createdAt) > new Date(filters.endDate)) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return activity.description.toLowerCase().includes(searchLower);
      }
      return true;
    });
  }
);