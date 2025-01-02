import { atom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { Job, JobFormData, TechnicianJobSubmission } from '../types/job';
import jobsData from '../data/jobs.json';

export const jobsAtom = atom<Job[]>(jobsData.jobs);

export const addJobAtom = atom(
  null,
  (get, set, formData: JobFormData) => {
    const jobs = get(jobsAtom);
    const customers = get(customersAtom);
    const customer = customers.find(c => c.id === formData.customerId);
    
    const newJob: Job = {
      id: `JOB${uuidv4().substring(0, 4)}`,
      ...formData,
      customerName: customer?.name || '',
      isNew: !jobs.some(job => job.customerId === formData.customerId),
      status: 'pending',
      totalValue: calculateTotalValue(formData.monthlyValue, formData.startDate, formData.endDate),
      documents: [],
      technicianReports: [],
      usedItems: [],
      createdAt: new Date().toISOString(),
    };
    
    set(jobsAtom, [...jobs, newJob]);
    return newJob;
  }
);

export const updateJobAtom = atom(
  null,
  (get, set, { id, data }: { id: string; data: Partial<Job> }) => {
    const jobs = get(jobsAtom);
    set(jobsAtom, jobs.map(job => 
      job.id === id ? { ...job, ...data } : job
    ));
  }
);

export const deleteJobsAtom = atom(
  null,
  (get, set, ids: string[]) => {
    const jobs = get(jobsAtom);
    set(jobsAtom, jobs.filter(job => !ids.includes(job.id)));
  }
);

export const submitTechnicianJobAtom = atom(
  null,
  (get, set, { id, data }: { id: string; data: TechnicianJobSubmission }) => {
    const jobs = get(jobsAtom);
    set(jobsAtom, jobs.map(job => 
      job.id === id ? { 
        ...job, 
        status: 'completed',
        technicianReport: {
          ...data,
          submittedAt: new Date().toISOString(),
        }
      } : job
    ));
  }
);

export const getJobByIdAtom = atom(
  (get) => (id: string) => {
    const jobs = get(jobsAtom);
    return jobs.find(job => job.id === id);
  }
);

export const filteredJobsAtom = atom(
  (get) => (filters: JobFilterOptions) => {
    const jobs = get(jobsAtom);
    return jobs.filter(job => {
      if (filters.minValue && job.totalValue < filters.minValue) return false;
      if (filters.maxValue && job.totalValue > filters.maxValue) return false;
      if (filters.startDate && new Date(job.startDate) < new Date(filters.startDate)) return false;
      if (filters.endDate && new Date(job.endDate) > new Date(filters.endDate)) return false;
      if (filters.status && filters.status !== 'all' && job.status !== filters.status) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          job.id.toLowerCase().includes(searchLower) ||
          job.customerName.toLowerCase().includes(searchLower) ||
          job.poNumber.toLowerCase().includes(searchLower) ||
          job.spkNumber.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }
);

export const nearEndingJobsAtom = atom(
  get => {
    const jobs = get(jobsAtom);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    
    return jobs.filter(job => {
      const endDate = new Date(job.endDate);
      return endDate <= threeMonthsFromNow && job.status !== 'completed' && job.status !== 'cancelled';
    });
  }
);

function calculateTotalValue(monthlyValue: number, startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth() + 1;
  return monthlyValue * months;
}