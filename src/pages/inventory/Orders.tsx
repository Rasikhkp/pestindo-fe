import { useState } from 'react';
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
  Chip,
  Progress,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { Plus, Pencil, Trash, Check, Search, Filter } from 'lucide-react';
import { useInventoryOrders } from '../../hooks/useInventoryOrders';
import OrderFilters from '../../components/inventory/OrderFilters';
import OrderForm from '../../components/inventory/OrderForm';
import ReceiveOrderForm from '../../components/inventory/ReceiveOrderForm';
import ExportButtons from '../../components/customers/ExportButtons';
import { InventoryOrderFilterOptions } from '../../types/inventory-order';

const statusColorMap = {
  pending: 'warning',
  processing: 'primary',
  completed: 'success',
  cancelled: 'danger',
} as const;

export default function Orders() {
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isReceiveOpen, onOpen: onReceiveOpen, onClose: onReceiveClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<InventoryOrderFilterOptions>({
    startDate: '',
    endDate: '',
    minPercentage: undefined,
    maxPercentage: undefined,
    status: 'all',
  });
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const {
    orders,
    addOrder,
    updateOrder,
    deleteOrders,
    receiveOrder,
    getOrderById,
    getFilteredOrders,
  } = useInventoryOrders();

  const filteredOrders = getFilteredOrders(filters);

  const handleAdd = () => {
    setSelectedOrder(null);
    onFormOpen();
  };

  const handleEdit = (id: string) => {
    setSelectedOrder(id);
    onFormOpen();
  };

  const handleReceive = (id: string) => {
    setSelectedOrder(id);
    onReceiveOpen();
  };

  const handleDelete = () => {
    if (selectedKeys === "all") {
      deleteOrders(orders.map(order => order.id));
    } else {
      deleteOrders(Array.from(selectedKeys as Set<string>));
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

  const hasSelection = selectedKeys !== "all" && selectedKeys.size > 0 || selectedKeys === "all";

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Order</h1>
        <Button
          color="primary"
          onPress={handleAdd}
          startContent={<Plus className="w-4 h-4" />}
        >
          Tambah Order
        </Button>
      </div>

      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by ID or supplier..."
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
                Tanggal
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <div className="flex gap-4">
                <Input
                  type="date"
                  label="Dari Tanggal"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
                <Input
                  type="date"
                  label="Sampai Tanggal"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
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
                Persentase Diterima
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <div className="flex gap-4">
                <Input
                  type="number"
                  label="Min %"
                  value={filters.minPercentage?.toString() || ''}
                  onChange={(e) => setFilters({ ...filters, minPercentage: Number(e.target.value) || undefined })}
                />
                <Input
                  type="number"
                  label="Max %"
                  value={filters.maxPercentage?.toString() || ''}
                  onChange={(e) => setFilters({ ...filters, maxPercentage: Number(e.target.value) || undefined })}
                />
              </div>
            </PopoverContent>
          </Popover>

          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="flat" 
                startContent={<Filter className="w-4 h-4" />}
              >
                Status: {filters.status === 'all' ? 'Semua' : filters.status}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Status Filter"
              onAction={(key) => setFilters({ ...filters, status: key as any })}
            >
              <DropdownItem key="all">Semua</DropdownItem>
              <DropdownItem key="pending">Pending</DropdownItem>
              <DropdownItem key="processing">Processing</DropdownItem>
              <DropdownItem key="completed">Completed</DropdownItem>
              <DropdownItem key="cancelled">Cancelled</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <ExportButtons data={filteredOrders} filename="inventory-orders" />
        </div>
      </div>

      <div className="flex justify-end">
        {hasSelection && (
          <Button
            color="danger"
            variant="flat"
            startContent={<Trash className="w-4 h-4" />}
            onPress={() => setShowDeleteModal(true)}
          >
            Hapus ({selectedKeys === "all" ? filteredOrders.length : selectedKeys.size})
          </Button>
        )}
      </div>

      <Table
        aria-label="Orders table"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader>
          <TableColumn>ID Order</TableColumn>
          <TableColumn>Supplier</TableColumn>
          <TableColumn>Total Item</TableColumn>
          <TableColumn>Total Harga</TableColumn>
          <TableColumn>Tanggal Dibuat</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Item Diterima</TableColumn>
          <TableColumn align="center">Aksi</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.supplierName}</TableCell>
              <TableCell>{order.totalItems}</TableCell>
              <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString('id-ID')}
              </TableCell>
              <TableCell>
                <Chip
                  color={statusColorMap[order.status]}
                  variant="flat"
                  size="sm"
                >
                  {order.status.toUpperCase()}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress
                    value={order.receivedPercentage}
                    size="sm"
                    color={statusColorMap[order.status]}
                    className="max-w-md"
                  />
                  <span className="text-sm">
                    {order.receivedPercentage}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  {order.status !== 'completed' && order.status !== 'cancelled' && (
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onPress={() => handleReceive(order.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => handleEdit(order.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    size="sm"
                    onPress={() => {
                      setSelectedKeys(new Set([order.id]));
                      setShowDeleteModal(true);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <OrderForm
        isOpen={isFormOpen}
        onClose={onFormClose}
        onSubmit={selectedOrder ? updateOrder : addOrder}
        initialData={selectedOrder ? getOrderById(selectedOrder) : undefined}
      />

      <ReceiveOrderForm
        isOpen={isReceiveOpen}
        onClose={onReceiveClose}
        orderId={selectedOrder}
        onSubmit={receiveOrder}
      />

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <ModalContent>
          <ModalHeader>Konfirmasi Hapus</ModalHeader>
          <ModalBody>
            Apakah Anda yakin ingin menghapus {selectedKeys === "all" ? filteredOrders.length : selectedKeys.size} order yang dipilih?
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