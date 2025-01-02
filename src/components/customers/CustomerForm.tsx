import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  RadioGroup,
  Radio,
  Switch,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { CustomerFormData, CustomerType, Address } from '../../types/customer';
import { customerSchema } from '../../lib/validation';
import { locations } from '../../lib/address';

interface Props {
  initialData?: CustomerFormData;
  onSubmit: (data: CustomerFormData) => void;
}

const emptyAddress: Address = {
  provinceId: '',
  regencyId: '',
  districtId: '',
  details: '',
};

export default function CustomerForm({ initialData, onSubmit }: Props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CustomerFormData>(
    initialData || {
      type: 'individual',
      name: '',
      identityNumber: '',
      legalAddress: emptyAddress,
      currentAddress: emptyAddress,
      phone: '',
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sameAddress, setSameAddress] = useState(false);

  const validateForm = () => {
    try {
      customerSchema.parse(formData);
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

  const handleAddressChange = (type: 'legal' | 'current', field: keyof Address, value: string) => {
    const newAddress = {
      ...(type === 'legal' ? formData.legalAddress : formData.currentAddress),
      [field]: value,
    };

    if (type === 'legal' && sameAddress) {
      setFormData({
        ...formData,
        legalAddress: newAddress,
        currentAddress: newAddress,
      });
    } else {
      setFormData({
        ...formData,
        [type === 'legal' ? 'legalAddress' : 'currentAddress']: newAddress,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RadioGroup
        label="Tipe Pelanggan"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value as CustomerType })}
        errorMessage={errors['type']}
      >
        <Radio value="company">Perusahaan</Radio>
        <Radio value="individual">Perorangan</Radio>
      </RadioGroup>

      <Input
        label={formData.type === 'company' ? 'Nama Perusahaan' : 'Nama Lengkap'}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        errorMessage={errors['name']}
      />

      <Input
        label={formData.type === 'company' ? 'NPWP' : 'NIK'}
        value={formData.identityNumber}
        onChange={(e) => setFormData({ ...formData, identityNumber: e.target.value })}
        errorMessage={errors['identityNumber']}
      />

      <Input
        label="Nomor Telepon"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        errorMessage={errors['phone']}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Alamat {formData.type === 'company' ? 'NPWP' : 'KTP'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Provinsi"
            selectedKeys={formData.legalAddress.provinceId ? [formData.legalAddress.provinceId] : []}
            onChange={(e) => handleAddressChange('legal', 'provinceId', e.target.value)}
            errorMessage={errors['legalAddress.provinceId']}
          >
            {Object.entries(locations.provinces).map(([id, name]) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Kabupaten"
            selectedKeys={formData.legalAddress.regencyId ? [formData.legalAddress.regencyId] : []}
            onChange={(e) => handleAddressChange('legal', 'regencyId', e.target.value)}
            errorMessage={errors['legalAddress.regencyId']}
          >
            {Object.entries(locations.regencies).map(([id, name]) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Kecamatan"
            selectedKeys={formData.legalAddress.districtId ? [formData.legalAddress.districtId] : []}
            onChange={(e) => handleAddressChange('legal', 'districtId', e.target.value)}
            errorMessage={errors['legalAddress.districtId']}
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
          value={formData.legalAddress.details}
          onChange={(e) => handleAddressChange('legal', 'details', e.target.value)}
          errorMessage={errors['legalAddress.details']}
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={sameAddress}
          onChange={(e) => {
            setSameAddress(e.target.checked);
            if (e.target.checked) {
              setFormData({
                ...formData,
                currentAddress: formData.legalAddress,
              });
            }
          }}
        />
        <span>Alamat saat ini sama dengan alamat {formData.type === 'company' ? 'NPWP' : 'KTP'}</span>
      </div>

      {!sameAddress && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Alamat Saat Ini</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Provinsi"
              selectedKeys={formData.currentAddress.provinceId ? [formData.currentAddress.provinceId] : []}
              onChange={(e) => handleAddressChange('current', 'provinceId', e.target.value)}
              errorMessage={errors['currentAddress.provinceId']}
            >
              {Object.entries(locations.provinces).map(([id, name]) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Kabupaten"
              selectedKeys={formData.currentAddress.regencyId ? [formData.currentAddress.regencyId] : []}
              onChange={(e) => handleAddressChange('current', 'regencyId', e.target.value)}
              errorMessage={errors['currentAddress.regencyId']}
            >
              {Object.entries(locations.regencies).map(([id, name]) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Kecamatan"
              selectedKeys={formData.currentAddress.districtId ? [formData.currentAddress.districtId] : []}
              onChange={(e) => handleAddressChange('current', 'districtId', e.target.value)}
              errorMessage={errors['currentAddress.districtId']}
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
            value={formData.currentAddress.details}
            onChange={(e) => handleAddressChange('current', 'details', e.target.value)}
            errorMessage={errors['currentAddress.details']}
          />
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button
          color="default"
          variant="light"
          onPress={() => navigate('/customers')}
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