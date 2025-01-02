import { useNavigate } from 'react-router-dom';
import { SupplierFormData } from '../../types/supplier';
import SupplierForm from '../../components/suppliers/SupplierForm';
import { useSuppliers } from '../../hooks/useSuppliers';

export default function CreateSupplier() {
  const navigate = useNavigate();
  const { addSupplier } = useSuppliers();

  const handleSubmit = (data: SupplierFormData) => {
    addSupplier(data);
    navigate('/suppliers');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Tambah Supplier</h1>
      <SupplierForm onSubmit={handleSubmit} />
    </div>
  );
}