import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { Plus } from 'lucide-react';
import EmployeeTable from '../components/employees/EmployeeTable';
import EmployeeFilters from '../components/employees/EmployeeFilters';
import { useEmployees } from '../hooks/useEmployees';
import { EmployeeFilterOptions } from '../types/employee';

export default function Staff() {
  const navigate = useNavigate();
  const { deleteEmployees, getFilteredEmployees } = useEmployees();
  const [filters, setFilters] = useState<EmployeeFilterOptions>({});

  const filteredEmployees = getFilteredEmployees(filters);

  const handleEdit = (id: string) => {
    navigate(`/staff/edit/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Karyawan
        </h1>
        <Button
          color="primary"
          onPress={() => navigate('/staff/create')}
          startContent={<Plus className="w-4 h-4" />}
        >
          Tambah Karyawan
        </Button>
      </div>

      <EmployeeTable
        data={filteredEmployees}
        onEdit={handleEdit}
        onDelete={deleteEmployees}
      />
    </div>
  );
}