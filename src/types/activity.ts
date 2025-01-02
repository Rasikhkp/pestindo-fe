export interface Activity {
  id: string;
  description: string;
  images: string[];
  createdAt: string;
}

export interface ActivityFormData {
  description: string;
  images: File[];
}

export interface ActivityFilterOptions {
  startDate?: string;
  endDate?: string;
  search?: string;
}