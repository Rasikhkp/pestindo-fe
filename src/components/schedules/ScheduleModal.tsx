import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { useSchedules } from '../../hooks/useSchedules';
import { useJobs } from '../../hooks/useJobs';
import { useEmployees } from '../../hooks/useEmployees';
import { ScheduleFormData } from '../../types/schedule';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  scheduleId: string | null;
  defaultDate?: string | null;
}

export default function ScheduleModal({ isOpen, onClose, scheduleId, defaultDate }: Props) {
  const { getScheduleById, addSchedule, updateSchedule, deleteSchedules } = useSchedules();
  const { jobs } = useJobs();
  const { employees } = useEmployees();
  const [formData, setFormData] = useState<ScheduleFormData>({
    jobId: '',
    customerId: '',
    date: defaultDate || '',
    employeeIds: [],
  });

  useEffect(() => {
    if (scheduleId) {
      const schedule = getScheduleById(scheduleId);
      if (schedule) {
        setFormData({
          jobId: schedule.jobId,
          customerId: schedule.customerId,
          date: schedule.date,
          employeeIds: schedule.employees.map(emp => emp.id),
        });
      }
    } else if (defaultDate) {
      setFormData(prev => ({ ...prev, date: defaultDate }));
    }
  }, [scheduleId, defaultDate]);

  const handleSubmit = () => {
    if (scheduleId) {
      updateSchedule({ id: scheduleId, data: formData });
    } else {
      addSchedule(formData);
    }
    onClose();
  };

  const handleDelete = () => {
    if (scheduleId) {
      deleteSchedules([scheduleId]);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>
          {scheduleId ? 'Edit Jadwal' : 'Tambah Jadwal'}
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Select
              label="ID Pekerjaan"
              selectedKeys={formData.jobId ? [formData.jobId] : []}
              onChange={(e) => setFormData({ ...formData, jobId: e.target.value })}
            >
              {jobs.map((job) => (
                <SelectItem key={job.id} value={job.id}>
                  {job.id} - {job.customerName}
                </SelectItem>
              ))}
            </Select>

            <Input
              type="date"
              label="Tanggal"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />

            <Select
              label="Karyawan"
              selectionMode="multiple"
              selectedKeys={new Set(formData.employeeIds)}
              onChange={(e) => setFormData({ ...formData, employeeIds: Array.from(e.target.value) })}
            >
              {employees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  {employee.name} - {employee.position}
                </SelectItem>
              ))}
            </Select>
          </div>
        </ModalBody>
        <ModalFooter>
          {scheduleId && (
            <Button
              color="danger"
              variant="light"
              onPress={handleDelete}
            >
              Hapus
            </Button>
          )}
          <Button
            color="default"
            variant="light"
            onPress={onClose}
          >
            Batal
          </Button>
          <Button
            color="primary"
            onPress={handleSubmit}
          >
            {scheduleId ? 'Update' : 'Simpan'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}