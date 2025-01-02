import { Input, Select, SelectItem } from '@nextui-org/react';
import { InventoryFilterOptions } from '../../types/inventory';

interface Props {
  onFilterChange: (filters: InventoryFilterOptions) => void;
}

const units = ['Liter', 'Unit', 'Piece', 'Box'];

export default function TechnicianInventoryFilters({ onFilterChange }: Props) {
  return (
    <div className="bg-content1 p-4 rounded-lg shadow-medium mb-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="number"
          label="Harga Minimum"
          onChange={(e) => onFilterChange({ minPrice: Number(e.target.value) || undefined })}
        />
        
        <Input
          type="number"
          label="Harga Maximum"
          onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) || undefined })}
        />

        <Input
          type="number"
          label="Stok Minimum"
          onChange={(e) => onFilterChange({ minStock: Number(e.target.value) || undefined })}
        />

        <Input
          type="number"
          label="Stok Maximum"
          onChange={(e) => onFilterChange({ maxStock: Number(e.target.value) || undefined })}
        />

        <Select
          label="Unit"
          onChange={(e) => onFilterChange({ unit: e.target.value })}
        >
          <SelectItem key="all" value="">Semua</SelectItem>
          {units.map((unit) => (
            <SelectItem key={unit} value={unit}>
              {unit}
            </SelectItem>
          ))}
        </Select>

        <Input
          type="text"
          label="Cari"
          placeholder="Cari berdasarkan nama atau ID"
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>
    </div>
  );
}