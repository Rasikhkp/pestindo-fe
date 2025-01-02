import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { Plus } from 'lucide-react';
import JobTable from '../components/jobs/JobTable';
import JobFilters from '../components/jobs/JobFilters';
import { useJobs } from '../hooks/useJobs';
import { JobFilterOptions } from '../types/job';

export default function Jobs() {
  const navigate = useNavigate();
  const { jobs, deleteJobs, getFilteredJobs } = useJobs();
  const [filters, setFilters] = useState<JobFilterOptions>({});

  const filteredJobs = getFilteredJobs(filters);

  const handleEdit = (id: string) => {
    navigate(`/jobs/edit/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Pekerjaan
        </h1>
        <Button
          color="primary"
          onPress={() => navigate('/jobs/create')}
          startContent={<Plus className="w-4 h-4" />}
        >
          Tambah Pekerjaan
        </Button>
      </div>

      <JobTable
        data={filteredJobs}
        onEdit={handleEdit}
        onDelete={deleteJobs}
      />
    </div>
  );
}