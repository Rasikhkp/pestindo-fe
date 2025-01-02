import { useParams, useNavigate } from 'react-router-dom';
import { JobFormData } from '../../types/job';
import JobForm from '../../components/jobs/JobForm';
import { useJobs } from '../../hooks/useJobs';
import DetailHeader from '../../components/shared/DetailHeader';

export default function EditJob() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJobById, updateJob } = useJobs();
  const job = getJobById(id!);

  if (!job) {
    return <div>Job not found</div>;
  }

  const handleSubmit = (data: JobFormData) => {
    updateJob({ id: id!, data });
    navigate('/jobs');
  };

  const initialData: JobFormData = {
    type: job.type,
    customerId: job.customerId,
    poNumber: job.poNumber,
    spkNumber: job.spkNumber,
    startDate: job.startDate,
    endDate: job.endDate,
    monthlyValue: job.monthlyValue,
    visitsPerMonth: job.visitsPerMonth,
    pic: job.pic,
    financePic: job.financePic,
    team: job.team,
  };

  return (
    <div className="space-y-6">
      <DetailHeader
        title="Edit Pekerjaan"
        subtitle={`Edit pekerjaan ${job.id}`}
        onBack={() => navigate('/jobs')}
      />
      <JobForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}