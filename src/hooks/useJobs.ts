import { useAtom, useAtomValue } from 'jotai';
import {
  jobsAtom,
  addJobAtom,
  submitTechnicianJobAtom,
  updateJobAtom,
  deleteJobsAtom,
  getJobByIdAtom,
  filteredJobsAtom,
  nearEndingJobsAtom,
} from '../store/jobs';
import { JobFormData, JobFilterOptions } from '../types/job';

export function useJobs() {
  const [jobs] = useAtom(jobsAtom);
  const [, addJob] = useAtom(addJobAtom);
  const [, updateJob] = useAtom(updateJobAtom);
  const [, submitTechnicianJob] = useAtom(submitTechnicianJobAtom);
  const [, deleteJobs] = useAtom(deleteJobsAtom);
  const getJobById = useAtomValue(getJobByIdAtom);
  const getFilteredJobs = useAtomValue(filteredJobsAtom);
  const nearEndingJobs = useAtomValue(nearEndingJobsAtom);

  return {
    jobs,
    addJob,
    updateJob,
    submitTechnicianJob,
    deleteJobs,
    getJobById,
    getFilteredJobs,
    nearEndingJobs,
  };
}