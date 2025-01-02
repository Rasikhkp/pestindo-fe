import { useState } from 'react';
import {
  Card,
  CardBody,
  Button,
  Select,
  SelectItem,
  useDisclosure,
  Chip,
} from '@nextui-org/react';
import { Plus } from 'lucide-react';
import { useEmployees } from '../../hooks/useEmployees';
import { useInventoryRequests } from '../../hooks/useInventoryRequests';
import TechnicianApprovalForm from '../../components/inventory-technician/TechnicianApprovalForm';
import TechnicianApprovalRejectModal from '../../components/inventory-technician/TechnicianApprovalRejectModal';

const statusColorMap = {
  pending: 'warning',
  approved: 'success',
  rejected: 'danger',
} as const;

export default function TechnicianApprovalRequest() {
  const { employees } = useEmployees();
  const { requests, approveRequest, rejectRequest } = useInventoryRequests();
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isRejectOpen, onOpen: onRejectOpen, onClose: onRejectClose } = useDisclosure();

  const filteredRequests = selectedEmployee
    ? requests.filter(request => request.employeeId === selectedEmployee)
    : requests;

  const handleApprove = (id: string) => {
    approveRequest(id);
  };

  const handleReject = (id: string) => {
    setSelectedRequestId(id);
    onRejectOpen();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Approval Request</h1>
        <Button
          color="primary"
          onPress={onFormOpen}
          startContent={<Plus className="w-4 h-4" />}
          isDisabled={!selectedEmployee}
        >
          Tambah Approval
        </Button>
      </div>

      <Select
        label="Pilih Karyawan"
        selectedKeys={selectedEmployee ? [selectedEmployee] : []}
        onChange={(e) => setSelectedEmployee(e.target.value)}
      >
        {employees.map((employee) => (
          <SelectItem key={employee.id} value={employee.id}>
            {employee.name}
          </SelectItem>
        ))}
      </Select>

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
                    {(request.status === 'approved' || request.status === 'rejected') && (
                      <p className="text-sm text-gray-500">
                        {request.status === 'approved' ? 'Disetujui' : 'Ditolak'}: {
                          new Date(request.updatedAt || '').toLocaleDateString('id-ID', {
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

              <div>
                <p className="text-sm font-medium">Jenis:</p>
                <p className="text-sm">{request.type === 'check_in' ? 'Check In' : 'Check Out'}</p>
              </div>

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

      <TechnicianApprovalForm
        isOpen={isFormOpen}
        onClose={onFormClose}
        employeeId={selectedEmployee}
      />

      <TechnicianApprovalRejectModal
        isOpen={isRejectOpen}
        onClose={onRejectClose}
        onSubmit={(reason) => {
          if (selectedRequestId) {
            rejectRequest({ id: selectedRequestId, reason });
            setSelectedRequestId(null);
          }
          onRejectClose();
        }}
      />
    </div>
  );
}