import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
} from '@nextui-org/react';
import { useSchedules } from '../../hooks/useSchedules';
import ScheduleModal from './ScheduleModal';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  scheduleId: string | null;
  defaultDate?: string | null;
}

export default function ScheduleDetailModal({ isOpen, onClose, scheduleId, defaultDate }: Props) {
  const { getScheduleById, deleteSchedules } = useSchedules();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const schedule = scheduleId ? getScheduleById(scheduleId) : null;

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    if (scheduleId) {
      deleteSchedules([scheduleId]);
      setShowDeleteConfirm(false);
      onClose();
    }
  };

  // If there's no schedule and we have a default date, show the create form directly
  if (!schedule && defaultDate) {
    return (
      <ScheduleModal
        isOpen={isOpen}
        onClose={onClose}
        scheduleId={null}
        defaultDate={defaultDate}
      />
    );
  }

  if (!schedule) return null;

  return (
    <>
      <Modal isOpen={isOpen && !showEditModal && !showDeleteConfirm} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>Detail Jadwal</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">ID Pekerjaan</p>
                  <p className="font-medium">{schedule.jobId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pelanggan</p>
                  <p className="font-medium">{schedule.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tanggal</p>
                  <p className="font-medium">
                    {new Date(schedule.date).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Karyawan</p>
                <div className="flex flex-wrap gap-2">
                  {schedule.employees.map((employee) => (
                    <Chip key={employee.id} size="sm">
                      {employee.name} - {employee.position}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setShowDeleteConfirm(true)}
            >
              Hapus
            </Button>
            <Button
              color="primary"
              onPress={handleEdit}
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
      >
        <ModalContent>
          <ModalHeader>Konfirmasi Hapus</ModalHeader>
          <ModalBody>
            Apakah Anda yakin ingin menghapus jadwal ini?
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onPress={() => setShowDeleteConfirm(false)}
            >
              Batal
            </Button>
            <Button
              color="danger"
              onPress={handleDelete}
            >
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ScheduleModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          onClose();
        }}
        scheduleId={scheduleId}
      />
    </>
  );
}