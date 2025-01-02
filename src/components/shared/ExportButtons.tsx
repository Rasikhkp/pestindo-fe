import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { FileText, Download } from 'lucide-react';
import { exportToExcel, exportToCSV, exportToPDF } from '../../utils/export';

interface Props {
  data: any[];
  filename?: string;
}

export default function ExportButtons({ data, filename = 'export' }: Props) {
  const handleExport = (key: string) => {
    const exportData = data.map(item => ({
      ID: item.id,
      Name: item.name,
      Phone: item.phone,
      'Created At': new Date(item.createdAt).toLocaleDateString(),
      ...item,
    }));
    const columns = Object.keys(exportData[0]);
    
    switch (key) {
      case 'excel':
        exportToExcel(exportData, filename);
        break;
      case 'csv':
        exportToCSV(exportData, filename);
        break;
      case 'pdf':
        exportToPDF(exportData, columns, filename);
        break;
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="flat" 
          startContent={<Download className="w-4 h-4" />}
        >
          Export
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Export Options"
        onAction={(key) => handleExport(key as string)}
      >
        <DropdownItem key="excel" startContent={<FileText className="w-4 h-4" />}>
          Excel
        </DropdownItem>
        <DropdownItem key="csv" startContent={<FileText className="w-4 h-4" />}>
          CSV
        </DropdownItem>
        <DropdownItem key="pdf" startContent={<FileText className="w-4 h-4" />}>
          PDF
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}