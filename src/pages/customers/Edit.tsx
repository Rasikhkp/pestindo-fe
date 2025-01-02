import { useParams, useNavigate } from 'react-router-dom';
import { CustomerFormData } from '../../types/customer';
import CustomerForm from '../../components/customers/CustomerForm';
import { useCustomers } from '../../hooks/useCustomers';

export default function EditCustomer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCustomerById, updateCustomer } = useCustomers();
  const customer = getCustomerById(id!);

  const handleSubmit = (data: CustomerFormData) => {
    updateCustomer({ id: id!, data });
    navigate('/customers');
  };

  if (!customer) {
    return <div>Customer not found</div>;
  }

  const initialData: CustomerFormData = {
    type: customer.type,
    name: customer.name,
    identityNumber: customer.identityNumber,
    legalAddress: customer.legalAddress,
    currentAddress: customer.currentAddress,
    phone: customer.phone,
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Edit Pelanggan</h1>
      <CustomerForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}