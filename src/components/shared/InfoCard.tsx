import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { LucideIcon } from 'lucide-react';

interface InfoItem {
  label: string;
  value: string | number;
}

interface Props {
  title: string;
  icon?: LucideIcon;
  items: InfoItem[];
}

export default function InfoCard({ title, icon: Icon, items }: Props) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-primary" />}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index}>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.label}
              </span>
              <p className="font-medium mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}