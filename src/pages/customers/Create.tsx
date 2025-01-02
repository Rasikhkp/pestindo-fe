import { useNavigate } from 'react-router-dom';
import { CustomerFormData } from '../../types/customer';
import CustomerForm from '../../components/customers/CustomerForm';
import { useCustomers } from '../../hooks/useCustomers';

export default function CreateCustomer() {
  const navigate = useNavigate();
  const { addCustomer } = useCustomers();

  const handleSubmit = (data: CustomerFormData) => {
    addCustomer(data);
    navigate('/customers');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Tambah Pelanggan</h1>
      <CustomerForm onSubmit={handleSubmit} />
    </div>
  );
}