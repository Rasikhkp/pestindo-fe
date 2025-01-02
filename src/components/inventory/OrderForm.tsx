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
import { Plus, Trash } from 'lucide-react';
import { useSuppliers } from '../../hooks/useSuppliers';
import { useInventory } from '../../hooks/useInventory';
import { InventoryOrderFormData } from '../../types/inventory-order';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InventoryOrderFormData) => void;
  initialData?: InventoryOrderFormData;
}

export default function OrderForm({ isOpen, onClose, onSubmit, initialData }: Props) {
  const { suppliers } = useSuppliers();
  const { items } = useInventory();
  const [formData, setFormData] = useState<InventoryOrderFormData>(
    initialData || {
      supplierId: '',
      items: [],
    }
  );

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { itemId: '', quantity: 0, price: 0 }],
    });
  };

  const handleRemoveItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const handleItemChange = (index: number, field: keyof typeof formData.items[0], value: string | number) => {
    setFormData({
      ...formData,
      items: formData.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalContent>
        <ModalHeader>{initialData ? 'Edit Order' : 'Tambah Order'}</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Select
              label="Supplier"
              selectedKeys={formData.supplierId ? [formData.supplierId] : []}
              onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
            >
              {suppliers.map((supplier) => (
                <SelectItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </SelectItem>
              ))}
            </Select>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Items</h3>
                <Button
                  color="primary"
                  size="sm"
                  startContent={<Plus className="w-4 h-4" />}
                  onPress={handleAddItem}
                >
                  Tambah Item
                </Button>
              </div>

              {formData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-5">
                    <Select
                      label="Barang"
                      selectedKeys={item.itemId ? [item.itemId] : []}
                      onChange={(e) => handleItemChange(index, 'itemId', e.target.value)}
                    >
                      {items.map((invItem) => (
                        <SelectItem key={invItem.id} value={invItem.id}>
                          {invItem.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      label="Jumlah"
                      value={item.quantity.toString()}
                      onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      label="Harga"
                      value={item.price.toString()}
                      onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-1">
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      onPress={() => handleRemoveItem(index)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
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