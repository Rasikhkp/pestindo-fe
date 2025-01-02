import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { Plus } from 'lucide-react';
import { useSuppliers } from '../hooks/useSuppliers';
import SupplierTable from '../components/suppliers/SupplierTable';

export default function Suppliers() {
  const navigate = useNavigate();
  const { suppliers, deleteSuppliers } = useSuppliers();
  const [search, setSearch] = useState('');
  const [minOrders, setMinOrders] = useState<number>(0);
  const [maxOrders, setMaxOrders] = useState<number>(100);

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch = supplier.name.toLowerCase().includes(search.toLowerCase()) ||
      supplier.phone.includes(search) ||
      supplier.id.toLowerCase().includes(search.toLowerCase());
    const matchesOrders = supplier.totalOrders >= minOrders && supplier.totalOrders <= maxOrders;
    return matchesSearch && matchesOrders;
  });

  const handleEdit = (id: string) => {
    navigate(`/suppliers/edit/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-semibold">
          Supplier
        </h1>
        <Button
          color="primary"
          onPress={() => navigate('/suppliers/create')}
          startContent={<Plus className="w-4 h-4" />}
        >
          Tambah Supplier
        </Button>
      </div>

      <SupplierTable
        data={filteredSuppliers}
        onEdit={handleEdit}
        onDelete={deleteSuppliers}
      />
    </div>
  );
}