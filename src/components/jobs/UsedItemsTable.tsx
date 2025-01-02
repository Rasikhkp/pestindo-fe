import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
} from '@nextui-org/react';

interface UsedItem {
  id: string;
  name: string;
  price: number;
  actualUsage: number;
  billedUsage: number;
  unit: string;
  category: string;
}

interface Props {
  items: UsedItem[];
}

const categoryColorMap = {
  Chemical: 'danger',
  Equipment: 'primary',
} as const;

export default function UsedItemsTable({ items }: Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };

  const calculateTotal = (usage: number, price: number) => {
    return formatCurrency(usage * price);
  };

  return (
    <Table aria-label="Used items table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Nama</TableColumn>
        <TableColumn>Kategori</TableColumn>
        <TableColumn>Harga Satuan</TableColumn>
        <TableColumn>Penggunaan Aktual</TableColumn>
        <TableColumn>Penggunaan Ditagih</TableColumn>
        <TableColumn>Total Aktual</TableColumn>
        <TableColumn>Total Ditagih</TableColumn>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <Chip
                color={categoryColorMap[item.category as keyof typeof categoryColorMap]}
                variant="flat"
                size="sm"
              >
                {item.category}
              </Chip>
            </TableCell>
            <TableCell>{formatCurrency(item.price)}</TableCell>
            <TableCell>
              {item.actualUsage} {item.unit}
            </TableCell>
            <TableCell>
              {item.billedUsage} {item.unit}
            </TableCell>
            <TableCell>{calculateTotal(item.actualUsage, item.price)}</TableCell>
            <TableCell>{calculateTotal(item.billedUsage, item.price)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}