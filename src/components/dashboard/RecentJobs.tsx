import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Chip } from '@nextui-org/react';
import { Job } from '../../types/job';

interface Props {
  jobs: Job[];
}

const statusColorMap = {
  pending: 'warning',
  in_progress: 'primary',
  completed: 'success',
  cancelled: 'danger',
} as const;

export default function RecentJobs({ jobs }: Props) {
  return (
    <Table aria-label="Recent jobs table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Pelanggan</TableColumn>
        <TableColumn>Tanggal Mulai</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell>{job.id}</TableCell>
            <TableCell>{job.customerName}</TableCell>
            <TableCell>
              {new Date(job.startDate).toLocaleDateString('id-ID')}
            </TableCell>
            <TableCell>
              <Chip
                color={statusColorMap[job.status]}
                size="sm"
                variant="flat"
              >
                {job.status.replace('_', ' ').toUpperCase()}
              </Chip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}