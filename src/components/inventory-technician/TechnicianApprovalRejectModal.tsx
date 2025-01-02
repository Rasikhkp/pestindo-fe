import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from '@nextui-org/react';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

export default function TechnicianApprovalRejectModal({ isOpen, onClose, onSubmit }: Props) {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    onSubmit(reason);
    setReason('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Alasan Penolakan</ModalHeader>
        <ModalBody>
          <Textarea
            label="Alasan"
            placeholder="Masukkan alasan penolakan"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Batal
          </Button>
          <Button color="danger" onPress={handleSubmit}>
            Tolak
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}