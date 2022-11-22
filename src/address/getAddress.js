import address from './address.json'

export function getRegionList() {
  return Object.keys(address)
}

export function getProvinceList(region) {
  if (!region) return []
  return Object.keys(address[region].province_list)
}

export function getMunicipalityList(region, province) {
  if (!region || !province) return []
  return Object.keys(address[region].province_list[province].municipality_list)
}

export function getBarangayList(region, province, municipality) {
  if (!region || !province || !municipality) return []
  return address[region].province_list[province].municipality_list[municipality].barangay_list
}
