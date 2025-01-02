import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { useInventoryOrders } from '../../hooks/useInventoryOrders';
import { ReceiveOrderFormData } from '../../types/inventory-order';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
  onSubmit: (data: { id: string; data: ReceiveOrderFormData }) => void;
}

export default function ReceiveOrderForm({ isOpen, onClose, orderId, onSubmit }: Props) {
  const { getOrderById } = useInventoryOrders();
  const [formData, setFormData] = useState<ReceiveOrderFormData>({ items: [] });

  useEffect(() => {
    if (orderId) {
      const order = getOrderById(orderId);
      if (order) {
        setFormData({
          items: order.items.map(item => ({
            itemId: item.itemId,
            receivedQuantity: item.receivedQuantity,
          })),
        });
      }
    }
  }, [orderId, getOrderById]);

  const handleSubmit = () => {
    if (orderId) {
      onSubmit({ id: orderId, data: formData });
      onClose();
    }
  };

  const order = orderId ? getOrderById(orderId) : null;

  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>Terima Barang</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={item.itemId} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6">
                  <p className="font-medium">{item.itemName}</p>
                  <p className="text-sm text-gray-500">
                    Dipesan: {item.quantity} | Diterima: {item.receivedQuantity}
                  </p>
                </div>
                <div className="col-span-6">
                  <Input
                    type="number"
                    label="Jumlah Diterima"
                    value={formData.items[index]?.receivedQuantity.toString()}
                    onChange={(e) => {
                      const newItems = [...formData.items];
                      newItems[index] = {
                        itemId: item.itemId,
                        receivedQuantity: Number(e.target.value),
                      };
                      setFormData({ items: newItems });
                    }}
                  />
                </div>
              </div>
            ))}
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