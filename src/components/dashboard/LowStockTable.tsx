import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Chip } from '@nextui-org/react';
import { InventoryItem } from '../../types/inventory';

interface Props {
  items: InventoryItem[];
}

export default function LowStockTable({ items }: Props) {
  return (
    <Table aria-label="Low stock items table" className="mt-3">
      <TableHeader>
        <TableColumn>Nama Barang</TableColumn>
        <TableColumn>Stok</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.stock} {item.unit}</TableCell>
            <TableCell>
              <Chip
                color={item.stock === 0 ? 'danger' : 'warning'}
                size="sm"
                variant="flat"
              >
                {item.stock === 0 ? 'Habis' : 'Rendah'}
              </Chip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}