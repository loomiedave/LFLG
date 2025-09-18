export interface License {
  name: string;
  surname: string;
  licenseNumber: string;
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
  license: License;
}

export interface Loan {
  id: string;
  parentClub: string;
  hostClub: string;
  startDate: string;
  endDate: string;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
  season: string;
  license: License;
}
