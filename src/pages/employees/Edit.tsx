import { useParams, useNavigate } from 'react-router-dom';
import { EmployeeFormData } from '../../types/employee';
import EmployeeForm from '../../components/employees/EmployeeForm';
import { useEmployees } from '../../hooks/useEmployees';
import DetailHeader from '../../components/shared/DetailHeader';

export default function EditEmployee() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEmployeeById, updateEmployee } = useEmployees();
  const employee = getEmployeeById(id!);

  if (!employee) {
    return <div>Employee not found</div>;
  }

  const handleSubmit = (data: EmployeeFormData) => {
    updateEmployee({ id: id!, data });
    navigate('/staff');
  };

  const initialData: EmployeeFormData = {
    name: employee.name,
    nik: employee.nik,
    email: employee.email,
    phone: employee.phone,
    position: employee.position,
    legalAddress: employee.legalAddress,
    currentAddress: employee.currentAddress,
  };

  return (
    <div className="space-y-6">
      <DetailHeader
        title="Edit Karyawan"
        subtitle={`Edit data karyawan ${employee.name}`}
        onBack={() => navigate('/staff')}
      />
      <EmployeeForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}