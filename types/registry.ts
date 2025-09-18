// types/registry.ts

export interface Affiliation {
  id: string;
  districtName: string;
  clubName: string;
  address: string;
  leader: string;
  contact: string;
  dateRegistered: Date;
  feesPaid: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Competition {
  id: string;
  competitionTitle: string;
  districtName: string;
  clubName: string;
  address: string;
  leader: string;
  contact: string;
  dateRegistered: Date;
  feesPaid: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAffiliationData {
  districtName: string;
  clubName: string;
  address: string;
  leader: string;
  contact: string;
  dateRegistered?: Date;
  feesPaid: number;
}

export interface CreateCompetitionData {
  competitionTitle: string;
  districtName: string;
  clubName: string;
  address: string;
  leader: string;
  contact: string;
  dateRegistered?: Date;
  feesPaid: number;
}
