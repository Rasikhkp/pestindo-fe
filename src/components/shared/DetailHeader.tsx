import { Button } from '@nextui-org/react';
import { ArrowLeft } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
  onBack: () => void;
}

export default function DetailHeader({ title, subtitle, onBack }: Props) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Button
        variant="light"
        isIconOnly
        onPress={onBack}
        className="h-10 w-10"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}