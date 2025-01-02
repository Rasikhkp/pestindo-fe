import { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  RadioGroup,
  Radio,
  Input,
  Select,
  SelectItem,
  Button,
} from '@nextui-org/react';
import { JobFormData, JobType } from '../../types/job';
import { useCustomers } from '../../hooks/useCustomers';

interface Props {
  initialData?: JobFormData;
  onSubmit: (data: JobFormData) => void;
}

const jobTypes: { value: JobType; label: string }[] = [
  { value: 'pest_control', label: 'Pest Control' },
  { value: 'pest_control_one_time', label: 'Pest Control One Time' },
  { value: 'termite_control', label: 'Termite Control' },
  { value: 'termite_control_one_time', label: 'Termite Control One Time' },
];

const emptyContact = { name: '', phone: '' };
const emptyTeam = {
  creativeLeadId: '',
  officeLeadId: '',
  employedLeadId: '',
  salesId: '',
};

export default function JobForm({ initialData, onSubmit }: Props) {
  const { customers } = useCustomers();
  const [formData, setFormData] = useState<JobFormData>(
    initialData || {
      type: 'pest_control',
      customerId: '',
      poNumber: '',
      spkNumber: '',
      startDate: '',
      endDate: '',
      monthlyValue: 0,
      visitsPerMonth: 1,
      pic: emptyContact,
      financePic: emptyContact,
      team: emptyTeam,
    }
  );

  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    if (formData.startDate && formData.endDate && formData.monthlyValue) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                    end.getMonth() - start.getMonth() + 1;
      setTotalValue(formData.monthlyValue * months);
    }
  }, [formData.startDate, formData.endDate, formData.monthlyValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardBody className="space-y-6">
          <h3 className="text-lg font-semibold">Informasi Dasar</h3>
          
          <RadioGroup
            label="Tipe Pekerjaan"
            orientation="horizontal"
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value as JobType })}
          >
            {jobTypes.map((type) => (
              <Radio key={type.value} value={type.value}>
                {type.label}
              </Radio>
            ))}
          </RadioGroup>

          <Select
            label="Pelanggan"
            selectedKeys={formData.customerId ? [formData.customerId] : []}
            onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
          >
            {customers.map((customer) => (
              <SelectItem key={customer.id} value={customer.id}>
                {customer.name}
              </SelectItem>
            ))}
          </Select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nomor PO"
              value={formData.poNumber}
              onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
            />
            <Input
              label="Nomor SPK"
              value={formData.spkNumber}
              onChange={(e) => setFormData({ ...formData, spkNumber: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Tanggal Mulai"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            <Input
              type="date"
              label="Tanggal Selesai"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="number"
              label="Nilai Kontrak Bulanan"
              value={formData.monthlyValue.toString()}
              onChange={(e) => setFormData({ ...formData, monthlyValue: Number(e.target.value) })}
            />
            <Input
              type="number"
              label="Total Kontrak"
              value={totalValue.toString()}
              isReadOnly
            />
            <Input
              type="number"
              label="Jumlah Kunjungan per Bulan"
              value={formData.visitsPerMonth.toString()}
              onChange={(e) => setFormData({ ...formData, visitsPerMonth: Number(e.target.value) })}
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-6">
          <h3 className="text-lg font-semibold">Informasi PIC</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Input
                label="Nama PIC"
                value={formData.pic.name}
                onChange={(e) => setFormData({
                  ...formData,
                  pic: { ...formData.pic, name: e.target.value }
                })}
              />
              <Input
                label="No HP PIC"
                value={formData.pic.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  pic: { ...formData.pic, phone: e.target.value }
                })}
              />
            </div>
            <div className="space-y-4">
              <Input
                label="Nama PIC Finance"
                value={formData.financePic.name}
                onChange={(e) => setFormData({
                  ...formData,
                  financePic: { ...formData.financePic, name: e.target.value }
                })}
              />
              <Input
                label="No HP PIC Finance"
                value={formData.financePic.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  financePic: { ...formData.financePic, phone: e.target.value }
                })}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-6">
          <h3 className="text-lg font-semibold">Tim Pelaksana</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Creative Lead"
              selectedKeys={formData.team.creativeLeadId ? [formData.team.creativeLeadId] : []}
              onChange={(e) => setFormData({
                ...formData,
                team: { ...formData.team, creativeLeadId: e.target.value }
              })}
            >
              {/* Add team member options */}
            </Select>
            
            <Select
              label="Office Lead"
              selectedKeys={formData.team.officeLeadId ? [formData.team.officeLeadId] : []}
              onChange={(e) => setFormData({
                ...formData,
                team: { ...formData.team, officeLeadId: e.target.value }
              })}
            >
              {/* Add team member options */}
            </Select>
            
            <Select
              label="Employed Lead"
              selectedKeys={formData.team.employedLeadId ? [formData.team.employedLeadId] : []}
              onChange={(e) => setFormData({
                ...formData,
                team: { ...formData.team, employedLeadId: e.target.value }
              })}
            >
              {/* Add team member options */}
            </Select>
            
            <Select
              label="Sales"
              selectedKeys={formData.team.salesId ? [formData.team.salesId] : []}
              onChange={(e) => setFormData({
                ...formData,
                team: { ...formData.team, salesId: e.target.value }
              })}
            >
              {/* Add team member options */}
            </Select>
          </div>
        </CardBody>
      </Card>

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