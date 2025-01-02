import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Customer } from '../types/customer';

export const exportToExcel = (data: any[], filename: string = 'export') => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const exportToCSV = (data: any[], filename: string = 'export') => {
  const ws = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
};

export const exportToPDF = (data: any[], columns: string[], filename: string = 'export') => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [columns],
    body: data.map(item => columns.map(col => item[col])),
  });
  doc.save(`${filename}.pdf`);
};

export const formatCustomerForExport = (customer: Customer) => ({
  ID: customer.id,
  Type: customer.type === 'company' ? 'Company' : 'Individual',
  Name: customer.name,
  'Identity Number': customer.identityNumber,
  Phone: customer.phone,
  'Total Jobs': customer.totalJobs,
  'Created At': new Date(customer.createdAt).toLocaleDateString(),
});