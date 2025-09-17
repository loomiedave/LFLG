export interface Transfer {
  id: string;
  fromClub: string;
  toClub: string;
  transferDate: string;
  type: "PERMANENT" | "TEMPORARY";
  status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
  fee?: number;
  season: string;
  notes?: string;
}

export interface LicenseFormData {
  licenseType: "PLAYER" | "COACH";
  name: string;
  surname: string;
  dateOfBirth: string;
  address: string;
  state: string;
  district: string;
  clubName: string;
  clubId: string;
  photoUrl: string;
  expiryDate: string;
}

export interface License {
  id: string;
  licenseNumber: string;
  licenseType: "PLAYER" | "COACH";
  status: "ACTIVE" | "EXPIRED" | "SUSPENDED" | "REVOKED";
  name: string;
  surname: string;
  dateOfBirth: string;
  address: string;
  state: string;
  district: string;
  clubId: string;
  clubName: string;
  photoUrl?: string;
  expiryDate?: string;
  transfers?: Transfer[];
  renewals: any[];
}

export interface Transfer {
  id: string;
  fromClub: string;
  toClub: string;
  transferDate: string;
  type: "PERMANENT" | "TEMPORARY";
  status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
  fee?: number;
  season: string;
  notes?: string;
}

export interface EditFormData {
  licenseType: "PLAYER" | "COACH";
  status: "ACTIVE" | "EXPIRED" | "SUSPENDED" | "REVOKED";
  name: string;
  surname: string;
  dateOfBirth: string;
  address: string;
  state: string;
  clubId: string;
  district: string;
  clubName: string;
  photoUrl: string;
  expiryDate: string;
}

