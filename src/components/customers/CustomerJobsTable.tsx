import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
} from '@nextui-org/react';
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

export default function CustomerJobsTable({ jobs }: Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };

  return (
    <Table aria-label="Customer jobs table">
      <TableHeader>
        <TableColumn>ID Pekerjaan</TableColumn>
        <TableColumn>Nilai Kontrak</TableColumn>
        <TableColumn>Tanggal Mulai</TableColumn>
        <TableColumn>Tanggal Selesai</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell>{job.id}</TableCell>
            <TableCell>{formatCurrency(job.contractValue)}</TableCell>
            <TableCell>{job.startDate}</TableCell>
            <TableCell>{job.endDate}</TableCell>
            <TableCell>
              <Chip
                color={statusColorMap[job.status]}
                variant="flat"
                size="sm"
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