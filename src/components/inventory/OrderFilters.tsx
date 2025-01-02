import { Input, Select, SelectItem } from '@nextui-org/react';
import { useSuppliers } from '../../hooks/useSuppliers';
import { InventoryOrderFilterOptions } from '../../types/inventory-order';

interface Props {
  onFilterChange: (filters: InventoryOrderFilterOptions) => void;
}

const statusOptions = [
  { value: 'all', label: 'Semua Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Diproses' },
  { value: 'completed', label: 'Selesai' },
  { value: 'cancelled', label: 'Dibatalkan' },
];

export default function OrderFilters({ onFilterChange }: Props) {
  const { suppliers } = useSuppliers();

  return (
    <div className="bg-content1 p-4 rounded-lg shadow-medium mb-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Supplier"
          onChange={(e) => onFilterChange({ supplierId: e.target.value })}
        >
          <SelectItem key="all" value="">Semua Supplier</SelectItem>
          {suppliers.map((supplier) => (
            <SelectItem key={supplier.id} value={supplier.id}>
              {supplier.name}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Status"
          onChange={(e) => onFilterChange({ status: e.target.value as any })}
        >
          {statusOptions.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </Select>

        <Input
          type="date"
          label="Dari Tanggal"
          onChange={(e) => onFilterChange({ startDate: e.target.value })}
        />

        <Input
          type="date"
          label="Sampai Tanggal"
          onChange={(e) => onFilterChange({ endDate: e.target.value })}
        />

        <Input
          type="number"
          label="Persentase Diterima Min"
          onChange={(e) => onFilterChange({ minPercentage: Number(e.target.value) || undefined })}
        />

        <Input
          type="number"
          label="Persentase Diterima Max"
          onChange={(e) => onFilterChange({ maxPercentage: Number(e.target.value) || undefined })}
        />

        <Input
          type="text"
          label="Cari"
          placeholder="Cari berdasarkan ID atau supplier"
          className="md:col-span-3"
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>
    </div>
  );
}