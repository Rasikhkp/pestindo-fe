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
import { useActivities } from '../../hooks/useActivities';
import { ActivityFormData } from '../../types/activity';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ActivityForm({ isOpen, onClose }: Props) {
  const { addActivity } = useActivities();
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSubmit = () => {
    const formData: ActivityFormData = {
      description,
      images: selectedFiles,
    };
    addActivity(formData);
    setDescription('');
    setSelectedFiles([]);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>Tambah Aktivitas</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Textarea
              label="Deskripsi"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minRows={3}
            />

            <div>
              <label className="block text-sm font-medium mb-2">
                Gambar
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-white
                  hover:file:bg-primary/80"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Batal
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}