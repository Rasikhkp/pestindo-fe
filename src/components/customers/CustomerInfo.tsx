import { Card, CardBody } from '@nextui-org/react';
import { Customer } from '../../types/customer';
import { MapPin } from 'lucide-react';
import { formatAddress } from '../../lib/address';

interface Props {
  customer: Customer;
}

export default function CustomerInfo({ customer }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardBody>
          <h3 className="text-lg font-semibold mb-4">Informasi Umum</h3>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Tipe</span>
              <p className="font-medium capitalize">
                {customer.type === 'company' ? 'Perusahaan' : 'Perorangan'}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {customer.type === 'company' ? 'Nama Perusahaan' : 'Nama Lengkap'}
              </span>
              <p className="font-medium">{customer.name}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {customer.type === 'company' ? 'NPWP' : 'NIK'}
              </span>
              <p className="font-medium">{customer.identityNumber}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h3 className="text-lg font-semibold mb-4">Alamat</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Alamat {customer.type === 'company' ? 'NPWP' : 'KTP'}
                </span>
              </div>
              <p className="text-sm">{formatAddress(customer.legalAddress)}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Alamat Saat Ini
                </span>
              </div>
              <p className="text-sm">{formatAddress(customer.currentAddress)}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}