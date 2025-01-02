import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Button,
  Tooltip,
} from '@nextui-org/react';
import { Download, Eye } from 'lucide-react';

interface TechnicianReport {
  id: string;
  technicianId: string;
  technicianName: string;
  createdAt: string;
  documentUrl: string;
  status: string;
  location: string;
  findings: string;
  recommendations: string;
}

interface Props {
  reports: TechnicianReport[];
  onViewReport: (report: TechnicianReport) => void;
}

const statusColorMap = {
  completed: 'success',
  pending_review: 'warning',
  in_progress: 'primary',
} as const;

export default function TechnicianReportTable({ reports, onViewReport }: Props) {
  return (
    <Table aria-label="Technician reports table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Teknisi</TableColumn>
        <TableColumn>Lokasi</TableColumn>
        <TableColumn>Tanggal</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn align="center">Aksi</TableColumn>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell>{report.id}</TableCell>
            <TableCell>
              <div>
                <p className="font-medium">{report.technicianName}</p>
                <p className="text-sm text-gray-500">{report.technicianId}</p>
              </div>
            </TableCell>
            <TableCell>{report.location}</TableCell>
            <TableCell>
              {new Date(report.createdAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </TableCell>
            <TableCell>
              <Chip
                color={statusColorMap[report.status as keyof typeof statusColorMap]}
                variant="flat"
                size="sm"
              >
                {report.status.replace('_', ' ').toUpperCase()}
              </Chip>
            </TableCell>
            <TableCell>
              <div className="flex justify-center gap-2">
                <Tooltip content="Download Laporan">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => window.open(report.documentUrl)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </Tooltip>
                <Tooltip content="Lihat Detail">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => onViewReport(report)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}