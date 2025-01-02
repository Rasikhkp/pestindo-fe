import { z } from 'zod';
import { addressSchema } from './common';

export const supplierSchema = z.object({
  name: z.string().min(1, 'Nama harus diisi'),
  phone: z.string()
    .min(1, 'Nomor telepon harus diisi')
    .regex(/^08\d{10,11}$/, 'Nomor telepon tidak valid'),
  address: addressSchema,
});

export type SupplierFormSchema = z.infer<typeof supplierSchema>;