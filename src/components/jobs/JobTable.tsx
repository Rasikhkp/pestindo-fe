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
  Popover,
  PopoverContent,
  PopoverTrigger,
  ModalBody,
  ModalFooter,
  Selection,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
} from '@nextui-org/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash, AlertTriangle, Search, Filter } from 'lucide-react';
import ExportButtons from '../shared/ExportButtons';
import { Job } from '../../types/job';

interface Props {
  data: Job[];
  onEdit: (id: string) => void;
  onDelete: (ids: string[]) => void;
}

const statusColorMap = {
  pending: 'warning',
  in_progress: 'primary',
  completed: 'success',
  cancelled: 'danger',
} as const;

export default function JobTable({ data, onEdit, onDelete }: Props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [search, setSearch] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filters, setFilters] = useState({
    minValue: '',
    maxValue: '',
    startDate: '',
    endDate: '',
  });

  const filteredJobs = data.filter((job) => {
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      job.id.toLowerCase().includes(searchLower) ||
      job.customerName.toLowerCase().includes(searchLower) ||
      job.poNumber.toLowerCase().includes(searchLower) ||
      job.spkNumber.toLowerCase().includes(searchLower);

    const matchesValue = 
      (!filters.minValue || job.totalValue >= Number(filters.minValue)) &&
      (!filters.maxValue || job.totalValue <= Number(filters.maxValue));
    
    const matchesDate = 
      (!filters.startDate || new Date(job.startDate) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(job.endDate) <= new Date(filters.endDate));

    return matchesSearch && matchesValue && matchesDate;
  });

  const handleDelete = () => {
    if (selectedKeys === "all") {
      onDelete(filteredJobs.map(job => job.id));
    } else {
      onDelete(Array.from(selectedKeys as Set<string>));
    }
    setSelectedKeys(new Set([]));
    setShowDeleteModal(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };

  const isNearEnding = (endDate: string) => {
    const end = new Date(endDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return end <= threeMonthsFromNow;
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by ID, customer, PO/SPK..."
            startContent={<Search className="w-4 h-4 text-default-400" />}
            value={search}
            onClear={() => setSearch('')}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-3">
            <Popover placement="bottom">
              <PopoverTrigger>
                <Button 
                  variant="flat" 
                  startContent={<Filter className="w-4 h-4" />}
                >
                  Nilai Kontrak
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4">
                <div className="flex gap-4">
                  <Input
                    type="number"
                    label="Nilai Min"
                    value={filters.minValue}
                    onChange={(e) => setFilters({ ...filters, minValue: e.target.value })}
                  />
                  <Input
                    type="number"
                    label="Nilai Max"
                    value={filters.maxValue}
                    onChange={(e) => setFilters({ ...filters, maxValue: e.target.value })}
                  />
                </div>
              </PopoverContent>
            </Popover>

            <Popover placement="bottom">
              <PopoverTrigger>
                <Button 
                  variant="flat" 
                  startContent={<Filter className="w-4 h-4" />}
                >
                  Tanggal
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4">
                <div className="flex gap-4">
                  <Input
                    type="date"
                    label="Tanggal Mulai"
                    value={filters.startDate}
                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  />
                  <Input
                    type="date"
                    label="Tanggal Selesai"
                    value={filters.endDate}
                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <ExportButtons data={filteredJobs} filename="jobs" />
          </div>
        </div>

        {selectedKeys !== "all" && selectedKeys.size > 0 && (
          <div className="flex justify-end">
            <Button
              color="danger"
              variant="flat"
              startContent={<Trash className="w-4 h-4" />}
              onPress={() => setShowDeleteModal(true)}
            >
              Delete ({selectedKeys.size})
            </Button>
          </div>
        )}
      </div>

      <Table
        aria-label="Job table"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Pelanggan</TableColumn>
          <TableColumn>Nilai Kontrak</TableColumn>
          <TableColumn>Tanggal Mulai</TableColumn>
          <TableColumn>Tanggal Selesai</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn align="center">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.customerName}</TableCell>
              <TableCell>{formatCurrency(job.totalValue)}</TableCell>
              <TableCell>{job.startDate}</TableCell>
              <TableCell className="flex items-center gap-2">
                {job.endDate}
                {isNearEnding(job.endDate) && job.status !== 'completed' && (
                  <AlertTriangle className="w-4 h-4 text-warning" />
                )}
              </TableCell>
              <TableCell>
                <Chip
                  color={statusColorMap[job.status]}
                  variant="flat"
                  size="sm"
                >
                  {job.status.replace('_', ' ').toUpperCase()}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => navigate(`/jobs/${job.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => onEdit(job.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <ModalContent>
          <ModalHeader>Konfirmasi Hapus</ModalHeader>
          <ModalBody>
            Apakah Anda yakin ingin menghapus {selectedKeys === "all" ? filteredJobs.length : selectedKeys.size} pekerjaan yang dipilih?
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setShowDeleteModal(false)}>
              Batal
            </Button>
            <Button color="danger" onPress={handleDelete}>
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}