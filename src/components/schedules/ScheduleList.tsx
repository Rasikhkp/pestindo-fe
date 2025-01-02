import { useState } from 'react';
import {
  Table,
  TableHeader,
  Input,
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
  Chip,
  Selection,
} from '@nextui-org/react';
import { Eye, Pencil, Plus, Trash, Search, Filter } from 'lucide-react';
import { useSchedules } from '../../hooks/useSchedules';
import ScheduleModal from './ScheduleModal';
import ExportButtons from '../shared/ExportButtons';
import { ScheduleFilterOptions } from '../../types/schedule';

export default function ScheduleList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filters, setFilters] = useState<ScheduleFilterOptions>({});
  const { schedules, deleteSchedules, getFilteredSchedules } = useSchedules();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredSchedules = getFilteredSchedules(filters);

  const handleEdit = (id: string) => {
    setSelectedId(id);
    onOpen();
  };

  const handleAdd = () => {
    setSelectedId(null);
    onOpen();
  };

  const handleDelete = () => {
    if (selectedKeys === "all") {
      deleteSchedules(schedules.map(schedule => schedule.id));
    } else {
      deleteSchedules(Array.from(selectedKeys as Set<string>));
    }
    setSelectedKeys(new Set([]));
    setShowDeleteModal(false);
  };

  const hasSelection = selectedKeys !== "all" && selectedKeys.size > 0 || selectedKeys === "all";

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div></div>
        <Button
          color="primary"
          onPress={handleAdd}
          startContent={<Plus className="w-4 h-4" />}
        >
          Tambah Jadwal
        </Button>
      </div>

      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by ID, customer..."
          startContent={<Search className="w-4 h-4 text-default-400" />}
          value={filters.search || ''}
          onClear={() => setFilters({ ...filters, search: '' })}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <div className="flex gap-3">
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
          <ExportButtons data={filteredSchedules} filename="schedules" />
        </div>
      </div>

      <div className="flex justify-end mb-4">
        {hasSelection && (
          <Button
            color="danger"
            variant="flat"
            startContent={<Trash className="w-4 h-4" />}
            onPress={() => setShowDeleteModal(true)}
          >
            Hapus ({selectedKeys === "all" ? filteredSchedules.length : selectedKeys.size})
          </Button>
        )}
      </div>

      <Table
        aria-label="Schedule table"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader>
          <TableColumn>ID Pekerjaan</TableColumn>
          <TableColumn>ID Pelanggan</TableColumn>
          <TableColumn>Nama Pelanggan</TableColumn>
          <TableColumn>Tanggal</TableColumn>
          <TableColumn>Karyawan</TableColumn>
          <TableColumn align="center">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredSchedules.map((schedule) => (
            <TableRow key={schedule.id}>
              <TableCell>{schedule.jobId}</TableCell>
              <TableCell>{schedule.customerId}</TableCell>
              <TableCell>{schedule.customerName}</TableCell>
              <TableCell>
                {new Date(schedule.date).toLocaleDateString('id-ID')}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {schedule.employees.map((employee) => (
                    <Chip key={employee.id} size="sm">
                      {employee.name}
                    </Chip>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => handleEdit(schedule.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => handleEdit(schedule.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ScheduleModal
        isOpen={isOpen}
        onClose={onClose}
        scheduleId={selectedId}
      />

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <ModalContent>
          <ModalHeader>Konfirmasi Hapus</ModalHeader>
          <ModalBody>
            Apakah Anda yakin ingin menghapus {selectedKeys === "all" ? filteredSchedules.length : selectedKeys.size} jadwal yang dipilih?
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
    </div>
  );
}