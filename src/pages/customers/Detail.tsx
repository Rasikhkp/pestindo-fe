import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Chip } from '@nextui-org/react';
import { User, Phone, Calendar } from 'lucide-react';
import DetailHeader from '../../components/shared/DetailHeader';
import InfoCard from '../../components/shared/InfoCard';
import AddressCard from '../../components/shared/AddressCard';
import CustomerJobsTable from '../../components/customers/CustomerJobsTable';
import { useCustomers } from '../../hooks/useCustomers';
import { useJobs } from '../../hooks/useJobs';
import { formatPhone } from '../../lib/utils';

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCustomerById } = useCustomers();
  const { getCustomerJobs } = useJobs();
  
  const customer = getCustomerById(id!);
  const customerJobs = getCustomerJobs(id!);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  const generalInfo = [
    { label: 'ID Pelanggan', value: customer.id },
    { label: 'Tipe', value: customer.type === 'company' ? 'Perusahaan' : 'Perorangan' },
    { label: customer.type === 'company' ? 'NPWP' : 'NIK', value: customer.identityNumber },
  ];

  const contactInfo = [
    { label: 'Nomor Telepon', value: formatPhone(customer.phone) },
    { 
      label: 'Tanggal Bergabung', 
      value: new Date(customer.createdAt).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
  ];

  return (
    <div className="space-y-6">
      <DetailHeader
        title={customer.name}
        subtitle={`${customer.type === 'company' ? 'Perusahaan' : 'Pelanggan Perorangan'}`}
        onBack={() => navigate('/customers')}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard
          title="Informasi Umum"
          icon={User}
          items={generalInfo}
        />
        <InfoCard
          title="Kontak"
          icon={Phone}
          items={contactInfo}
        />
        <Card className="h-full">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Statistik</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <p className="text-2xl font-bold text-primary">{customer.totalJobs}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Pekerjaan</p>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <p className="text-2xl font-bold text-success">
                  {customerJobs.filter(job => job.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Selesai</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddressCard
          title={`Alamat ${customer.type === 'company' ? 'NPWP' : 'KTP'}`}
          address={customer.legalAddress}
        />
        <AddressCard
          title="Alamat Saat Ini"
          address={customer.currentAddress}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Riwayat Pekerjaan</h3>
        </CardHeader>
        <CardBody>
          <CustomerJobsTable jobs={customerJobs} />
        </CardBody>
      </Card>
    </div>
  );
}