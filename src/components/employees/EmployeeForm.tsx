import { useState } from 'react';
import {
  Button,
  Input,
  Select,
  SelectItem,
  Switch,
} from '@nextui-org/react';
import { EmployeeFormData, Position } from '../../types/employee';
import { Address } from '../../types/customer';
import { locations } from '../../lib/address';

interface Props {
  initialData?: EmployeeFormData;
  onSubmit: (data: EmployeeFormData) => void;
}

const positions: { value: Position; label: string }[] = [
  { value: 'manager', label: 'Manager' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'staff', label: 'Staff' },
  { value: 'technician', label: 'Teknisi' },
  { value: 'admin', label: 'Admin' },
  { value: 'sales', label: 'Sales' },
];

const emptyAddress: Address = {
  provinceId: '',
  regencyId: '',
  districtId: '',
  details: '',
};

export default function EmployeeForm({ initialData, onSubmit }: Props) {
  const [formData, setFormData] = useState<EmployeeFormData>(
    initialData || {
      name: '',
      nik: '',
      email: '',
      phone: '',
      position: 'staff',
      legalAddress: emptyAddress,
      currentAddress: emptyAddress,
    }
  );
  const [sameAddress, setSameAddress] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nama Lengkap"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          label="NIK"
          value={formData.nik}
          onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          label="No HP"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <Select
        label="Jabatan"
        selectedKeys={[formData.position]}
        onChange={(e) => setFormData({ ...formData, position: e.target.value as Position })}
      >
        {positions.map((position) => (
          <SelectItem key={position.value} value={position.value}>
            {position.label}
          </SelectItem>
        ))}
      </Select>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Alamat KTP</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Provinsi"
            selectedKeys={formData.legalAddress.provinceId ? [formData.legalAddress.provinceId] : []}
            onChange={(e) => handleAddressChange('legal', 'provinceId', e.target.value)}
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
        <span>Alamat saat ini sama dengan alamat KTP</span>
      </div>

      {!sameAddress && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Alamat Saat Ini</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Provinsi"
              selectedKeys={formData.currentAddress.provinceId ? [formData.currentAddress.provinceId] : []}
              onChange={(e) => handleAddressChange('current', 'provinceId', e.target.value)}
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
          />
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button color="default" variant="light" type="button">
          Kembali
        </Button>
        <Button color="primary" type="submit">
          Simpan
        </Button>
      </div>
    </form>
  );
}