import { Select, SelectItem, Textarea } from '@nextui-org/react';
import { Address } from '../../types/customer';

interface Props {
  value: Address;
  onChange: (address: Address) => void;
  label?: string;
}

// Dummy data for demonstration
const provinces = [
  { id: '11', name: 'Aceh' },
  { id: '12', name: 'Sumatera Utara' },
];

const regencies = [
  { id: '1101', name: 'Kab. Aceh Selatan' },
  { id: '1102', name: 'Kab. Aceh Tenggara' },
];

const districts = [
  { id: '110101', name: 'Kec. Bakongan' },
  { id: '110102', name: 'Kec. Kluet Utara' },
];

export default function AddressForm({ value, onChange, label }: Props) {
  const handleChange = (field: keyof Address, newValue: string) => {
    onChange({ ...value, [field]: newValue });
  };

  return (
    <div className="space-y-4">
      {label && (
        <h3 className="text-lg font-semibold">{label}</h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Provinsi"
          selectedKeys={value.provinceId ? [value.provinceId] : []}
          onChange={(e) => handleChange('provinceId', e.target.value)}
        >
          {provinces.map((province) => (
            <SelectItem key={province.id} value={province.id}>
              {province.name}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Kabupaten"
          selectedKeys={value.regencyId ? [value.regencyId] : []}
          onChange={(e) => handleChange('regencyId', e.target.value)}
        >
          {regencies.map((regency) => (
            <SelectItem key={regency.id} value={regency.id}>
              {regency.name}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Kecamatan"
          selectedKeys={value.districtId ? [value.districtId] : []}
          onChange={(e) => handleChange('districtId', e.target.value)}
        >
          {districts.map((district) => (
            <SelectItem key={district.id} value={district.id}>
              {district.name}
            </SelectItem>
          ))}
        </Select>
      </div>

      <Textarea
        label="Detail Alamat"
        value={value.details}
        onChange={(e) => handleChange('details', e.target.value)}
        placeholder="Masukkan detail alamat..."
      />
    </div>
  );
}