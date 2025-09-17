import { License, EditFormData } from "@/types/license";

export function licenseToFormData(license: License): EditFormData {
  return {
    licenseType: license.licenseType,
    status: license.status,
    name: license.name,
    surname: license.surname,
    dateOfBirth: license.dateOfBirth.split("T")[0],
    address: license.address,
    state: license.state,
    clubId: license.clubId,
    district: license.district,
    clubName: license.clubName,
    photoUrl: license.photoUrl || "",
    expiryDate: license.expiryDate ? license.expiryDate.split("T")[0] : "",
  };
}
