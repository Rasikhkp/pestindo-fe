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
import { useState } from 'react';
import { InventoryFormData } from '../../types/inventory';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InventoryFormData) => void;
  initialData?: InventoryFormData;
}

const units = ['Liter', 'Unit', 'Piece', 'Box'];

export default function TechnicianInventoryForm({ isOpen, onClose, onSubmit, initialData }: Props) {
  const [formData, setFormData] = useState<InventoryFormData>(
    initialData || {
      name: '',
      price: 0,
      stock: 0,
      unit: '',
    }
  );

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{initialData ? 'Edit Barang' : 'Tambah Barang'}</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input
              label="Nama Barang"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            
            <Input
              type="number"
              label="Harga"
              value={formData.price.toString()}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />

            <Input
              type="number"
              label="Stok"
              value={formData.stock.toString()}
              onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
            />

            <Select
              label="Unit"
              selectedKeys={formData.unit ? [formData.unit] : []}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            >
              {units.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </Select>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Batal
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            {initialData ? 'Update' : 'Simpan'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}