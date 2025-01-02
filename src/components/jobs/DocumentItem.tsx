import { Button } from '@nextui-org/react';
import { FileText, Download, Upload } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  title: string;
  isUploaded: boolean;
  uploadDate?: string;
  onUpload?: () => void;
  onDownload?: () => void;
}

export default function DocumentItem({ title, isUploaded, uploadDate, onUpload, onDownload }: Props) {
  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-lg border",
      isUploaded 
        ? "bg-success/5 border-success/20" 
        : "bg-default-100 border-default-200"
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-lg",
          isUploaded ? "bg-success/10" : "bg-default-200"
        )}>
          <FileText className={cn(
            "w-4 h-4",
            isUploaded ? "text-success" : "text-default-500"
          )} />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-gray-500">
            {isUploaded 
              ? `Diupload: ${uploadDate}`
              : 'Belum diupload'
            }
          </p>
        </div>
      </div>
      {isUploaded ? (
        <Button
          isIconOnly
          variant="flat"
          color="success"
          size="sm"
          onPress={onDownload}
        >
          <Download className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          color="primary"
          size="sm"
          variant="flat"
          startContent={<Upload className="w-4 h-4" />}
          onPress={onUpload}
        >
          Upload
        </Button>
      )}
    </div>
  );
}