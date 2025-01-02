import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardBody } from '@nextui-org/react';
import { User, Phone, Mail, Briefcase } from 'lucide-react';
import DetailHeader from '../../components/shared/DetailHeader';
import InfoCard from '../../components/shared/InfoCard';
import AddressCard from '../../components/shared/AddressCard';
import { useEmployees } from '../../hooks/useEmployees';
import { formatPhone } from '../../lib/utils';

export default function EmployeeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEmployeeById } = useEmployees();
  
  const employee = getEmployeeById(id!);

  if (!employee) {
    return <div>Employee not found</div>;
  }

  const personalInfo = [
    { label: 'ID Karyawan', value: employee.id },
    { label: 'NIK', value: employee.nik },
  ];

  const contactInfo = [
    { label: 'Email', value: employee.email },
    { label: 'No HP', value: formatPhone(employee.phone) },
  ];

  const positionInfo = [
    { label: 'Jabatan', value: employee.position.toUpperCase() },
    { 
      label: 'Tanggal Bergabung', 
      value: new Date(employee.createdAt).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
  ];

  return (
    <div className="space-y-6">
      <DetailHeader
        title={employee.name}
        subtitle={`${employee.position.toUpperCase()}`}
        onBack={() => navigate('/staff')}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard
          title="Informasi Pribadi"
          icon={User}
          items={personalInfo}
        />
        <InfoCard
          title="Kontak"
          icon={Phone}
          items={contactInfo}
        />
        <InfoCard
          title="Jabatan"
          icon={Briefcase}
          items={positionInfo}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddressCard
          title="Alamat KTP"
          address={employee.legalAddress}
        />
        <AddressCard
          title="Alamat Saat Ini"
          address={employee.currentAddress}
        />
      </div>
    </div>
  );
}