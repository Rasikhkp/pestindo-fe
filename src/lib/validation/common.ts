import { z } from 'zod';

export const addressSchema = z.object({
  provinceId: z.string().min(1, 'Provinsi harus dipilih'),
  regencyId: z.string().min(1, 'Kabupaten harus dipilih'),
  districtId: z.string().min(1, 'Kecamatan harus dipilih'),
  details: z.string().min(1, 'Detail alamat harus diisi'),
});