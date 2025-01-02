import { useNavigate } from 'react-router-dom';
import { JobFormData } from '../../types/job';
import JobForm from '../../components/jobs/JobForm';
import { useJobs } from '../../hooks/useJobs';
import DetailHeader from '../../components/shared/DetailHeader';

export default function CreateJob() {
  const navigate = useNavigate();
  const { addJob } = useJobs();

  const handleSubmit = (data: JobFormData) => {
    addJob(data);
    navigate('/jobs');
  };

  return (
    <div className="space-y-6">
      <DetailHeader
        title="Tambah Pekerjaan"
        subtitle="Buat pekerjaan baru"
        onBack={() => navigate('/jobs')}
      />
      <JobForm onSubmit={handleSubmit} />
    </div>
  );
}