import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/react';
import { InventoryRequest } from '../../types/inventory-request';

interface Props {
  requests: InventoryRequest[];
}

export default function PendingRequests({ requests }: Props) {
  return (
    <Table aria-label="Pending requests table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Karyawan</TableColumn>
        <TableColumn>Tanggal</TableColumn>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell>{request.id}</TableCell>
            <TableCell>{request.employeeName}</TableCell>
            <TableCell>
              {new Date(request.createdAt).toLocaleDateString('id-ID')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}