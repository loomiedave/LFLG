export interface District {
  id: string;
  name: string;
  _count: { clubs: number };
}

export interface Club {
  id: string;
  name: string;
  district: { id: string; name: string };
  _count: { licenses: number };
}
