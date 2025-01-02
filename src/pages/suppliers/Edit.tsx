import { useParams, useNavigate } from 'react-router-dom';
import { SupplierFormData } from '../../types/supplier';
import SupplierForm from '../../components/suppliers/SupplierForm';
import { useSuppliers } from '../../hooks/useSuppliers';

export default function EditSupplier() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSupplierById, updateSupplier } = useSuppliers();
  const supplier = getSupplierById(id!);

  const handleSubmit = (data: SupplierFormData) => {
    updateSupplier({ id: id!, data });
    navigate('/suppliers');
  };

  if (!supplier) {
    return <div>Supplier not found</div>;
  }

  const initialData: SupplierFormData = {
    name: supplier.name,
    phone: supplier.phone,
    address: supplier.address,
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Edit Supplier</h1>
      <SupplierForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}