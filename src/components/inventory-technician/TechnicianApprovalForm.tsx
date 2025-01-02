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
  RadioGroup,
  Radio,
} from '@nextui-org/react';
import { useState } from 'react';
import { Plus, Trash } from 'lucide-react';
import { useInventory } from '../../hooks/useInventory';
import { useInventoryRequests } from '../../hooks/useInventoryRequests';
import { InventoryRequestFormData } from '../../types/inventory-request';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  employeeId: string;
}

export default function TechnicianApprovalForm({ isOpen, onClose, employeeId }: Props) {
  const { items } = useInventory();
  const { addRequest } = useInventoryRequests();
  const [formData, setFormData] = useState<InventoryRequestFormData>({
    employeeId,
    type: 'check_out',
    items: [{ itemId: '', quantity: 0 }],
  });

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { itemId: '', quantity: 0 }],
    });
  };

  const handleRemoveItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    addRequest(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>Tambah Approval</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <RadioGroup
              orientation="horizontal"
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as 'check_in' | 'check_out' })}
            >
              <Radio value="check_in">Check In</Radio>
              <Radio value="check_out">Check Out</Radio>
            </RadioGroup>

            <div className="space-y-4">
              {formData.items.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <Select
                    className="flex-1"
                    label="Barang"
                    selectedKeys={item.itemId ? [item.itemId] : []}
                    onChange={(e) => {
                      const newItems = [...formData.items];
                      newItems[index].itemId = e.target.value;
                      setFormData({ ...formData, items: newItems });
                    }}
                  >
                    {items.map((invItem) => (
                      <SelectItem key={invItem.id} value={invItem.id}>
                        {invItem.name}
                      </SelectItem>
                    ))}
                  </Select>

                  <Input
                    type="number"
                    label="Jumlah"
                    className="w-32"
                    value={item.quantity.toString()}
                    onChange={(e) => {
                      const newItems = [...formData.items];
                      newItems[index].quantity = Number(e.target.value);
                      setFormData({ ...formData, items: newItems });
                    }}
                  />

                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onPress={() => handleRemoveItem(index)}
                    className="self-end"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              <Button
                color="primary"
                variant="flat"
                startContent={<Plus className="w-4 h-4" />}
                onPress={handleAddItem}
              >
                Tambah Item
              </Button>
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