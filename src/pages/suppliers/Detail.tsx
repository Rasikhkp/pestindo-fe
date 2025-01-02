import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Chip, Progress } from '@nextui-org/react';
import { Building2, Phone, Calendar, Package } from 'lucide-react';
import DetailHeader from '../../components/shared/DetailHeader';
import InfoCard from '../../components/shared/InfoCard';
import AddressCard from '../../components/shared/AddressCard';
import { useSuppliers } from '../../hooks/useSuppliers';
import { useSupplierOrders } from '../../hooks/useSupplierOrders';
import { formatPhone } from '../../lib/utils';

const statusColorMap = {
  pending: 'warning',
  processing: 'primary',
  completed: 'success',
  cancelled: 'danger',
} as const;

export default function SupplierDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSupplierById } = useSuppliers();
  const { getSupplierOrders } = useSupplierOrders();
  
  const supplier = getSupplierById(id!);
  const orders = getSupplierOrders(id!);

  if (!supplier) {
    return <div>Supplier not found</div>;
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };

  const generalInfo = [
    { label: 'ID Supplier', value: supplier.id },
    { label: 'Nama Perusahaan', value: supplier.name },
  ];

  const contactInfo = [
    { label: 'Nomor Telepon', value: formatPhone(supplier.phone) },
    { 
      label: 'Tanggal Bergabung', 
      value: new Date(supplier.createdAt).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
  ];

  const completedOrders = orders.filter(order => order.status === 'completed').length;
  const totalValue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <div className="space-y-6">
      <DetailHeader
        title={supplier.name}
        subtitle={`Supplier ID: ${supplier.id}`}
        onBack={() => navigate('/suppliers')}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard
          title="Informasi Umum"
          icon={Building2}
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
              <Package className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Statistik Order</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <p className="text-2xl font-bold text-primary">{supplier.totalOrders}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Order</p>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <p className="text-2xl font-bold text-success">{completedOrders}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Order Selesai</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Nilai Order</p>
              <p className="text-xl font-bold text-primary">{formatCurrency(totalValue)}</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <AddressCard
        title="Alamat Supplier"
        address={supplier.address}
      />

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Riwayat Order</h3>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">ID Order</th>
                  <th className="text-left py-3 px-4">Jumlah Item</th>
                  <th className="text-left py-3 px-4">Total Harga</th>
                  <th className="text-left py-3 px-4">Tanggal Dibuat</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Progress</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{order.totalItems}</td>
                    <td className="py-3 px-4">{formatCurrency(order.totalPrice)}</td>
                    <td className="py-3 px-4">
                      {new Date(order.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="py-3 px-4">
                      <Chip
                        color={statusColorMap[order.status]}
                        variant="flat"
                        size="sm"
                      >
                        {order.status.toUpperCase()}
                      </Chip>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Progress
                          value={order.receivedPercentage}
                          size="sm"
                          color={statusColorMap[order.status]}
                          className="max-w-md"
                        />
                        <span className="text-sm">
                          {order.receivedPercentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}