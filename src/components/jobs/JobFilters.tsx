import { useState } from 'react';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { JobFilterOptions, JobStatus } from '../../types/job';

interface Props {
  onFilterChange: (filters: JobFilterOptions) => void;
}

const statusOptions = [
  { value: 'all', label: 'Semua Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'Sedang Berjalan' },
  { value: 'completed', label: 'Selesai' },
  { value: 'cancelled', label: 'Dibatalkan' },
];

export default function JobFilters({ onFilterChange }: Props) {
  const [filters, setFilters] = useState<JobFilterOptions>({
    minValue: undefined,
    maxValue: undefined,
    startDate: undefined,
    endDate: undefined,
    status: 'all',
    search: '',
  });

  const handleChange = (field: keyof JobFilterOptions, value: any) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-content1 p-4 rounded-lg shadow-medium mb-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="text"
          label="Cari"
          placeholder="Cari berdasarkan ID, pelanggan, atau nomor PO/SPK"
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
        />
        
        <Select
          label="Status"
          selectedKeys={filters.status ? [filters.status] : []}
          onChange={(e) => handleChange('status', e.target.value as JobStatus | 'all')}
        >
          {statusOptions.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </Select>

        <Input
          type="number"
          label="Nilai Kontrak Minimum"
          value={filters.minValue?.toString() || ''}
          onChange={(e) => handleChange('minValue', e.target.value ? Number(e.target.value) : undefined)}
        />

        <Input
          type="number"
          label="Nilai Kontrak Maximum"
          value={filters.maxValue?.toString() || ''}
          onChange={(e) => handleChange('maxValue', e.target.value ? Number(e.target.value) : undefined)}
        />

        <Input
          type="date"
          label="Tanggal Mulai"
          value={filters.startDate || ''}
          onChange={(e) => handleChange('startDate', e.target.value || undefined)}
        />

        <Input
          type="date"
          label="Tanggal Selesai"
          value={filters.endDate || ''}
          onChange={(e) => handleChange('endDate', e.target.value || undefined)}
        />
      </div>
    </div>
  );
}