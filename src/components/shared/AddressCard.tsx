import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { MapPin } from 'lucide-react';
import { Address } from '../../types/customer';
import { formatAddress } from '../../lib/address';

interface Props {
  title: string;
  address: Address;
}

export default function AddressCard({ title, address }: Props) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-sm leading-relaxed">
          {formatAddress(address)}
        </p>
      </CardBody>
    </Card>
  );
}