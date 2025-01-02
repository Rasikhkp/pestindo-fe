import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardHeader,
  Button,
  Checkbox,
  Input,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
  Chip,
} from '@nextui-org/react';
import { ArrowLeft, Plus, Building2, User, Calendar, DollarSign, Tool, ClipboardList, Bug, Droplets, Target, AlertTriangle, Settings, Wrench, Beaker, Trash, Pen } from 'lucide-react';
import { useJobs } from '../../hooks/useJobs';
import { useCustomers } from '../../hooks/useCustomers';
import { cn, formatCurrency } from '../../lib/utils';
import SignaturePad from '../../components/shared/SignaturePad';

const pestTypes = [
  { value: 'tikus', label: 'Tikus' },
  { value: 'kecoa', label: 'Kecoa' },
  { value: 'semut', label: 'Semut' },
  { value: 'rayap', label: 'Rayap' },
  { value: 'lalat', label: 'Lalat' },
  { value: 'nyamuk', label: 'Nyamuk' },
];

const treatments = [
  { value: 'spraying', label: 'Spraying' },
  { value: 'fogging', label: 'Fogging' },
  { value: 'baiting', label: 'Baiting' },
  { value: 'dusting', label: 'Dusting' },
  { value: 'fumigation', label: 'Fumigation' },
];

const monitoringTools = [
  { value: 'glue_board', label: 'Glue Board' },
  { value: 'light_trap', label: 'Light Trap' },
  { value: 'pheromone', label: 'Pheromone' },
  { value: 'snap_trap', label: 'Snap Trap' },
];

const pestLevels = [
  { value: 'low', label: 'Rendah' },
  { value: 'medium', label: 'Sedang' },
  { value: 'high', label: 'Tinggi' },
  { value: 'critical', label: 'Kritis' },
];

const toolConditions = [
  { value: 'good', label: 'Baik' },
  { value: 'damaged', label: 'Rusak' },
  { value: 'missing', label: 'Hilang' },
  { value: 'needs_replacement', label: 'Perlu Diganti' },
];

const equipment = [
  { value: 'sprayer', label: 'Sprayer' },
  { value: 'fogger', label: 'Fogger' },
  { value: 'duster', label: 'Duster' },
  { value: 'vacuum', label: 'Vacuum' },
];

const chemicals = [
  { value: 'chemical_a', label: 'Chemical A' },
  { value: 'chemical_b', label: 'Chemical B' },
  { value: 'chemical_c', label: 'Chemical C' },
  { value: 'chemical_d', label: 'Chemical D' },
];

interface FormData {
  pestTypes: string[];
  treatments: string[];
  monitoringTools: string[];
  pestLevel: string;
  toolConditions: string[];
  equipment: string[];
  selectedChemicals: string[];
  notes: string;
}

interface Signatures {
  operator: string;
  customer: string;
}

interface ChemicalUsage {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export default function TechnicianJobDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJobById, submitTechnicianJob } = useJobs();
  const { getCustomerById } = useCustomers();
  
  const job = getJobById(id!);
  if (!job) return <div>Job not found</div>;
  
  const customer = getCustomerById(job.customerId);
  if (!customer) return <div>Customer not found</div>;

  const [chemicalUsages, setChemicalUsages] = useState<ChemicalUsage[]>([]);
  const [selectedChemical, setSelectedChemical] = useState('');
  const [chemicalQuantity, setChemicalQuantity] = useState('');
  const [signatures, setSignatures] = useState<Signatures>({
    operator: '',
    customer: '',
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleAddChemical = () => {
    if (!selectedChemical || !chemicalQuantity) return;
    
    const chemical = chemicals.find(c => c.value === selectedChemical);
    if (!chemical) return;

    setChemicalUsages([
      ...chemicalUsages,
      {
        id: selectedChemical,
        name: chemical.label,
        quantity: Number(chemicalQuantity),
        unit: 'Liter'
      }
    ]);

    setSelectedChemical('');
    setChemicalQuantity('');
  };

  const handleRemoveChemical = (id: string) => {
    setChemicalUsages(chemicalUsages.filter(c => c.id !== id));
  };
  const [formData, setFormData] = useState<FormData>({
    pestTypes: [],
    treatments: [],
    monitoringTools: [],
    pestLevel: '',
    toolConditions: [],
    equipment: [],
    selectedChemicals: [],
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    const submissionData = {
      pestTypes: formData.pestTypes,
      treatments: formData.treatments,
      monitoringTools: formData.monitoringTools,
      pestLevel: formData.pestLevel,
      toolConditions: formData.toolConditions,
      equipment: formData.equipment,
      chemicalUsages,
      notes: formData.notes,
      signatures,
    };

    submitTechnicianJob({
      id: job.id,
      data: submissionData
    });

    setShowConfirmModal(false);
    navigate('/technician-jobs', {
      state: { message: 'Pekerjaan berhasil diselesaikan' }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <Button
          variant="light"
          isIconOnly
          onPress={() => navigate('/technician-jobs')}
          className="h-12 w-12 bg-primary/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Detail Pekerjaan Teknisi</h1>
          <div className="flex items-center gap-2 mt-1">
            <Chip color="primary" variant="flat" size="sm">{job.id}</Chip>
            <Chip color="success" variant="flat" size="sm">
              {job.type.replace(/_/g, ' ').toUpperCase()}
            </Chip>
          </div>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Info Card */}
        <Card className="border border-primary/20">
          <CardHeader className="border-b border-divider">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">Informasi Pekerjaan</h2>
            </div>
          </CardHeader>
          <CardBody className="divide-y divide-divider">
            <div className="grid grid-cols-2 gap-4 py-3">
              <div>
                <p className="text-sm text-gray-500">Nomor PO</p>
                <p className="font-medium">{job.poNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nomor SPK</p>
                <p className="font-medium">{job.spkNumber}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3">
              <div>
                <p className="text-sm text-gray-500">Tanggal Mulai</p>
                <p className="font-medium">{job.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tanggal Selesai</p>
                <p className="font-medium">{job.endDate}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3">
              <div>
                <p className="text-sm text-gray-500">Nilai Kontrak Bulanan</p>
                <p className="font-medium text-success">{formatCurrency(job.monthlyValue)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Nilai Kontrak</p>
                <p className="font-medium text-success">{formatCurrency(job.totalValue)}</p>
              </div>
            </div>
            <div className="py-3">
              <p className="text-sm text-gray-500">Kunjungan per Bulan</p>
              <p className="font-medium">{job.visitsPerMonth}x</p>
            </div>
          </CardBody>
        </Card>

        {/* Customer Info Card */}
        <Card className="border border-success/20">
          <CardHeader className="border-b border-divider">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-success/10">
                <User className="w-5 h-5 text-success" />
              </div>
              <h2 className="text-lg font-semibold">Informasi Pelanggan</h2>
            </div>
          </CardHeader>
          <CardBody className="divide-y divide-divider">
            <div className="py-3">
              <p className="text-sm text-gray-500">Tipe Pelanggan</p>
              <p className="font-medium">{customer.type === 'company' ? 'Perusahaan' : 'Perorangan'}</p>
            </div>
            <div className="py-3">
              <p className="text-sm text-gray-500">PIC</p>
              <p className="font-medium">{job.pic.name}</p>
              <p className="text-sm text-gray-500">{job.pic.phone}</p>
            </div>
            <div className="py-3">
              <p className="text-sm text-gray-500">Alamat</p>
              <p className="font-medium whitespace-pre-wrap">{customer.currentAddress.details}</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Service Report Form */}
      <Card className="border border-warning/20">
        <CardHeader className="border-b border-divider">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-warning/10">
              <ClipboardList className="w-5 h-5 text-warning" />
            </div>
            <h2 className="text-xl font-semibold">Laporan Pelayanan</h2>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pest Types Section */}
            <Card className="bg-default-50 hover:shadow-md transition-shadow">
              <CardBody className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-danger/10">
                    <Bug className="w-5 h-5 text-danger" />
                  </div>
                  <h3 className="text-lg font-semibold">Hama Temuan dan Jenis</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pestTypes.map((type) => (
                    <Checkbox
                      key={type.value}
                      value={type.value}
                      isSelected={formData.pestTypes.includes(type.value)}
                      onValueChange={(isSelected) => {
                        setFormData({
                          ...formData,
                          pestTypes: isSelected
                            ? [...formData.pestTypes, type.value]
                            : formData.pestTypes.filter(t => t !== type.value)
                        });
                      }}
                      className="bg-content1 p-3 rounded-lg hover:bg-content2 transition-colors"
                    >
                      {type.label}
                    </Checkbox>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Treatment Section */}
            <Card className="bg-default-50 hover:shadow-md transition-shadow">
              <CardBody className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Droplets className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Perlakuan</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {treatments.map((treatment) => (
                    <Checkbox
                      key={treatment.value}
                      value={treatment.value}
                      isSelected={formData.treatments.includes(treatment.value)}
                      onValueChange={(isSelected) => {
                        setFormData({
                          ...formData,
                          treatments: isSelected
                            ? [...formData.treatments, treatment.value]
                            : formData.treatments.filter(t => t !== treatment.value)
                        });
                      }}
                      className="bg-content1 p-3 rounded-lg hover:bg-content2 transition-colors"
                    >
                      {treatment.label}
                    </Checkbox>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Monitoring Tools Section */}
            <Card className="bg-default-50 hover:shadow-md transition-shadow">
              <CardBody className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Target className="w-5 h-5 text-success" />
                  </div>
                  <h3 className="text-lg font-semibold">Alat Monitoring</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {monitoringTools.map((tool) => (
                    <Checkbox
                      key={tool.value}
                      value={tool.value}
                      isSelected={formData.monitoringTools.includes(tool.value)}
                      onValueChange={(isSelected) => {
                        setFormData({
                          ...formData,
                          monitoringTools: isSelected
                            ? [...formData.monitoringTools, tool.value]
                            : formData.monitoringTools.filter(t => t !== tool.value)
                        });
                      }}
                      className="bg-content1 p-3 rounded-lg hover:bg-content2 transition-colors"
                    >
                      {tool.label}
                    </Checkbox>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Pest Level Section */}
            <Card className="bg-default-50 hover:shadow-md transition-shadow">
              <CardBody className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  </div>
                  <h3 className="text-lg font-semibold">Level/Kondisi Hama</h3>
                </div>
                <RadioGroup
                  value={formData.pestLevel}
                  onValueChange={(value) => setFormData({ ...formData, pestLevel: value })}
                  className="gap-2"
                >
                  {pestLevels.map((level) => (
                    <Radio
                      key={level.value}
                      value={level.value}
                      className="bg-content1 p-3 rounded-lg hover:bg-content2 transition-colors"
                    >
                      {level.label}
                    </Radio>
                  ))}
                </RadioGroup>
              </CardBody>
            </Card>

            {/* Tool Conditions Section */}
            <Card className="bg-default-50 hover:shadow-md transition-shadow">
              <CardBody className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Settings className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold">Keterangan Alat/Station</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {toolConditions.map((condition) => (
                    <Checkbox
                      key={condition.value}
                      value={condition.value}
                      isSelected={formData.toolConditions.includes(condition.value)}
                      onValueChange={(isSelected) => {
                        setFormData({
                          ...formData,
                          toolConditions: isSelected
                            ? [...formData.toolConditions, condition.value]
                            : formData.toolConditions.filter(t => t !== condition.value)
                        });
                      }}
                      className="bg-content1 p-3 rounded-lg hover:bg-content2 transition-colors"
                    >
                      {condition.label}
                    </Checkbox>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Equipment Section */}
            <Card className="bg-default-50 hover:shadow-md transition-shadow">
              <CardBody className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Wrench className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Peralatan</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {equipment.map((item) => (
                    <Checkbox
                      key={item.value}
                      value={item.value}
                      isSelected={formData.equipment.includes(item.value)}
                      onValueChange={(isSelected) => {
                        setFormData({
                          ...formData,
                          equipment: isSelected
                            ? [...formData.equipment, item.value]
                            : formData.equipment.filter(t => t !== item.value)
                        });
                      }}
                      className="bg-content1 p-3 rounded-lg hover:bg-content2 transition-colors"
                    >
                      {item.label}
                    </Checkbox>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Chemicals Section */}
            <Card className="bg-default-50 hover:shadow-md transition-shadow">
              <CardBody className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-success/10">
                      <Beaker className="w-5 h-5 text-success" />
                    </div>
                    <h3 className="text-lg font-semibold">Barang Kimia yang Digunakan</h3>
                  </div>
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    startContent={<Plus className="w-4 h-4" />}
                    onPress={handleAddChemical}
                    isDisabled={!selectedChemical || !chemicalQuantity}
                  >
                    Tambah Barang
                  </Button>
                </div>
                <div className="flex gap-4">
                  <Select
                    label="Pilih Barang Kimia"
                    value={selectedChemical}
                    onChange={(e) => setSelectedChemical(e.target.value)}
                    className="flex-1"
                  >
                    {chemicals.map((chemical) => (
                      <SelectItem key={chemical.value} value={chemical.value}>
                        {chemical.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    type="number"
                    label="Jumlah (Liter)"
                    value={chemicalQuantity}
                    onChange={(e) => setChemicalQuantity(e.target.value)}
                    className="w-32"
                  />
                </div>
                {chemicalUsages.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {chemicalUsages.map((usage) => (
                      <div key={usage.id} className="flex items-center justify-between p-3 bg-content1 rounded-lg">
                        <div>
                          <p className="font-medium">{usage.name}</p>
                          <p className="text-sm text-gray-500">{usage.quantity} {usage.unit}</p>
                        </div>
                        <Button
                          isIconOnly
                          color="danger"
                          variant="light"
                          size="sm"
                          onPress={() => handleRemoveChemical(usage.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Notes Section */}
            <Card className="bg-default-50 hover:shadow-md transition-shadow">
              <CardBody className="space-y-4">
                <h3 className="text-lg font-semibold">Catatan</h3>
                <Textarea
                  placeholder="Tambahkan catatan jika diperlukan"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  minRows={3}
                />
              </CardBody>
            </Card>

            {/* Signatures Section */}
            <Card className="bg-default-50 hover:shadow-md transition-shadow">
              <CardBody className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Pen className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Tanda Tangan</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SignaturePad
                    title="Tanda Tangan Operator"
                    subtitle="Tanda tangan teknisi/operator yang bertugas"
                    onSave={(signature) => setSignatures(prev => ({ ...prev, operator: signature }))}
                  />
                  <SignaturePad
                    title="Tanda Tangan Pelanggan"
                    subtitle="Tanda tangan perwakilan pelanggan"
                    onSave={(signature) => setSignatures(prev => ({ ...prev, customer: signature }))}
                  />
                </div>
              </CardBody>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="light"
                size="lg"
                onPress={() => navigate('/technician-jobs')}
              >
                Batalkan
              </Button>
              <Button
                color="primary"
                type="submit"
                size="lg"
                className="px-8"
                isDisabled={!signatures.operator || !signatures.customer}
              >
                Submit
              </Button>
            </div>
          </form>
        </CardBody>
        
        {/* Confirmation Modal */}
        <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
          <ModalContent>
            <ModalHeader>Konfirmasi Submit</ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <p className="text-danger font-medium">Perhatian!</p>
                <p>Pastikan semua data yang diisi sudah benar karena:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Data yang sudah disubmit tidak dapat diubah kembali</li>
                  <li>Tanda tangan yang sudah dibuat akan disimpan secara permanen</li>
                  <li>Penggunaan bahan kimia akan mempengaruhi stok inventaris</li>
                </ul>
                <p>Apakah Anda yakin ingin melanjutkan?</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={() => setShowConfirmModal(false)}>
                Periksa Kembali
              </Button>
              <Button color="primary" onPress={handleConfirmSubmit}>
                Ya, Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Card>
    </div>
  );
}