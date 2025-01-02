import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Selection,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Chip,
} from '@nextui-org/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash, Search, Filter, FileText, Download } from 'lucide-react';
import { Customer } from '../../types/customer';
import { formatPhone } from '../../lib/utils';
import { exportToExcel, exportToCSV, exportToPDF, formatCustomerForExport } from '../../utils/export';

interface Props {
  data: Customer[];
  onEdit: (id: string) => void;
  onDelete: (ids: string[]) => void;
}

export default function CustomerTable({ data, onEdit, onDelete }: Props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [search, setSearch] = useState('');
  const [customerType, setCustomerType] = useState<'all' | 'individual' | 'company'>('all');
  const [minJobs, setMinJobs] = useState<number>(0);
  const [maxJobs, setMaxJobs] = useState<number>(100);

  const filteredData = data.filter((customer) => {
    // Global search
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      customer.id.toLowerCase().includes(searchLower) ||
      customer.name.toLowerCase().includes(searchLower) ||
      customer.identityNumber.toLowerCase().includes(searchLower) ||
      customer.phone.includes(searchLower);

    // Type filter
    const matchesType = customerType === 'all' || customer.type === customerType;

    // Jobs range filter
    const matchesJobRange = 
      customer.totalJobs >= minJobs && 
      customer.totalJobs <= maxJobs;

    return matchesSearch && matchesType && matchesJobRange;
  });

  const handleDelete = () => {
    const selectedArray = Array.from(selectedKeys as Set<string>);
    onDelete(selectedArray);
    setSelectedKeys(new Set([]));
    onClose();
  };

  const handleExport = (key: string) => {
    const exportData = filteredData.map(formatCustomerForExport);
    const columns = ['ID', 'Type', 'Name', 'Identity Number', 'Phone', 'Total Jobs', 'Created At'];
    
    switch (key) {
      case 'excel':
        exportToExcel(exportData, 'customers');
        break;
      case 'csv':
        exportToCSV(exportData, 'customers');
        break;
      case 'pdf':
        exportToPDF(exportData, columns, 'customers');
        break;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name, ID, phone..."
            startContent={<Search className="w-4 h-4 text-default-400" />}
            value={search}
            onClear={() => setSearch('')}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  startContent={<Filter className="w-4 h-4" />}
                >
                  Type: {customerType === 'all' ? 'All' : customerType}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Customer Type"
                onAction={(key) => setCustomerType(key as typeof customerType)}
              >
                <DropdownItem key="all">All</DropdownItem>
                <DropdownItem key="individual">Individual</DropdownItem>
                <DropdownItem key="company">Company</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Popover placement="bottom">
              <PopoverTrigger>
                <Button 
                  variant="flat" 
                  startContent={<Filter className="w-4 h-4" />}
                >
                  Jobs Range
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4">
                <div className="flex gap-4">
                  <Input
                    type="number"
                    label="Min Jobs"
                    value={minJobs.toString()}
                    onChange={(e) => setMinJobs(Number(e.target.value))}
                  />
                  <Input
                    type="number"
                    label="Max Jobs"
                    value={maxJobs.toString()}
                    onChange={(e) => setMaxJobs(Number(e.target.value))}
                  />
                </div>
              </PopoverContent>
            </Popover>

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
          </div>
        </div>

        {selectedKeys !== "all" && selectedKeys.size > 0 && (
          <div className="flex justify-end">
            <Button
              color="danger"
              variant="flat"
              startContent={<Trash className="w-4 h-4" />}
              onPress={onOpen}
            >
              Delete ({selectedKeys.size})
            </Button>
          </div>
        )}

        <Table
          aria-label="Customer table"
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>Phone</TableColumn>
            <TableColumn>Total Jobs</TableColumn>
            <TableColumn align="center">Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredData.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>
                  <Chip
                    variant="flat"
                    color={customer.type === 'company' ? 'primary' : 'secondary'}
                  >
                    {customer.type === 'company' ? 'Company' : 'Individual'}
                  </Chip>
                </TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{formatPhone(customer.phone)}</TableCell>
                <TableCell>{customer.totalJobs}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onPress={() => navigate(`/customers/${customer.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onPress={() => onEdit(customer.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you sure you want to delete {selectedKeys.size} selected customers?
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}