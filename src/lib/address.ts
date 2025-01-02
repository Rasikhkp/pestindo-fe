export const locations = {
  provinces: {
    "31": "DKI Jakarta",
    "32": "Jawa Barat",
    "33": "Jawa Tengah",
    "34": "DI Yogyakarta"
  },
  regencies: {
    "3171": "Jakarta Pusat",
    "3172": "Jakarta Utara",
    "3273": "Kota Bandung",
    "3274": "Kota Yogyakarta"
  },
  districts: {
    "317101": "Tanah Abang",
    "317102": "Menteng",
    "327301": "Sukajadi",
    "327302": "Cicendo"
  }
};

export function getLocationName(type: 'provinces' | 'regencies' | 'districts', id: string): string {
  return locations[type][id] || id;
}

export function formatAddress(address: {
  provinceId: string;
  regencyId: string;
  districtId: string;
  details: string;
}): string {
  if (!address) return '-';
  
  return `${address.details}, ` +
    `Kec. ${getLocationName('districts', address.districtId)}, ` +
    `${getLocationName('regencies', address.regencyId)}, ` +
    `${getLocationName('provinces', address.provinceId)}`;
}