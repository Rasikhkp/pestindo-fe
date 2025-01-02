import { useState } from 'react';
import {
  Table,
  TableHeader,
  Chip,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Play, Eye, FileText } from 'lucide-react';
import { useJobs } from '../../hooks/useJobs';

const statusColorMap = {
  pending: 'warning',
  in_progress: 'primary',
  completed: 'success',
  cancelled: 'danger',
} as const;

export default function TechnicianJobs() {
  const navigate = useNavigate();
  const { jobs } = useJobs();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
  });

  const filteredJobs = jobs.filter((job) => {
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      job.id.toLowerCase().includes(searchLower) ||
      job.customerName.toLowerCase().includes(searchLower);

    const matchesDate = 
      (!filters.startDate || new Date(job.startDate) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(job.endDate) <= new Date(filters.endDate));

    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Pekerjaan Teknisi</h1>
      </div>

      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by ID or customer..."
          startContent={<Search className="w-4 h-4 text-default-400" />}
          value={search}
          onClear={() => setSearch('')}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-3">
          <Popover placement="bottom">
            <PopoverTrigger>
              <Button 
                variant="flat" 
                startContent={<Filter className="w-4 h-4" />}
              >
                Tanggal
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <div className="flex gap-4">
                <Input
                  type="date"
                  label="Dari Tanggal"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
                <Input
                  type="date"
                  label="Sampai Tanggal"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Table aria-label="Technician jobs table">
        <TableHeader>
          <TableColumn>ID Pekerjaan</TableColumn>
          <TableColumn>Nama Pelanggan</TableColumn>
          <TableColumn>Tanggal</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn align="center">Aksi</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.customerName}</TableCell>
              <TableCell>{new Date(job.startDate).toLocaleDateString('id-ID')}</TableCell>
              <TableCell>
                <Chip
                  color={statusColorMap[job.status]}
                  variant="flat"
                  size="sm"
                >
                  {job.status.replace('_', ' ').toUpperCase()}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  {job.status === 'completed' ? (
                  <>
                        <Button
                          color="primary"
                          size="sm"
                          variant="flat"
                          startContent={<Eye className="w-4 h-4" />}
                          onPress={() => navigate(`/technician-jobs/${job.id}`)}
                        >
                          Detail
                        </Button>
                        <Button
                          color="success"
                          size="sm"
                          variant="flat"
                          startContent={<FileText className="w-4 h-4" />}
                        >
                          PDF
                        </Button>
                    </>
                  ) : (
                    <Button
                      color="primary"
                      size="sm"
                      variant="flat"
                      startContent={<Play className="w-4 h-4" />}
                      onPress={() => navigate(`/technician-jobs/${job.id}`)}
                    >
                    Kerjakan
                  </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}