import { z } from 'zod';

const addressSchema = z.object({
  provinceId: z.string().min(1, 'Provinsi harus dipilih'),
  regencyId: z.string().min(1, 'Kabupaten harus dipilih'),
  districtId: z.string().min(1, 'Kecamatan harus dipilih'),
  details: z.string().min(1, 'Detail alamat harus diisi'),
});

export const customerSchema = z.object({
  type: z.enum(['individual', 'company'], {
    required_error: 'Tipe pelanggan harus dipilih',
  }),
  name: z.string().min(1, 'Nama harus diisi'),
  identityNumber: z.string()
    .min(1, 'Nomor identitas harus diisi')
    .refine(
      (val) => {
        if (val.includes('.')) {
          // NPWP format: XX.XXX.XXX.X-XXX.XXX
          return /^\d{2}\.\d{3}\.\d{3}\.\d{1}-\d{3}\.\d{3}$/.test(val);
        } else {
          // NIK format: 16 digits
          return /^\d{16}$/.test(val);
        }
      },
      (val) => ({
        message: val.includes('.')
          ? 'Format NPWP tidak valid'
          : 'NIK harus 16 digit',
      })
    ),
  phone: z.string()
    .min(1, 'Nomor telepon harus diisi')
    .regex(/^08\d{10,11}$/, 'Nomor telepon tidak valid'),
  legalAddress: addressSchema,
  currentAddress: addressSchema,
});

export type CustomerFormSchema = z.infer<typeof customerSchema>;