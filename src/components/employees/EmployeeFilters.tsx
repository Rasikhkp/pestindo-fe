import { Input, Select, SelectItem } from '@nextui-org/react';
import { EmployeeFilterOptions, Position } from '../../types/employee';

interface Props {
  onFilterChange: (filters: EmployeeFilterOptions) => void;
}

const positions: { value: Position | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua Jabatan' },
  { value: 'manager', label: 'Manager' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'staff', label: 'Staff' },
  { value: 'technician', label: 'Teknisi' },
  { value: 'admin', label: 'Admin' },
  { value: 'sales', label: 'Sales' },
];

export default function EmployeeFilters({ onFilterChange }: Props) {
  return (
    <div className="bg-content1 p-4 rounded-lg shadow-medium mb-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          label="Cari"
          placeholder="Cari berdasarkan nama, email, atau nomor telepon"
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
        
        <Select
          label="Jabatan"
          onChange={(e) => onFilterChange({ position: e.target.value as Position | 'all' })}
        >
          {positions.map((position) => (
            <SelectItem key={position.value} value={position.value}>
              {position.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}