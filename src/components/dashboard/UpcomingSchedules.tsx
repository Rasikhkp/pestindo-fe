import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/react';
import { Schedule } from '../../types/schedule';

interface Props {
  schedules: Schedule[];
}

export default function UpcomingSchedules({ schedules }: Props) {
  return (
    <Table aria-label="Upcoming schedules table">
      <TableHeader>
        <TableColumn>ID Pekerjaan</TableColumn>
        <TableColumn>Pelanggan</TableColumn>
        <TableColumn>Karyawan</TableColumn>
        <TableColumn>Waktu</TableColumn>
      </TableHeader>
      <TableBody>
        {schedules.map((schedule) => (
          <TableRow key={schedule.id}>
            <TableCell>{schedule.jobId}</TableCell>
            <TableCell>{schedule.customerName}</TableCell>
            <TableCell>
              {schedule.employees.map(emp => emp.name).join(', ')}
            </TableCell>
            <TableCell>
              {new Date(schedule.date).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}