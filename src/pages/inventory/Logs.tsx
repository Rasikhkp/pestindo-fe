import { useState } from 'react';
import { Card, CardBody, Input, Select, SelectItem } from '@nextui-org/react';
import { useInventoryLogs } from '../../hooks/useInventoryLogs';
import { useInventory } from '../../hooks/useInventory';
import { InventoryLogFilterOptions } from '../../types/inventory-log';

export default function InventoryLogs() {
  const [filters, setFilters] = useState<InventoryLogFilterOptions>({});
  const { logs, getFilteredLogs } = useInventoryLogs();
  const { items } = useInventory();

  const filteredLogs = getFilteredLogs(filters);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Log Inventaris</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select
          label="Barang"
          onChange={(e) => setFilters({ ...filters, itemId: e.target.value })}
        >
          <SelectItem key="all" value="">Semua Barang</SelectItem>
          {items.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Tipe"
          onChange={(e) => setFilters({ ...filters, type: e.target.value as any })}
        >
          <SelectItem key="all" value="all">Semua</SelectItem>
          <SelectItem key="in" value="in">Masuk</SelectItem>
          <SelectItem key="out" value="out">Keluar</SelectItem>
        </Select>

        <Input
          type="date"
          label="Dari Tanggal"
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        />

        <Input
          type="date"
          label="Sampai Tanggal"
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <Card key={log.id}>
            <CardBody>
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${
                  log.type === 'in' ? 'bg-success' : 'bg-danger'
                }`} />
                <div className="flex-1">
                  <p className="font-medium">{log.itemName}</p>
                  <p className="text-sm text-gray-500">
                    {log.type === 'in' ? 'Masuk' : 'Keluar'}: {log.quantity} unit
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(log.timestamp).toLocaleTimeString('id-ID')}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}