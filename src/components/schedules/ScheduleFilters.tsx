import { Input, Select, SelectItem } from '@nextui-org/react';
import { ScheduleFilterOptions } from '../../types/schedule';
import { useJobs } from '../../hooks/useJobs';
import { useCustomers } from '../../hooks/useCustomers';
import { useEmployees } from '../../hooks/useEmployees';

interface Props {
  onFilterChange: (filters: ScheduleFilterOptions) => void;
}

export default function ScheduleFilters({ onFilterChange }: Props) {
  const { jobs } = useJobs();
  const { customers } = useCustomers();
  const { employees } = useEmployees();

  return (
    <div className="bg-content1 p-4 rounded-lg shadow-medium mb-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="ID Pekerjaan"
          onChange={(e) => onFilterChange({ jobId: e.target.value })}
        >
          {jobs.map((job) => (
            <SelectItem key={job.id} value={job.id}>
              {job.id}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Pelanggan"
          onChange={(e) => onFilterChange({ customerId: e.target.value })}
        >
          {customers.map((customer) => (
            <SelectItem key={customer.id} value={customer.id}>
              {customer.name}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Karyawan"
          onChange={(e) => onFilterChange({ employeeId: e.target.value })}
        >
          {employees.map((employee) => (
            <SelectItem key={employee.id} value={employee.id}>
              {employee.name}
            </SelectItem>
          ))}
        </Select>

        <Input
          type="date"
          label="Tanggal Mulai"
          onChange={(e) => onFilterChange({ startDate: e.target.value })}
        />

        <Input
          type="date"
          label="Tanggal Selesai"
          onChange={(e) => onFilterChange({ endDate: e.target.value })}
        />

        <Input
          type="text"
          label="Cari"
          placeholder="Cari berdasarkan ID atau nama"
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>
    </div>
  );
}