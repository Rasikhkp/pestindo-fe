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
  Chip,
} from '@nextui-org/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash, Search, Filter } from 'lucide-react';
import ExportButtons from '../shared/ExportButtons';
import { Employee } from '../../types/employee';
import { formatPhone } from '../../lib/utils';

interface Props {
  data: Employee[];
  onEdit: (id: string) => void;
  onDelete: (ids: string[]) => void;
}

const positionColorMap = {
  manager: 'success',
  supervisor: 'primary',
  staff: 'secondary',
  technician: 'warning',
  admin: 'default',
  sales: 'danger',
} as const;

export default function EmployeeTable({ data, onEdit, onDelete }: Props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [search, setSearch] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filters, setFilters] = useState({
    position: 'all',
  });

  const filteredEmployees = data.filter((employee) => {
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      employee.id.toLowerCase().includes(searchLower) ||
      employee.name.toLowerCase().includes(searchLower) ||
      employee.email.toLowerCase().includes(searchLower) ||
      employee.phone.includes(searchLower);

    const matchesPosition = filters.position === 'all' || employee.position === filters.position;

    return matchesSearch && matchesPosition;
  });

  const handleDelete = () => {
    if (selectedKeys === "all") {
      onDelete(filteredEmployees.map(employee => employee.id));
    } else {
      onDelete(Array.from(selectedKeys as Set<string>));
    }
    setSelectedKeys(new Set([]));
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name, email, phone..."
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
                  Position: {filters.position === 'all' ? 'All' : filters.position}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Position Filter"
                onAction={(key) => setFilters({ ...filters, position: key as string })}
              >
                <DropdownItem key="all">All</DropdownItem>
                <DropdownItem key="manager">Manager</DropdownItem>
                <DropdownItem key="supervisor">Supervisor</DropdownItem>
                <DropdownItem key="staff">Staff</DropdownItem>
                <DropdownItem key="technician">Technician</DropdownItem>
                <DropdownItem key="admin">Admin</DropdownItem>
                <DropdownItem key="sales">Sales</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <ExportButtons data={filteredEmployees} filename="employees" />
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
        aria-label="Employee table"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Nama</TableColumn>
          <TableColumn>Jabatan</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>No HP</TableColumn>
          <TableColumn align="center">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>
                <Chip
                  color={positionColorMap[employee.position]}
                  variant="flat"
                  size="sm"
                >
                  {employee.position.toUpperCase()}
                </Chip>
              </TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{formatPhone(employee.phone)}</TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => navigate(`/staff/${employee.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => onEdit(employee.id)}
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
            Apakah Anda yakin ingin menghapus {selectedKeys === "all" ? filteredEmployees.length : selectedKeys.size} karyawan yang dipilih?
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