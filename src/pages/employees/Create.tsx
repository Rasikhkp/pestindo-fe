import { useNavigate } from 'react-router-dom';
import { EmployeeFormData } from '../../types/employee';
import EmployeeForm from '../../components/employees/EmployeeForm';
import { useEmployees } from '../../hooks/useEmployees';
import DetailHeader from '../../components/shared/DetailHeader';

export default function CreateEmployee() {
  const navigate = useNavigate();
  const { addEmployee } = useEmployees();

  const handleSubmit = (data: EmployeeFormData) => {
    addEmployee(data);
    navigate('/staff');
  };

  return (
    <div className="space-y-6">
      <DetailHeader
        title="Tambah Karyawan"
        subtitle="Tambah data karyawan baru"
        onBack={() => navigate('/staff')}
      />
      <EmployeeForm onSubmit={handleSubmit} />
    </div>
  );
}