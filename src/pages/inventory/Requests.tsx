import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { Plus } from 'lucide-react';
import { useInventoryRequests } from '../../hooks/useInventoryRequests';
import { useEmployees } from '../../hooks/useEmployees';
import { useInventory } from '../../hooks/useInventory';
import { InventoryRequestFilterOptions } from '../../types/inventory-request';

const statusColorMap = {
  pending: 'warning',
  approved: 'success',
  rejected: 'danger',
} as const;

export default function InventoryRequests() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filters, setFilters] = useState<InventoryRequestFilterOptions>({});
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  
  const { requests, getFilteredRequests, approveRequest, rejectRequest } = useInventoryRequests();
  const { employees } = useEmployees();
  const { items } = useInventory();

  const filteredRequests = getFilteredRequests(filters);

  const handleApprove = (id: string) => {
    approveRequest(id);
  };

  const handleReject = (id: string) => {
    setSelectedRequestId(id);
    setShowRejectionModal(true);
  };

  const confirmReject = () => {
    if (selectedRequestId) {
      rejectRequest({ id: selectedRequestId, reason: rejectionReason });
      setShowRejectionModal(false);
      setRejectionReason('');
      setSelectedRequestId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Pengajuan Inventaris</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Karyawan"
          onChange={(e) => setFilters({ ...filters, employeeId: e.target.value })}
        >
          <SelectItem key="all" value="">Semua Karyawan</SelectItem>
          {employees.map((employee) => (
            <SelectItem key={employee.id} value={employee.id}>
              {employee.name}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Tipe"
          onChange={(e) => setFilters({ ...filters, type: e.target.value as any })}
        >
          <SelectItem key="all" value="all">Semua</SelectItem>
          <SelectItem key="check_in" value="check_in">Check In</SelectItem>
          <SelectItem key="check_out" value="check_out">Check Out</SelectItem>
        </Select>

        <Select
          label="Status"
          onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
        >
          <SelectItem key="all" value="all">Semua</SelectItem>
          <SelectItem key="pending" value="pending">Pending</SelectItem>
          <SelectItem key="approved" value="approved">Disetujui</SelectItem>
          <SelectItem key="rejected" value="rejected">Ditolak</SelectItem>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRequests.map((request) => (
          <Card key={request.id}>
            <CardBody className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{request.employeeName}</p>
                  <p className="text-sm text-gray-500">{request.id}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500">
                      Dibuat: {new Date(request.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    {(request.status === 'approved' || request.status === 'rejected') && request.updatedAt && (
                      <p className="text-sm text-gray-500">
                        {request.status === 'approved' ? 'Disetujui' : 'Ditolak'}: {
                          new Date(request.updatedAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        }
                      </p>
                    )}
                  </div>
                </div>
                <Chip
                  color={statusColorMap[request.status]}
                  variant="flat"
                >
                  {request.status === 'pending' ? 'Menunggu' :
                   request.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                </Chip>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Items:</p>
                <div className="space-y-2">
                  {request.items.map((item) => (
                    <div key={item.itemId} className="flex justify-between text-sm">
                      <span>{item.itemName}</span>
                      <span>{item.quantity} unit</span>
                    </div>
                  ))}
                </div>
              </div>

              {request.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    color="success"
                    variant="flat"
                    size="sm"
                    className="flex-1"
                    onPress={() => handleApprove(request.id)}
                  >
                    Setujui
                  </Button>
                  <Button
                    color="danger"
                    variant="flat"
                    size="sm"
                    className="flex-1"
                    onPress={() => handleReject(request.id)}
                  >
                    Tolak
                  </Button>
                </div>
              )}

              {request.status === 'rejected' && request.rejectionReason && (
                <div className="text-sm text-danger">
                  <p className="font-medium">Alasan Penolakan:</p>
                  <p>{request.rejectionReason}</p>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal isOpen={showRejectionModal} onClose={() => setShowRejectionModal(false)}>
        <ModalContent>
          <ModalHeader>Alasan Penolakan</ModalHeader>
          <ModalBody>
            <Input
              label="Alasan"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setShowRejectionModal(false)}>
              Batal
            </Button>
            <Button color="danger" onPress={confirmReject}>
              Tolak
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}