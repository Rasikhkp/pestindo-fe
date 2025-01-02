export type JobType = 'pest_control' | 'pest_control_one_time' | 'termite_control' | 'termite_control_one_time';
export type JobStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface JobContact {
  name: string;
  phone: string;
}

export interface JobTeam {
  creativeLeadId: string;
  officeLeadId: string;
  employedLeadId: string;
  salesId: string;
}

export interface JobDocument {
  type: 'service_agreement' | 'spk' | 'po' | 'mou' | 'npwp' | 'ktp' | 'survey_form';
  url: string;
  uploadedAt: string;
}

export interface TechnicianReport {
  id: string;
  technicianId: string;
  technicianName: string;
  createdAt: string;
  documentUrl: string;
}

export interface UsedItem {
  id: string;
  name: string;
  price: number;
  actualUsage: number;
  billedUsage: number;
  unit: string;
}

export interface Job {
  id: string;
  type: JobType;
  customerId: string;
  customerName: string;
  isNew: boolean;
  poNumber: string;
  spkNumber: string;
  startDate: string;
  endDate: string;
  monthlyValue: number;
  totalValue: number;
  visitsPerMonth: number;
  pic: JobContact;
  financePic: JobContact;
  team: JobTeam;
  status: JobStatus;
  documents: JobDocument[];
  technicianReports: TechnicianReport[];
  usedItems: UsedItem[];
  createdAt: string;
}

export interface TechnicianJobSubmission {
  pestTypes: string[];
  treatments: string[];
  monitoringTools: string[];
  pestLevel: string;
  toolConditions: string[];
  equipment: string[];
  chemicalUsages: {
    id: string;
    name: string;
    quantity: number;
    unit: string;
  }[];
  notes: string;
  signatures: {
    operator: string;
    customer: string;
  };
}

export interface JobFormData {
  type: JobType;
  customerId: string;
  poNumber: string;
  spkNumber: string;
  startDate: string;
  endDate: string;
  monthlyValue: number;
  visitsPerMonth: number;
  pic: JobContact;
  financePic: JobContact;
  team: JobTeam;
}

export interface JobFilterOptions {
  minValue?: number;
  maxValue?: number;
  startDate?: string;
  endDate?: string;
  status?: JobStatus | 'all';
  search?: string;
}