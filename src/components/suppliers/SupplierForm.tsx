import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { SupplierFormData, Address } from '../../types/supplier';
import { supplierSchema } from '../../lib/validation/supplier';
import { locations } from '../../lib/address';

interface Props {
  initialData?: SupplierFormData;
  onSubmit: (data: SupplierFormData) => void;
}

const emptyAddress: Address = {
  provinceId: '',
  regencyId: '',
  districtId: '',
  details: '',
};

export default function SupplierForm({ initialData, onSubmit }: Props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SupplierFormData>(
    initialData || {
      name: '',
      phone: '',
      address: emptyAddress,
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    try {
      supplierSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Error) {
        const zodError = JSON.parse(error.message);
        const newErrors: Record<string, string> = {};
        zodError.forEach((err: any) => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [field]: value,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Nama Supplier"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        errorMessage={errors['name']}
      />

      <Input
        label="Nomor Telepon"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        errorMessage={errors['phone']}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Alamat</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Provinsi"
            selectedKeys={formData.address.provinceId ? [formData.address.provinceId] : []}
            onChange={(e) => handleAddressChange('provinceId', e.target.value)}
            errorMessage={errors['address.provinceId']}
          >
            {Object.entries(locations.provinces).map(([id, name]) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Kabupaten"
            selectedKeys={formData.address.regencyId ? [formData.address.regencyId] : []}
            onChange={(e) => handleAddressChange('regencyId', e.target.value)}
            errorMessage={errors['address.regencyId']}
          >
            {Object.entries(locations.regencies).map(([id, name]) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Kecamatan"
            selectedKeys={formData.address.districtId ? [formData.address.districtId] : []}
            onChange={(e) => handleAddressChange('districtId', e.target.value)}
            errorMessage={errors['address.districtId']}
          >
            {Object.entries(locations.districts).map(([id, name]) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <Input
          type="text"
          label="Detail Alamat"
          value={formData.address.details}
          onChange={(e) => handleAddressChange('details', e.target.value)}
          errorMessage={errors['address.details']}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          color="default"
          variant="light"
          onPress={() => navigate('/suppliers')}
        >
          Kembali
        </Button>
        <Button color="primary" type="submit">
          Simpan
        </Button>
      </div>
    </form>
  );
}