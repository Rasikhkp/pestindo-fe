import { Chip } from '@nextui-org/react';
import { Job } from '../../types/job';
import { InventoryItem } from '../../types/inventory';
import { InventoryRequest } from '../../types/inventory-request';

interface Props {
  title: string;
  items: (Job | InventoryItem | InventoryRequest)[];
  type: 'job' | 'inventory' | 'request';
}

export default function WarningWidget({ title, items, type }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="p-4 bg-danger/10 rounded-lg">
      <h4 className="font-medium text-danger mb-2">{title}</h4>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <span className="text-sm">
              {type === 'job' ? (item as Job).customerName :
               type === 'inventory' ? (item as InventoryItem).name :
               (item as InventoryRequest).employeeName}
            </span>
            <Chip size="sm" variant="flat" color="danger">
              {type === 'job' ? 'Berakhir dalam 3 bulan' :
               type === 'inventory' ? `Stok: ${(item as InventoryItem).stock}` :
               'Menunggu persetujuan'}
            </Chip>
          </div>
        ))}
      </div>
    </div>
  );
}