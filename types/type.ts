export interface Player {
  id: string;
  name: string;
  surname: string;
  photoUrl?: string;
  clubName: string;
  district: string;
}

export interface ApiResponse {
  success: boolean;
  data: Player[];
  count: number;
  error?: string;
}

export interface Renewal {
  id: string;
  season: string;
  renewalDate: string;
  notes?: string;
}

export type LicenseStatus = "ACTIVE" | "EXPIRED" | "REVOKED" | "REVOKED";
export type LicenseType = "PLAYER" | "COACH";

export interface License {
  id: string;
  licenseNumber: string;
  status: LicenseStatus;
  licenseType: LicenseType;
  name: string;
  surname: string;
  dateOfBirth: string;
  address: string;
  state: string;
  district: string;
  clubName: string;
  registrationDate: string;
  expiryDate?: string;
  photoUrl?: string;
  renewals: Renewal[];
}

export interface Districts {
  id: string;
  name: string;
  _count: {
    clubs: number;
  };
}

export interface Club {
  id: string;
  name: string;
  districtId: string;
  district?: District;
}

export interface ClubWithCount extends Club {
  _count: {
    licenses: number;
  };
}

export interface District {
  id: string;
  name: string;
  _count?: {
    clubs: number;
  };
}

export interface DistrictWithClubs extends District {
  clubs: ClubWithCount[];
}

export interface ClubWithLicenses extends Club {
  district: District;
  licenses: License[];
}
