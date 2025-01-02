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
  PopoverTrigger,
  PopoverContent
} from '@nextui-org/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash, Search, Filter } from 'lucide-react';
import { Supplier } from '../../types/supplier';
import { formatPhone } from '../../lib/utils';
import ExportButtons from '../customers/ExportButtons';

interface Props {
  data: Supplier[];
  onEdit: (id: string) => void;
  onDelete: (ids: string[]) => void;
}

export default function SupplierTable({ data, onEdit, onDelete }: Props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [search, setSearch] = useState('');
  const [minOrders, setMinOrders] = useState<number>(0);
  const [maxOrders, setMaxOrders] = useState<number>(100);

  const filteredSuppliers = data.filter((supplier) => {
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      supplier.id.toLowerCase().includes(searchLower) ||
      supplier.name.toLowerCase().includes(searchLower) ||
      supplier.phone.includes(searchLower);

    const matchesOrderRange = 
      supplier.totalOrders >= minOrders && 
      supplier.totalOrders <= maxOrders;

    return matchesSearch && matchesOrderRange;
  });

  const handleDelete = () => {
    const selectedArray = Array.from(selectedKeys as Set<string>);
    onDelete(selectedArray);
    setSelectedKeys(new Set([]));
    onClose();
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
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Button 
                    variant="flat" 
                    startContent={<Filter className="w-4 h-4" />}
                  >
                    Orders Range
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-4">
                  <div className="flex gap-4">
                    <Input
                      type="number"
                      label="Min Jobs"
                      value={minOrders.toString()}
                      onChange={(e) => setMinOrders(Number(e.target.value))}
                    />
                    <Input
                      type="number"
                      label="Max Jobs"
                      value={maxOrders.toString()}
                      onChange={(e) => setMaxOrders(Number(e.target.value))}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            <ExportButtons data={filteredSuppliers} filename="suppliers" />
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
          aria-label="Supplier table"
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <TableHeader>
            <TableColumn key="id">ID</TableColumn>
            <TableColumn key="name">Name</TableColumn>
            <TableColumn key="phone">Phone</TableColumn>
            <TableColumn key="totalOrders">Total Orders</TableColumn>
            <TableColumn key="actions" align="center">Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.id}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{formatPhone(supplier.phone)}</TableCell>
                <TableCell>{supplier.totalOrders}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onPress={() => navigate(`/suppliers/${supplier.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onPress={() => onEdit(supplier.id)}
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
            Are you sure you want to delete {selectedKeys.size} selected suppliers?
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